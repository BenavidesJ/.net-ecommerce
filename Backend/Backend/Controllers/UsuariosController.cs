using Backend.Data;
using Backend.Entities;
using Backend.DTOs;
using Backend.Lib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly Utilities _utilidades;

        public UsuariosController(DBContext context, Utilities utilidades)
        {
            _context = context;
            _utilidades = utilidades;
        }

        // GET: api/Usuarios
        // Devuelve solo los campos seleccionados en el UsuarioDTO
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsuarios()
        {
            var usuarios = await _context.usuarios
                .Include(u => u.TipoUsuario)
                .Include(u => u.DetalleUsuario)
                .Select(u => new UsuarioDTO
                {
                    ID = u.ID,
                    Correo = u.Correo,
                    TipoUsuario = u.TipoUsuario.DescripcionTipo,
                    Nombre = u.DetalleUsuario.Nombre,
                    Apellido = u.DetalleUsuario.Apellido,
                    Telefono = u.DetalleUsuario.Telefono,
                    Direccion = u.DetalleUsuario.Direccion,
                    MetodoPagoPreferido = u.DetalleUsuario.MetodoPagoPreferido
                })
                .ToListAsync();

            return Ok(usuarios);
        }

        // GET: api/Usuarios/5
        // Devuelve un solo usuario con los campos del UsuarioDTO
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetUsuario(int id)
        {
            var usuario = await _context.usuarios
                .Include(u => u.TipoUsuario)
                .Include(u => u.DetalleUsuario)
                .Where(u => u.ID == id)
                .Select(u => new UsuarioDTO
                {
                    ID = u.ID,
                    Correo = u.Correo,
                    Password = u.Password,
                    TipoUsuario = u.TipoUsuario.DescripcionTipo,
                    Nombre = u.DetalleUsuario.Nombre,
                    Apellido = u.DetalleUsuario.Apellido,
                    Telefono = u.DetalleUsuario.Telefono,
                    Direccion = u.DetalleUsuario.Direccion,
                    MetodoPagoPreferido = u.DetalleUsuario.MetodoPagoPreferido
                })
                .FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // POST: api/Usuarios
        // Crea un nuevo usuario
        [HttpPost]
        public async Task<ActionResult<UsuarioDTO>> PostUsuario(UsuarioDTO usuarioDTO)
        {
            var usuario = new Usuario
            {
                Correo = usuarioDTO.Correo,
                Password = _utilidades.encriptarSHA256(usuarioDTO.Password),
                TipoUsuario = new TipoUsuario { DescripcionTipo = usuarioDTO.TipoUsuario }, // *** 
                DetalleUsuario = new DetalleUsuario
                {
                    Nombre = usuarioDTO.Nombre,
                    Apellido = usuarioDTO.Apellido,
                    Telefono = usuarioDTO.Telefono,
                    Direccion = usuarioDTO.Direccion,
                    MetodoPagoPreferido = usuarioDTO.MetodoPagoPreferido
                }
            };

            _context.usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.ID }, usuarioDTO);
        }

        // PATCH: api/Usuarios/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchUsuario(int id, UsuarioModificadoDTO usuarioPatchDTO)
        {
            var usuario = await _context.usuarios
                .Include(u => u.TipoUsuario)
                .Include(u => u.DetalleUsuario)
                .FirstOrDefaultAsync(u => u.ID == id);

            if (usuario == null)
            {
                return NotFound();
            }

            // Actualizar las propiedades seleccionadas solo si están presentes en el patch DTO
            if (!string.IsNullOrEmpty(usuarioPatchDTO.Correo))
            {
                usuario.Correo = usuarioPatchDTO.Correo;
            }

            if (!string.IsNullOrEmpty(usuarioPatchDTO.Password))
            {
                usuario.Password = _utilidades.encriptarSHA256(usuarioPatchDTO.Password);
            }

            // Validar y actualizar la propiedad TipoUsuario
            if (!string.IsNullOrEmpty(usuarioPatchDTO.TipoUsuario))
            {
                if (usuario.TipoUsuario == null)
                {
                    usuario.TipoUsuario = new TipoUsuario();
                }
                usuario.TipoUsuario.DescripcionTipo = usuarioPatchDTO.TipoUsuario;
            }

            // Validar y actualizar las propiedades de DetalleUsuario
            if (usuario.DetalleUsuario == null)
            {
                usuario.DetalleUsuario = new DetalleUsuario();
            }

            if (!string.IsNullOrEmpty(usuarioPatchDTO.Nombre))
            {
                usuario.DetalleUsuario.Nombre = usuarioPatchDTO.Nombre;
            }

            if (!string.IsNullOrEmpty(usuarioPatchDTO.Apellido))
            {
                usuario.DetalleUsuario.Apellido = usuarioPatchDTO.Apellido;
            }

            if (!string.IsNullOrEmpty(usuarioPatchDTO.Telefono))
            {
                usuario.DetalleUsuario.Telefono = usuarioPatchDTO.Telefono;
            }

            if (!string.IsNullOrEmpty(usuarioPatchDTO.Direccion))
            {
                usuario.DetalleUsuario.Direccion = usuarioPatchDTO.Direccion;
            }

            if (!string.IsNullOrEmpty(usuarioPatchDTO.MetodoPagoPreferido))
            {
                usuario.DetalleUsuario.MetodoPagoPreferido = usuarioPatchDTO.MetodoPagoPreferido;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }



        // DELETE: api/Usuarios/5
        // Elimina un usuario mediante su ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _context.usuarios.Any(e => e.ID == id);
        }
    }
}
