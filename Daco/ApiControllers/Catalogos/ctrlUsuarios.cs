using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
namespace Daco.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class ctrlUsuarios : Controller
    {

        #region List
        [HttpGet("", Name = "ListUsuarios")]

        public string ListUsuarios()
        {
            string resultado = "";
            DataTable dt = ReglasNegocio.Catalogos.Usuarios.ListUsuarios();
            resultado = JsonConvert.SerializeObject(dt, new JavaScriptDateTimeConverter());
            return resultado;
        }
        #endregion


        #region Add
        [HttpPost(Name ="AddUsuarios")]
        public string AddUsuario(int UsuarioId, string Maestro)
        {
            //Convierte los datos del maestro a datatable
            string result = "";
            DataTable dtMaestro = new DataTable();
            dtMaestro = JsonConvert.DeserializeObject<DataTable>(Maestro);

            //Llama a la regla de negocio
            DataTable dt = ReglasNegocio.Catalogos.Usuarios.AddUsuario(UsuarioId, dtMaestro);
            result = JsonConvert.SerializeObject(dt, new JavaScriptDateTimeConverter());

            return result;

        }
        #endregion
    }


}
