
// Llama manda parametros al ws para ejecutar el Stored

appBelcebu.service('ServiceUsuarios', function ($http) {

    //#region List
    //Obtenemos la lista de usuarios
    this.getUsuarios = function () {
        return $http.get("api/ctrlUsuarios")
    }

    //#endregion

    //#region Add
    this.AddUsuarios = function (UsuarioId, Maestro) {
        var data = {UsuarioId: UsuarioId, Maestro: Maestro}
        return $http({
            url: 'api/ctrlUsuarios',
            method: 'post',
            params: data
        });
    }
    //#endregion

    //#region Get
    //Ontenemos un usuario x id

    //#endregion


});

appBelcebu.factory('facUsuarios', ['$http',
    function ($http) {

        var servicio = {};

        //#region List
        //Obtenemos la lista de usuarios
        servicio.ListUsuarios = function () {
            return $http.post('/api/ctrlUsuarios/', {
        
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, /;'}
            });

        }
        //#endregion

        //#region Add
        // Agregamos un usuario o actualizamos
        servicio.AddUsuario = function (UsuarioId, Maestro) {
            return $http.post('api/ctrlUsuarios', { UsuarioId : UsuarioId, Maestro : Maestro}, {
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, /;' }

            });
        }
        //#endregion

        //#region Get
         //Obtenemos el Usuario x id
        servicio.GetUsuario = function (UsuarioId) {
            return $http.post('http://localhost:62023/Ws/Catalogos/wsUsuarios.asmx/GetUsuario', { UsuarioId: UsuarioId }, {
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, /;' }
            });
        }

        //#endregion

        return servicio;
    }]);