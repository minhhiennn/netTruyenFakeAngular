using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using HtmlAgilityPack;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class MangaController : ControllerBase
    {
        public MangaController()
        {

        }
        [HttpGet("page")]
        public ActionResult<int> getMaxPageLeech()
        {
            string url = "http://www.nettruyenpro.com/?page=1";
            var doc = new HtmlDocument();
            doc.LoadHtml(Custom.leechWithUrl(url));
            var nodes = doc.DocumentNode.SelectNodes("//ul[@class='pagination']")[0].SelectNodes("//a[@title='Trang cuối']")[0];
            string x = nodes.GetAttributeValue("href", "nhu cc").Split("=")[1];
            return Int32.Parse(x);
        }
        [HttpGet("leechManga/{page}")]
        public ActionResult<string> leechMangaByPage(string page)
        {
            string url = "http://www.nettruyenpro.com/?page=" + page;

            string result = "";
            using (System.Net.Http.HttpClientHandler handler = new System.Net.Http.HttpClientHandler()
            {
                // Proxy = new System.Net.WebProxy("http://20.94.100.35:8080"),
                // UseProxy = true,
            })
            {
                using (HttpClient client = new HttpClient(handler))
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36");
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

        // [HttpGet("getImgUrl/{url}")]
        // public List<string> getImgUrl(string url)
        // {
        //     url = url.Replace("@", "/");
        //     var doc = new HtmlDocument();
        //     doc.LoadHtml(Custom.leechWithUrl(url));
        //     var nodes = doc.DocumentNode.SelectNodes("//div[@class='page-chapter']");
        //     List<string> lists = new List<string>();
        //     foreach (HtmlNode item in nodes)
        //     {
        //         //System.Console.WriteLine(item.GetAttributeValue("id", "bun"));
        //         //System.Console.WriteLine(item.SelectNodes("//img")[0].GetAttributeValue("src","bun"));
        //         lists.Add(item.SelectNodes("//img")[0].Get);
        //     }
        //     return lists;
        // }
        [HttpGet("leecher/{url}")]
        public async Task<byte[]> leecher(string url)
        {
            url = url.Replace("@", "/");
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("access-control-allow-origin", "*");
                // client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36");
                // client.DefaultRequestHeaders.Add("Pragma", "no-cache");
                // client.DefaultRequestHeaders.Add("Connection", "keep-alive");
                // client.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.5");
                // client.DefaultRequestHeaders.Add("Accept-Encoding", "gzip, deflate");
                // client.DefaultRequestHeaders.Add("Accept", "application/json, text/javascript, */*; q=0.01");
                //client.DefaultRequestHeaders.Add("Cookie", "VinaHost-Shield=efa70ae99f5e01d51b6bdad49d60c6b0; QiQiSession=hfrm0f9pn48riquodajmibbta2; visit-read=613c23c35c931-613c23c35c933; preload_ads=0; bet_top_pc=1; bet_top_pc_2=1; right_ads=0; _ga_1W7VSZ38QC=GS1.1.1631326711.18.1.1631331266.0; _ga=GA1.1.206877333.1631331266; preload_banner=1");
                //2 thằng này quan trọng nhất
                client.DefaultRequestHeaders.Add("Referer", "http://www.nettruyenpro.com/");
                //client.DefaultRequestHeaders.Add("Host", "www.nettruyenpro.com");

                HttpResponseMessage response = await client.GetAsync(url);
                byte[] content = await response.Content.ReadAsByteArrayAsync();
                // System.IO.File.WriteAllBytes(Environment.CurrentDirectory + "/wwwroot/" + i + ".jpg", content);
                return content;
            }
        }
    }
}
