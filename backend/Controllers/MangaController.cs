using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class MangaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MangaController(ApplicationDbContext context)
        {
            _context = context;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private int countAllManga()
        {
            return this._context.Manga.Count();
        }
        [HttpGet("page")]
        public ActionResult<int> getPage()
        {
            if (countAllManga() % 12 != 0)
            {
                return (countAllManga() / 12) + 1;
            }
            else
            {
                return countAllManga() / 12;
            }
        }
        // GET: api/Manga
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manga>>> GetManga(int page)
        {
            await getProductImage();
            if (page != 0)
            {
                int take = 12;
                int skip = (page - 1) * 12;
                return await _context.Manga.Include(b => b.detail).Include(b => b.chaps).OrderBy(x => x.id).Skip(skip).Take(take).ToListAsync();
            }
            else
            {
                return await _context.Manga.Include(b => b.detail).Include(b => b.chaps).OrderBy(x => x.id).Skip(0).Take(12).ToListAsync();
            }
        }
        // GET: api/Manga/5

        [HttpGet("{id}")]
        public async Task<ActionResult<Manga>> GetManga(string id)
        {
            var manga = await _context.Manga.Where(b => b.id == id).Include(b => b.detail).Include(b => b.chaps).FirstOrDefaultAsync();
            if (manga == null)
            {
                return NotFound();
            }

            return manga;
        }

        // PUT: api/Manga/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutManga(string id, Manga manga)
        {
            if (id != manga.id)
            {
                return BadRequest();
            }

            _context.Entry(manga).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MangaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Manga
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Manga>> PostManga(Manga manga)
        {

            _context.Manga.Add(manga);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MangaExists(manga.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetManga", new { id = manga.id }, manga);
        }

        // DELETE: api/Manga/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManga(string id)
        {
            var manga = await _context.Manga.FindAsync(id);
            if (manga == null)
            {
                return NotFound();
            }

            _context.Manga.Remove(manga);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MangaExists(string id)
        {
            return _context.Manga.Any(e => e.id == id);
        }

        private async Task<IActionResult> getProductImage()
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("access-control-allow-origin", "*");
                client.DefaultRequestHeaders.Host = "truyenvua.xyz";
                HttpResponseMessage response = await client.GetAsync("http://truyenvua.xyz/380/325/1.jpg?gf=hdfgdfg");
                byte[] content = await response.Content.ReadAsByteArrayAsync();
                //return "data:image/png;base64," + Convert.ToBase64String(content);
                Console.WriteLine(Encoding.Default.GetString(content));
                return File(content, "image/png", "1.jpg");
            }
        }
    }

}
