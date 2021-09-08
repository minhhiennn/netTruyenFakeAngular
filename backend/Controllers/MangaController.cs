using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Text;
using System.Web;
using HtmlAgilityPack;

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
        [HttpGet("page")]
        public ActionResult<int> getMaxPageLeech()
        {
            string url = "http://truyenqq.net/truyen-moi-cap-nhat/trang-" + 1 + ".html";

            string result = "";
            using (System.Net.Http.HttpClientHandler handler = new System.Net.Http.HttpClientHandler()
            {
                Proxy = new System.Net.WebProxy("http://64.124.38.142:8080"),
                UseProxy = true,
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
            var doc = new HtmlDocument().LoadHtml(result);
            var nodes = doc.DocumentNode.SelectNodes("//ul[@class='pagination-list']")[0].SelectNodes("//a[@class='pagination-next']")[0];
            string x = nodes.GetAttributeValue("href", "nhu cc").Split('-')[4].Split('.')[0];
            return Int32.Parse(x);
        }
        [HttpGet("leechManga/{page}")]
        public ActionResult<string> leechMangaByPage(string page)
        {
            string url = "http://truyenqq.net/truyen-moi-cap-nhat/trang-" + page + ".html";

            string result = "";
            using (System.Net.Http.HttpClientHandler handler = new System.Net.Http.HttpClientHandler()
            {
                Proxy = new System.Net.WebProxy("http://64.124.38.142:8080"),
                UseProxy = true,
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
        // GET: api/Manga
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manga>>> GetManga(int page)
        {
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

        private List<string> getImgUrl(string url)
        {
            var doc = new HtmlWeb().Load(url);
            var nodes = doc.DocumentNode.SelectNodes("//img[@class='lazy']");
            List<string> lists = new List<string>();
            foreach (HtmlNode item in nodes)
            {
                lists.Add(item.GetAttributeValue("src", ""));
            }
            return lists;
        }
        [HttpGet("leecher/{url}")]
        public async Task<List<byte[]>> leecher(string url)
        {
            url = "http://truyenqq.net/truyen-tranh/" + url;
            System.Console.WriteLine(url);
            List<string> lists = getImgUrl(url);
            List<byte[]> result = new List<byte[]>();
            int i = 0;
            foreach (var item in lists)
            {
                using (HttpClient client = new HttpClient())
                {
                    i++;
                    client.DefaultRequestHeaders.Add("access-control-allow-origin", "*");
                    client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");
                    client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:33.0) Gecko/20100101 Firefox/33.0");
                    client.DefaultRequestHeaders.Add("Pragma", "no-cache");
                    client.DefaultRequestHeaders.Add("Connection", "keep-alive");
                    client.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.5");
                    client.DefaultRequestHeaders.Add("Accept-Encoding", "gzip, deflate");
                    client.DefaultRequestHeaders.Add("Accept", "application/json, text/javascript, */*; q=0.01");
                    //2 thằng này quan trọng nhất
                    client.DefaultRequestHeaders.Add("Referer", "http://truyenqq.net/");
                    client.DefaultRequestHeaders.Add("Host", lists[1].Split("//")[1].Split("/")[0]);
                    //
                    HttpResponseMessage response = await client.GetAsync(item);
                    byte[] content = await response.Content.ReadAsByteArrayAsync();
                    result.Add(content);
                    // System.IO.File.WriteAllBytes(Environment.CurrentDirectory + "/wwwroot/" + i + ".jpg", content);
                }
            }
            return result;
        }
    }
}
