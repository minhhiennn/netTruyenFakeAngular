using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DetailController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DetailController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("{mangaName}")]
        public ActionResult<string> getLeechMangaDetail(string mangaName)
        {
            string url = "http://truyenqqtop.com/truyen-tranh/" + mangaName;

            string result = "";
            using (System.Net.Http.HttpClientHandler handler = new System.Net.Http.HttpClientHandler()
            {
                // Proxy = new System.Net.WebProxy("http://64.124.38.142:8080"),
                // UseProxy = true,
            })
            {
                using (HttpClient client = new HttpClient(handler))
                {
                    // client.DefaultRequestHeaders.Add("access-control-allow-origin", "*");
                    // client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");
                    // client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36");
                    // client.DefaultRequestHeaders.Add("Pragma", "no-cache");
                    // client.DefaultRequestHeaders.Add("Connection", "keep-alive");
                    // client.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.5");
                    // client.DefaultRequestHeaders.Add("Accept-Encoding", "gzip, deflate");
                    // client.DefaultRequestHeaders.Add("Accept", "application/json, text/javascript, */*; q=0.01");
                    // client.DefaultRequestHeaders.Add("Cookie", "VinaHost-Shield=efa70ae99f5e01d51b6bdad49d60c6b0; QiQiSession=hfrm0f9pn48riquodajmibbta2; visit-read=613c23c35c931-613c23c35c933; preload_ads=0; bet_top_pc=1; bet_top_pc_2=1; right_ads=0; _ga_1W7VSZ38QC=GS1.1.1631326711.18.1.1631331266.0; _ga=GA1.1.206877333.1631331266; preload_banner=1");
                    // client.DefaultRequestHeaders.Add("Referer", "http://truyenqqtop.com/");
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
        // PUT: api/Detail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetail(string id, Detail detail)
        {
            if (id != detail.id)
            {
                return BadRequest();
            }

            _context.Entry(detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetailExists(id))
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

        // POST: api/Detail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Detail>> PostDetail(Detail detail)
        {
            _context.Detail.Add(detail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DetailExists(detail.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDetail", new { id = detail.id }, detail);
        }

        // DELETE: api/Detail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetail(string id)
        {
            var detail = await _context.Detail.FindAsync(id);
            if (detail == null)
            {
                return NotFound();
            }

            _context.Detail.Remove(detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetailExists(string id)
        {
            return _context.Detail.Any(e => e.id == id);
        }
    }
}
