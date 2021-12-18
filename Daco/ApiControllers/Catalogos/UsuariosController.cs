using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Xml;
using Daco.Servidor;
using Daco.Models;
using Microsoft.EntityFrameworkCore;

namespace Daco.Controllers.Catalogos
{
    //Esta api servira para hacer peticiones a todo lo relacionado sobre usuarios
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        

        #region List
        [HttpGet]
        [Route("ListUsuarios")]

        public  string ListUsuarios()
        {
            
            DataTable dt = ReglasNegocio.Catalogos.Usuarios.ListUsuarios();
          string  resultado = JsonConvert.SerializeObject(dt, new JavaScriptDateTimeConverter());
           return resultado;
        }
        #endregion


        #region Add
        [HttpPost]
        [Route("AddUsuario")]
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

        #region Get
        [HttpGet]
        [Route("GetUsuario")]
        public string GetUsuario(int UsuarioId)
        {
            string resultado = "";
           
            XmlDocument xml = ReglasNegocio.Catalogos.Usuarios.GetUsuario(UsuarioId);
            resultado = JsonConvert.SerializeXmlNode(xml);
            return resultado;
        }
        #endregion
    }


}
