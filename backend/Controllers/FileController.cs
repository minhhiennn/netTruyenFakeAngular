using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Security.Claims;
using System.Text;
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
                        await file.CopyToAsync(stream);
                        stream.Close();
                        String idManga = file.FileName.Split("-")[0];
                        int chapNumber = Int32.Parse(file.FileName.Split("-")[1].Split(".")[0]);

                        string chapID = (Int32.Parse(_context.Chap.OrderByDescending(p => p.id).FirstOrDefault().id) + 1) + "";

                        if (_context.Manga.Where(manga => manga.id.Equals(idManga)).Where(manga => manga.chaps.Any(chap => chap.number == chapNumber)).Any())
                        {
                            chapID = _context.Chap.Where(chap => chap.number == chapNumber).First().id;
                            DirectoryInfo di1 = Directory.CreateDirectory(pathFileRoot + "/storage/" + chapID);
                            foreach (FileInfo fileOld in di1.GetFiles())
                            {
                                fileOld.Delete();
                            }
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
                        FileInfo[] Files = d.GetFiles("*.jpg");

                        _context.Chap.Find(chapID).pageCount = Files.Length;
                        await _context.SaveChangesAsync();
                    }
                    catch (System.Exception)
                    {
                        return BadRequest();
                    }
                }
            }
            return Ok();
        }
    }
}