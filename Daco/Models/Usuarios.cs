using System.ComponentModel.DataAnnotations;

namespace Daco.Models

{
    public class Usuarios
    {
       
        public int UsuarioId { get; set; }
       
        public string Nombre { get; set; }
        public string Usuario { get; set; }
        public string Pwd { get; set; }
        public int EmpresaId { get; set; }
        public bool Uso { get; set; }
        public int AlmacenId { get; set; }
        public int RolId { get; set; }

    }
}
