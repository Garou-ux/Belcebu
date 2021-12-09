
// Llama manda parametros al ws para ejecutar el Stored

appBelcebu.factory('facUsuarios', ['$http',
    function ($http) {

        var servicio = {};

        //#region List
        //Obtenemos la lista de usuarios
        servicio.ListUsuarios = function () {
            return $http.post('ws/Catalogos/wsUsuarios.asmx/ListUsuarios', {
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, /;'}
            });

        }
        //#endregion

        //#region Add
        // Agregamos un usuario o actualizamos
        servicio.AddUsuario = function (UsuarioId, Maestro) {
            return $http.post('ws/Catalogos/wsUsuarios.asmx/AddUsuario', { UsuarioId : UsuarioId, Maestro : Maestro}, {
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, /;' }

            });
        }
        //#endregion

        //#region Get
         //Obtenemos el Usuario x id
        servicio.GetUsuario = function (UsuarioId) {
            return $http.post('ws/Catalogos/wsUsuarios.asmx/GetUsuario', { UsuarioId: UsuarioId }, {
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, /;' }
            });
        }

        //#endregion

        return servicio;
    }]);