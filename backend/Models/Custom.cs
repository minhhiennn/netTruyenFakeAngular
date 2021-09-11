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