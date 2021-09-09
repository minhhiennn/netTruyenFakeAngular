using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System.Net.Http;
using HtmlAgilityPack;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChapController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChapController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("{nameMAndChap}")]
        public ActionResult<string> getNameLeeachMangaChap(string nameMAndChap)
        {
            string url = "http://truyenqqtop.com/truyen-tranh/" + nameMAndChap;
            var web = new HtmlWeb();
            var doc = web.Load(url);
            var nodes = doc.DocumentNode.SelectNodes("//h1[@class='detail-title']")[0].Descendants("a").First();
            string x = nodes.InnerText;
            return x;
        }
        [HttpGet("all/{nameMAndChap}")]
        public ActionResult<string> getLeechMangaChap(string nameMAndChap)
        {
            string url = "http://truyenqqtop.com/truyen-tranh/" + nameMAndChap;

            string result = "";
            using (System.Net.Http.HttpClientHandler handler = new System.Net.Http.HttpClientHandler()
            {
                // Proxy = new System.Net.WebProxy("http://64.124.38.142:8080"),
                // UseProxy = true,
            })
            {
                using (HttpClient client = new HttpClient(handler))
                {
                    using (HttpResponseMessage response = client.GetAsync(url).Result)
                    {
                        using (HttpContent content = response.Content)
                        {
                            result = content.ReadAsStringAsync().Result;
                        }
                    }
                }
            }
            return result;
        }
        // PUT: api/Chap/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChap(int id, Chap chap)
        {
            if (id != chap.id)
            {
                return BadRequest();
            }

            _context.Entry(chap).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChapExists(id))
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

        // POST: api/Chap
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Chap>> PostChap(Chap chap)
        {
            _context.Chap.Add(chap);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ChapExists(chap.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetChap", new { id = chap.id }, chap);
        }

        // DELETE: api/Chap/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChap(string id)
        {
            var chap = await _context.Chap.FindAsync(id);
            if (chap == null)
            {
                return NotFound();
            }

            _context.Chap.Remove(chap);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChapExists(int id)
        {
            return _context.Chap.Any(e => e.id == id);
        }
    }
}
