using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Detail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Detail>>> GetDetail()
        {
            return await _context.Detail.ToListAsync();
        }

        // GET: api/Detail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Detail>> GetDetail(string id)
        {
            var detail = await _context.Detail.FindAsync(id);

            if (detail == null)
            {
                return NotFound();
            }

            return detail;
        }

        // PUT: api/Detail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetail(string id, Detail detail)
        {
            if (id != detail.MangaId)
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
                if (DetailExists(detail.MangaId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDetail", new { id = detail.MangaId }, detail);
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
            return _context.Detail.Any(e => e.MangaId == id);
        }
    }
}
