using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

namespace Backend.Services
{
    public class PagosService
    {
        private readonly HttpClient _httpClient;

        public PagosService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetAccessTokenAsync()
        {
            var requestData = new
            {
                grant_type = "client_credentials",
                client_id = "l3SG1Tt8RoC2841TRLqBl8fXWSDff02tl9GUFQ05",
                client_secret = "nXXpAMyKOpo8mjZSQl0rO9TdccQEISkDlJCKQJ0U7j9GHtJZic2VmezJrLSyERV6h9595348F3IlD7PwoCQZPOJPd0v3JbSoK7OAfOsnYhfAliPgr2df6cDuStGzxWXU"
            };

            var content = new StringContent(JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("https://api.4geeks.io/authentication/token/", content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Error obteniendo el token de acceso.");
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(responseContent);

            return tokenResponse?.AccessToken;
        }

        public async Task<bool> CrearPagoAsync(decimal amount, string description, string currency, List<string> items, string returnUrl)
        {
            var accessToken = await GetAccessTokenAsync();

            var requestData = new MultipartFormDataContent
            {
                { new StringContent(amount.ToString()), "amount" },
                { new StringContent(description), "description" },
                { new StringContent(currency), "currency" },
                { new StringContent(JsonConvert.SerializeObject(items)), "items" },
                { new StringContent(returnUrl), "return_url" }
            };

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "https://api.4geeks.io/v1/payments/")
            {
                Content = requestData
            };
            requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await _httpClient.SendAsync(requestMessage);
            return response.IsSuccessStatusCode;
        }
    }

    public class TokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }

        [JsonProperty("scope")]
        public string Scope { get; set; }
    }
}
