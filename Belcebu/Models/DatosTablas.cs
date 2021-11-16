using System;
using System.ComponentModel.DataAnnotations;

namespace Belcebu.Models
{
    public class DatosTablas
    {
            public int UsuarioId { get; set; }
            public string Nombre { get; set; }
            public string Usuario { get; set; }
            public string Pwd { get; set; }
            public int Empresa { get; set; }
            public int Sucursal { get; set; }
            public bool Activo { get; set; }
            public string FotoNombre { get; set; }
            public int AlmacenId { get; set; }
        

    }
}