using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]

    public class FileController : ControllerBase
    {
        string pathFileRoot = Environment.CurrentDirectory + "/wwwroot";
        private readonly ApplicationDbContext _context;
        public FileController(ApplicationDbContext context)
        {
            _context = context;
        }
        // [HttpGet]
        // public async Task<ActionResult> GetDetail()
        // {
        //     return await null;
        // }

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
                        if (checkFormatOfUnzip(filePath))
                        {
                            String idManga = file.FileName.Split("-")[0];
                            if (!_context.Manga.Any(manga => manga.id.Equals(idManga))) { System.IO.File.Delete(filePath); return StatusCode(500, new { error = "Truyện này chưa có" }); }
                            int chapNumber = Int32.Parse(file.FileName.Split("-")[1].Split(".")[0]);
                            string chapID = (Int32.Parse(_context.Chap.OrderByDescending(p => p.id).FirstOrDefault().id) + 1) + "";
                            var chapExist = _context.Chap.Where(chap => chap.number == chapNumber).Where(chap => idManga.Equals(idManga));
                            if (chapExist.Any())
                            {
                                chapID = chapExist.First().id;
                                DirectoryInfo di1 = Directory.CreateDirectory(pathFileRoot + "/storage/" + chapID);
                                foreach (FileInfo fileOld in di1.GetFiles()) { fileOld.Delete(); }
                                di1.Delete(true);
                              
                            }
                            else
                            {
                                _context.Chap.Add(new Chap
                                {
                                    id = chapID,
                                    number = chapNumber,
                                    ReleaseDate = DateTime.Now,
                                    views = 0,
                                    pageCount = 0,
                                    MangaId = idManga
                                });
                                
                            }
                            await _context.SaveChangesAsync();
                            DirectoryInfo di = Directory.CreateDirectory(pathFileRoot + "/storage/" + chapID);
                            await Task.Run(() => ZipFile.ExtractToDirectory(filePath, pathFileRoot + "/storage/" + chapID));
                            System.IO.File.Delete(filePath);
                            DirectoryInfo d = new DirectoryInfo("wwwroot/storage/" + chapID);
                            _context.Chap.Find(chapID).pageCount = d.GetFiles("*.jpg").Length;
                            await _context.SaveChangesAsync();
                        }
                        else { System.IO.File.Delete(filePath); return StatusCode(500, new { error = "Zip này sai định dạng rồi" }); }

                    }
                    catch (System.Exception e)
                    {
                        System.Console.WriteLine(e);
                        return StatusCode(500, new { error = "Zip này bị sai định dạng của tên" });
                    }
                }
            }
            
            return Ok();
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public Boolean checkFormatOfUnzip(string filePath)
        {
            ZipArchiveEntry prev = null;
            bool first = true;
            using (ZipArchive zip = ZipFile.Open(filePath, ZipArchiveMode.Read))
                foreach (ZipArchiveEntry entry in zip.Entries)
                {
                    if (first) first = false;
                    else
                    {
                        int file1Name = Int32.Parse(Regex.Replace(entry.Name, "[^0-9]+", "", RegexOptions.Compiled));
                        int file2Name = Int32.Parse(Regex.Replace(prev.Name, "[^0-9]+", "", RegexOptions.Compiled));
                        if (file2Name == zip.Entries.Count) return true;
                        if (file1Name != (file2Name + 1)) return false;
                    }
                    prev = entry;

                }
            return true;
        }
    }

}