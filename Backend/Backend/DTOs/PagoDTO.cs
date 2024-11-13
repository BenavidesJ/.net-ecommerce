namespace Backend.DTOs
{
    public class PagoDTO
    {
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string Currency { get; set; }
        public List<string> Items { get; set; }
        public string ReturnUrl { get; set; }
    }
}
