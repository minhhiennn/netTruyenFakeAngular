using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text.RegularExpressions;
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
                        List<String> list = checkFormatOfUnzip(filePath);
                        list.ForEach(Console.Write);
                        using (ZipArchive archive = ZipFile.OpenRead(filePath)) { await mainFileUpload(archive, archive.Entries.Count(), 0, idManga, list); }
                        System.IO.File.Delete(filePath);
                    }
                    catch (System.Exception e)
                    {
                        System.Console.WriteLine(e);
                        System.IO.File.Delete(filePath);
                        return StatusCode(500, new { error = "Zip này bị sai định dạng của tên" });
                    }
                }
            }
            if (errorFolderOutPut.Any()) return StatusCode(500, new { error = "Lỗi ở folder sau đây " + string.Join(",", errorFolderOutPut.ToArray()) });
            return Ok();
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private async Task mainFileUpload(ZipArchive archive, int max, int count, string idManga,List<String> list)
        {

            if (count < max)
            {
                ZipArchiveEntry entry = archive.Entries[count];
                if (list.Contains(entry.FullName.Split(" ")[0]) && !entry.FullName.EndsWith("/"))
                {
                    int chapNumber = Int32.Parse(entry.FullName.Split("/")[0]);
                    string chapID = ((Int32.Parse(_context.Chap.OrderByDescending(p => p.id).FirstOrDefault().id)) + 1) + "";
                    var chapExist = _context.Chap.Where(chap => chap.number == chapNumber).Where(chap => chap.MangaId.Equals(idManga));
                    if (chapExist.Any())
                    {
                        chapID = chapExist.First().id;

                        if (extractNumber(entry.Name) == 1)
                        {
                            DirectoryInfo di1 = Directory.CreateDirectory(pathFileRoot + "/storage/" + chapID);
                            foreach (FileInfo fileOld in di1.GetFiles()) { fileOld.Delete(); }
                            di1.Delete(true);
                        }
                    }
                    else _context.Chap.Add(new Chap { id = chapID, number = chapNumber, ReleaseDate = DateTime.Now, views = 0, pageCount = 0, MangaId = idManga });
                    await _context.SaveChangesAsync();
                    DirectoryInfo di = Directory.CreateDirectory(pathFileRoot + "/storage/" + chapID);
                    await Task.Run(() => entry.ExtractToFile(Path.Combine(pathFileRoot + "/storage/" + chapID, "(" + extractNumber(entry.Name) + ").jpg")));
                    DirectoryInfo d = new DirectoryInfo("wwwroot/storage/" + chapID);
                    _context.Chap.Find(chapID).pageCount = d.GetFiles("*.jpg").Length;
                    await _context.SaveChangesAsync();
                }
                else if (!list.Contains(entry.FullName.Split(" ")[0]) && entry.FullName.EndsWith("/")) { errorFolderOutPut.Add(entry.FullName); }
                await mainFileUpload(archive, max, count + 1, idManga,list);
            }
            else { }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public List<String> checkFormatOfUnzip(string filePath)
        {

            ZipArchiveEntry prev = null;
            bool first = true;
            bool errorFolder = false;
            List<String> listAcceptFolder = new List<String>();
            using (ZipArchive zip = ZipFile.Open(filePath, ZipArchiveMode.Read))
                foreach (ZipArchiveEntry entry in zip.Entries)
                {
                    if (entry.FullName.EndsWith("/"))
                    {
                        
                        first = true;
                        errorFolder = false;
                        listAcceptFolder.Add(entry.FullName);
                        try { Int32.Parse(entry.FullName.Split("/")[0]); } catch (System.Exception) { errorFolder = true; }
                    }
                    else if (!entry.FullName.Contains("/")) { }
                    else
                    {
                        if (!errorFolder)
                        {
                            if (first) { first = false; if (extractNumber(entry.Name) != 1) errorFolder = true; }
                            else
                            {
                                try
                                {
                                    int file1Name = extractNumber(entry.Name);
                                    if (entry.Name.Equals(" (" + file1Name + ").jpg") || entry.Name.Equals("(" + file1Name + ").jpg"))
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
                    }

                }
            return listAcceptFolder;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public int extractNumber(string txt)
        {
            return Int32.Parse(Regex.Replace(txt, "[^0-9]+", "", RegexOptions.Compiled));
        }
    }
}


