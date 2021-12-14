using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
namespace WebApiDaco.Servidor
{
    public class Servidor
    {
     
        public static IConfigurationRoot Configuration { get; set; }
        public static string Conn()
        {
            var builder = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json");

            Configuration = builder.Build();
            var connectionString = Configuration["ConnectionStrings:Servidor"];
            return connectionString;
        }
    }
}