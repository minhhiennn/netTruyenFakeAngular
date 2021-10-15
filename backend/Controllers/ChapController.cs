using System.Linq;
using Microsoft.AspNetCore.Mvc;
using HtmlAgilityPack;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChapController : ControllerBase
    {

        public ChapController()
        {
            
        }
        [HttpGet("new/{nameMAndChap}")]
        public ActionResult<string> getAllNewChap(string nameMAndChap)
        {
            string url = "http://www.nettruyenpro.com/truyen-tranh/" + nameMAndChap;
            return Custom.leechWithUrl(url);
        }
        [HttpGet("{nameMAndChap}")]
        public ActionResult<string> getNameLeeachMangaChap(string nameMAndChap)
        {
            
            string url = "http://www.nettruyenpro.com/truyen-tranh/" + nameMAndChap.Replace("@","/");

            var doc = new HtmlDocument();
            doc.LoadHtml(Custom.leechWithUrl(url));
            var nodes = doc.DocumentNode.SelectNodes("//h1[@class='txt-primary']")[0].Descendants("a").First();
            string x = nodes.InnerText;
            return x;
        }
        [HttpGet("all/{nameMAndChap}")]
        public ActionResult<string> getLeechMangaChap(string nameMAndChap)
        {
            string url = "http://www.nettruyenpro.com/truyen-tranh/" + nameMAndChap;

            return Custom.leechWithUrl(url);
        }
    }
}
