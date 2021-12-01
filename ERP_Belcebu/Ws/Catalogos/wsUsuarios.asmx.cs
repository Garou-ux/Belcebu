using System.Web.Services;
using System.Web.Services.Protocols;
using System.ComponentModel;
using Newtonsoft.Json;
using System.Web.Configuration;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.Web.Script.Services;
using System.Xml;

namespace ERP_Belcebu.Ws.Catalogos
{
    /// <summary>
    /// Summary description for wsUsuarios
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class wsUsuarios : System.Web.Services.WebService
    {

        //[WebMethod]
        //public string HelloWorld()
        //{
        //    return "Hello World";
        //}

        #region List

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, XmlSerializeString = false)]
        public string  ListUsuarios() //trae el listado de usuarios
        {
            string resultado = "";
            DataTable dt = ReglasNegocio.Catalogos.Usuarios.ListUsuarios();
            resultado = JsonConvert.SerializeObject(dt, new JavaScriptDateTimeConverter());

           

            return resultado;

        }

        #endregion
    }
}
