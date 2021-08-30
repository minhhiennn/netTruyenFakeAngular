using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CustomersController : ControllerBase
    {
        [System.Obsolete]
        public readonly IHostingEnvironment _hostingEnvironment;

        [System.Obsolete]
        public CustomersController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet, Route("BannerImage")]
        [Authorize]
        [System.Obsolete]
        public IActionResult BannerImage()
        {
            var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, "www", "red-rose.jpg");
            return PhysicalFile(filePath, "image/jpeg");
        }
        [HttpGet]
        [Authorize(Roles = "Operator")]
        //[AllowAnonymous]
        public IEnumerable<string> Get()
        {
            return new string[] { "John Doe", "Jane Doe" };
        }
    }
}