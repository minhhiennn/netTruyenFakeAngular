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
            return Custom.leechWithUrl(url);
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
