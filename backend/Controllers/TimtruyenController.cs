using System.Linq;
using Microsoft.AspNetCore.Mvc;
using HtmlAgilityPack;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimtruyenController : ControllerBase
    {

        public TimtruyenController()
        {

        }
        [HttpGet("{keyword}/{page}")]
        public ActionResult<string> findManga(string keyword, int page)
        {
            string url = "http://www.nettruyenpro.com/tim-truyen?keyword=" + keyword + "&page=" + page;
            return Custom.leechWithUrl(url);
        }
    }
}
