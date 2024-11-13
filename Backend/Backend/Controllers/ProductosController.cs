using Microsoft.AspNetCore.Mvc;
using Backend.Entities;
using Backend.DTOs;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly DBContext _context;

        public ProductosController(DBContext context)
        {
            _context = context;
        }

        // GET: api/productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetProductos()
        {
            var productos = await _context.productos
                .Select(p => new ProductoDTO
                {
                    Nombre = p.Nombre,
                    Cantidad = p.Cantidad,
                    Costo = p.Costo
                })
                .ToListAsync();

            return Ok(productos);
        }

        // GET: api/productos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDTO>> GetProductoById(int id)
        {
            var producto = await _context.productos
                .Include(p => p.Presentaciones) 
                .FirstOrDefaultAsync(p => p.ID == id);

            if (producto == null)
            {
                return NotFound();
            }

            // Mapear el ProductoDTO
            var productoDTO = new ProductoDTO
            {
                Nombre = producto.Nombre,
                Cantidad = producto.Cantidad,
                Costo = producto.Costo,
                Presentaciones = producto.Presentaciones.Select(p => new PresentacionProductoDTO
                {
                    ProductoID = p.ProductoID,
                    Color = p.Color,
                    Tamano = p.Tamano,
                    SKU = p.SKU,
                    Imagen = p.Imagen
                }).ToList() 
            };

            return Ok(productoDTO);
        }


        // POST: api/productos
        [HttpPost]
        public async Task<ActionResult<ProductoDTO>> CreateProducto(ProductoDTO productoDTO)
        {
            if (productoDTO == null)
            {
                return BadRequest();
            }

            var producto = new Producto
            {
                Nombre = productoDTO.Nombre,
                Cantidad = productoDTO.Cantidad,
                Costo = (float)productoDTO.Costo
            };

            _context.productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductoById), new { id = producto.ID }, productoDTO);
        }

        // PATCH: api/productos/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateProducto(int id, ProductoPatchDTO productoDTO)
        {
            var producto = await _context.productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(productoDTO.Nombre))
            {
                producto.Nombre = productoDTO.Nombre;
            }
            if (productoDTO.Cantidad.HasValue)
            {
                producto.Cantidad = productoDTO.Cantidad.Value;
            }
            if (productoDTO.Costo.HasValue)
            {
                producto.Costo = (float)productoDTO.Costo.Value;
            }

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.productos.Any(e => e.ID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/productos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _context.productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/productos/{id}/presentaciones
        [HttpGet("{id}/presentaciones")]
        public async Task<ActionResult<IEnumerable<PresentacionProductoDTO>>> GetPresentacionesPorProducto(int id)
        {
            var producto = await _context.productos
                .Include(p => p.Presentaciones)
                .FirstOrDefaultAsync(p => p.ID == id);

            if (producto == null)
            {
                return NotFound();
            }

            var presentaciones = producto.Presentaciones.Select(p => new PresentacionProductoDTO
            {
                ProductoID = p.ProductoID,
                Color = p.Color,
                Tamano = p.Tamano,
                SKU = p.SKU,
                Imagen = p.Imagen
            }).ToList();

            return Ok(presentaciones);
        }

        // POST: api/productos/{id}/presentaciones
        [HttpPost("{id}/presentaciones")]
        public async Task<ActionResult<PresentacionProductoDTO>> CrearPresentacion(int id, [FromBody] PresentacionProductoDTO presentacionDTO)
        {
            var producto = await _context.productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            var presentacion = new PresentacionProducto
            {
                ProductoID = id,
                Color = presentacionDTO.Color,
                Tamano = presentacionDTO.Tamano,
                SKU = presentacionDTO.SKU,
                Imagen = presentacionDTO.Imagen
            };

            _context.presentacionProducto.Add(presentacion);
            await _context.SaveChangesAsync();

            presentacionDTO.ProductoID = presentacion.ProductoID;
            return CreatedAtAction(nameof(GetPresentacionesPorProducto), new { id = producto.ID }, presentacionDTO);
        }

        // PATCH: api/productos/{productoId}/presentaciones/{presentacionId}
        [HttpPatch("{productoId}/presentaciones/{presentacionId}")]
        public async Task<IActionResult> ModificarPresentacion(int productoId, int presentacionId, [FromBody] PresentacionPatchProductoDTO presentacionDTO)
        {
            var producto = await _context.productos.FindAsync(productoId);
            if (producto == null)
            {
                return NotFound();
            }

            var presentacion = await _context.presentacionProducto
                .FirstOrDefaultAsync(p => p.ProductoID == productoId && p.ID == presentacionId);

            if (presentacion == null)
            {
                return NotFound();
            }

            // Se actualizan solo las propiedades que se enviaron
            if (!string.IsNullOrEmpty(presentacionDTO.Color))
            {
                presentacion.Color = presentacionDTO.Color;
            }

            if (!string.IsNullOrEmpty(presentacionDTO.Tamano))
            {
                presentacion.Tamano = presentacionDTO.Tamano;
            }

            if (!string.IsNullOrEmpty(presentacionDTO.SKU))
            {
                presentacion.SKU = presentacionDTO.SKU;
            }

            if (!string.IsNullOrEmpty(presentacionDTO.Imagen))
            {
                presentacion.Imagen = presentacionDTO.Imagen;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/productos/{productoId}/presentaciones/{presentacionId}
        [HttpDelete("{productoId}/presentaciones/{presentacionId}")]
        public async Task<IActionResult> EliminarPresentacion(int productoId, int presentacionId)
        {
            var producto = await _context.productos.FindAsync(productoId);
            if (producto == null)
            {
                return NotFound();
            }

            var presentacion = await _context.presentacionProducto
                .FirstOrDefaultAsync(p => p.ProductoID == productoId && p.ID == presentacionId);

            if (presentacion == null)
            {
                return NotFound();
            }

            _context.presentacionProducto.Remove(presentacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }



    }
}
