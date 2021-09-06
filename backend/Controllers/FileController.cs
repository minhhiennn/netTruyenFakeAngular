using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]

    public class FileController : ControllerBase
    {
        string pathFileRoot = Environment.CurrentDirectory + "/wwwroot";
        private readonly ApplicationDbContext _context;
        private List<String> errorFolderOutPut = new List<string>();
        public FileController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost, Route("upload")]
        [AllowAnonymous]
        public async Task<IActionResult> OnPostUploadAsync([FromForm(Name = "file")] IFormFile file)
        {
            if (file.Length > 0)
            {
                var filePath = pathFileRoot + "/zip/" + file.FileName;
                using (var stream = System.IO.File.Create(filePath))
                {
                    try
                    {
                        await file.CopyToAsync(stream); stream.Close();
                        String idManga = file.FileName.Split(".")[0];
                        if (!_context.Manga.Any(manga => manga.id.Equals(idManga))) { System.IO.File.Delete(filePath); return StatusCode(500, new { error = "Truyện này chưa có" }); }
                        Dictionary<string, int> listAcceptFolder = checkFormatOfUnzip(filePath);

                        using (ZipArchive archive = ZipFile.OpenRead(filePath))
                        {
                            int chapID = 0;
                            foreach (ZipArchiveEntry entry in archive.Entries)
                            {
                                if (listAcceptFolder.Where(t => t.Key.Equals(entry.FullName)).Any())
                                {

                                    chapID = await updateDbContext(listAcceptFolder.FirstOrDefault(t => t.Key.Equals(entry.FullName)).Key,
                                    listAcceptFolder.FirstOrDefault(t => t.Key.Equals(entry.FullName)).Value, idManga);
                                }
                                if ((listAcceptFolder.Where(t => t.Key.Equals(entry.FullName.Split("/")[0] + ("/"))).Any() && !entry.FullName.EndsWith("/"))) { await extractFolder(entry, chapID); }
                            }
                        }
                        System.IO.File.Delete(filePath);
                    }
                    catch (System.Exception e)
                    {
                        System.Console.WriteLine(e);
                        System.IO.File.Delete(filePath);
                        return StatusCode(500, new { error = "Zip này bị sai định dạng" });
                    }
                }
            }
            if (errorFolderOutPut.Any()) return StatusCode(500, new { error = "Lỗi ở folder sau đây " + string.Join(",", errorFolderOutPut.ToArray()) });
            return Ok();
        }
        private async Task extractFolder(ZipArchiveEntry entry, int chapID)
        {
            if (chapID == 0) chapID = _context.Chap.OrderByDescending(p => p.id).FirstOrDefault().id;
            DirectoryInfo di = Directory.CreateDirectory(pathFileRoot + "/storage/" + chapID);
            try { await Task.Run(() => entry.ExtractToFile(Path.Combine(pathFileRoot + "/storage/" + chapID, "(" + extractNumber(entry.FullName.Split("/")[1]) + ").jpg"))); }
            catch (System.Exception) { if (errorFolderOutPut.FirstOrDefault(stringToCheck => stringToCheck.Contains(entry.FullName.Split("/")[0] + "conflig")) == null) errorFolderOutPut.Add(entry.FullName.Split("/")[0] + "conflig"); }
        }
        private async Task<int> updateDbContext(string folderNumber, int fileCount, string idManga)
        {
            int chapNumber = Int32.Parse(folderNumber.Split("/")[0]);
            int chapID = 0;
            var chapExist = _context.Chap.Where(chap => chap.number == chapNumber).Where(chap => chap.MangaId.Equals(idManga)).FirstOrDefault();
            if (chapExist != null)
            {
                chapExist.pageCount = fileCount;
                chapID = chapExist.id;
                DirectoryInfo di1 = Directory.CreateDirectory(pathFileRoot + "/storage/" + chapID);
                foreach (FileInfo fileOld in di1.GetFiles()) { fileOld.Delete(); }
                di1.Delete(true);
            }
            else { await _context.Chap.AddAsync(new Chap { number = chapNumber, ReleaseDate = DateTime.Now, views = 0, pageCount = fileCount, MangaId = idManga }); }
            await _context.SaveChangesAsync();
            return chapID;
        }
        private Dictionary<string, int> checkFormatOfUnzip(string filePath)
        {
            ZipArchiveEntry prev = null;
            bool first = true;
            bool errorFolder = false;
            Dictionary<string, int> listAcceptFolder = new Dictionary<string, int>();
            int count = 0;
            using (ZipArchive zip = ZipFile.Open(filePath, ZipArchiveMode.Read))
                foreach (ZipArchiveEntry entry in zip.Entries)
                {
                    if (entry.FullName.EndsWith("/"))
                    {
                        if (errorFolder) errorFolderOutPut.Add(prev.FullName.Split("/")[0] + "/");
                        count = 0;
                        first = true;
                        errorFolder = false;
                        listAcceptFolder.Add(entry.FullName, 0);
                        try { Int32.Parse(entry.FullName.Split("/")[0]); } catch (System.Exception) { errorFolder = true; }
                    }
                    else if (!entry.FullName.Contains("/")) { }
                    else
                    {
                        count++;
                        if (!errorFolder)
                        {
                            if (first) { first = false; if (extractNumber(entry.Name) != 1) errorFolder = true; }
                            else
                            {
                                try
                                {
                                    int file1Name = extractNumber(entry.Name);
                                    if (entry.Name.Equals(" (" + file1Name + ").jpg") || entry.Name.Equals("(" + file1Name + ").jpg") && entry.FullName.Split("/").Length <= 2)
                                    {
                                        int file2Name = Int32.Parse(Regex.Replace(prev.Name, "[^0-9]+", "", RegexOptions.Compiled));
                                        if (file1Name != (file2Name + 1)) errorFolder = true;
                                    }
                                    else { errorFolder = true; }
                                }
                                catch (System.Exception) { errorFolder = true; }
                            }
                            prev = entry;
                        }
                        if (errorFolder) { listAcceptFolder.Remove(prev.FullName.Split("/")[0] + "/"); }
                        if (prev != null && !errorFolder) listAcceptFolder[prev.FullName.Split("/")[0] + "/"] = count;
                    }
                }
            foreach (KeyValuePair<string, int> kvp in listAcceptFolder) { if (kvp.Value == 0) { listAcceptFolder.Remove(kvp.Key); errorFolderOutPut.Add(kvp.Key); } }
            return listAcceptFolder;
        }
        private int extractNumber(string txt)
        {
            return Int32.Parse(Regex.Replace(txt, "[^0-9]+", "", RegexOptions.Compiled));
        }
    }
}


