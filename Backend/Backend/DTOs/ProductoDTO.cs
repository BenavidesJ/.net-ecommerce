namespace Backend.DTOs
{
    public class ProductoDTO
    {
        public int ID { get; set; }
        public string Nombre { get; set; }
        public int Cantidad { get; set; }
        public float Costo { get; set; }

        public float CostoConIVA => Costo * 1.13f;

        public List<PresentacionProductoDTO>? Presentaciones { get; set; }
    }
}
