using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DetailController : ControllerBase
    {

        public DetailController()
        {
            
        }
        [HttpGet("{mangaName}")]
        public ActionResult<string> getLeechMangaDetail(string mangaName)
        {
            string url = "http://www.nettruyenpro.com/truyen-tranh/" + mangaName;
            return Custom.leechWithUrl(url);
        }
    }
}
