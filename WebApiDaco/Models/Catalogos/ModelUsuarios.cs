using System.Data.SqlClient;
using System.Data;
using System.ComponentModel.DataAnnotations;

namespace WebApiDaco.Models.Catalogos
{
    public class ModelUsuarios
    {
       [Key]
        public int UsuarioId { get; set; }
        public string Nombre { get; set; }

        public string Usuario { get; set; }

        public string Pwd { get; set; } 
        public int EmpresaId { get; set; }
        public int Uso { get; set; }    
        public int AlmacenId { get; set; }  
        public int RolId { get; set; }  


    }
}
