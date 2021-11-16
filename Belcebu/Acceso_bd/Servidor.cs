using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
namespace Belcebu.Acceso_bd
{
    public class Servidor
    {
        //obtenemos la conexion del web config con el siguiente metodo, te amo paquito
        public static string Log { get { return ConfigurationManager.ConnectionStrings["Servidor"].ConnectionString; } }
    }
}