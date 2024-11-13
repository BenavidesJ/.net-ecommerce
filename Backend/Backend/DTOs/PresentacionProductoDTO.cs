namespace Backend.DTOs
{
    public class PresentacionProductoDTO
    {
        public int ProductoID { get; set; }
        public string Color { get; set; }
        public string Tamano { get; set; }
        public string SKU { get; set; }
        public string Imagen { get; set; }
    }

    public class PresentacionPatchProductoDTO
    {
        public int? ProductoID { get; set; }
        public string? Color { get; set; }
        public string? Tamano { get; set; }
        public string? SKU { get; set; }
        public string? Imagen { get; set; }
    }
}
