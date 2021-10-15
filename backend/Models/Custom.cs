using System.Net.Http;

public static class Custom
{
    public static string leechWithUrl(string url)
    {

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
}