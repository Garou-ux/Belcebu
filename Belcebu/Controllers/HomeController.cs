
using System.Collections.Generic;
using System.Web.Mvc;
using Belcebu.Models;
using Belcebu.Repositorios;
namespace Belcebu.Controllers
{
    public class HomeController : Controller
    {
        RepositorioUsuarios Repo = new RepositorioUsuarios();
        public ActionResult Index()
        {
            return View();
        }

    [HttpGet]
    public JsonResult GetUsuarios()
        {
            List<DatosTablas> obj = Repo.GetUsuarios();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
      
        [HttpPost]
        public void Agregar_Actualizar(DatosTablas usus)
        {
            Repo.AgregarActualizarUsuario(usus);
            //string res = string.Empty;
            //try
            //{
            //    AgregaractualizarUsuario.AgregarActualizarUsuario(usus);
            //    res = "Completado";
            //}
            //catch (Exception)
            //{

            //    res = "Error";

            //}

            //return Json(res, JsonRequestBehavior.AllowGet);

        }
    }
}