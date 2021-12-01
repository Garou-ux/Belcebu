using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace ERP_Belcebu.Servidor
{
    public class Servidor
    {
        public static string Conn()
        {


            return ConfigurationManager.ConnectionStrings["Servidor"].ConnectionString;
        }
    }
}