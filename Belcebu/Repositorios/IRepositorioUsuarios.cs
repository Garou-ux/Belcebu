
using Belcebu.Models;
using System.Collections.Generic;

namespace Belcebu.Repositorios
{
    interface IRepositorioUsuarios
    {
        List<DatosTablas> GetUsuarios();
        void AgregarActualizarUsuario(DatosTablas usus);

    }
}
