using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagosController : ControllerBase
    {
        private readonly PagosService _pagosService;

        public PagosController(PagosService pagosService)
        {
            _pagosService = pagosService;
        }

        // POST: api/pagos
        [HttpPost]
        public async Task<IActionResult> CrearPago([FromBody] PagoDTO pagoRequest)
        {
            if (pagoRequest == null || pagoRequest.Amount <= 0 || string.IsNullOrEmpty(pagoRequest.Description))
            {
                return BadRequest("Datos de pago inválidos.");
            }

            var result = await _pagosService.CrearPagoAsync(
                pagoRequest.Amount,
                pagoRequest.Description,
                pagoRequest.Currency,
                pagoRequest.Items,
                pagoRequest.ReturnUrl
            );

            if (!result)
            {
                return StatusCode(500, "Hubo un error al procesar el pago.");
            }

            return Ok("Pago procesado exitosamente.");
        }
    }
}
