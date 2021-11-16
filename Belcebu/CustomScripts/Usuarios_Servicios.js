
UsuariosApp.service("UsuariosService", function ($http) {


    //get Usuarios
    this.GetUsuarios = function () {
        var response = $http({
            method: 'GET',
            url: 'Home/GetUsuarios',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        });
        return response;
    }



    //insertar/actualizar Usuario
    this.Agregar_ActualizarUsuario = function (stObject) {

        var response = $http({
            method: 'POST',
            url: 'Home/Agregar_Actualizar', //nombre del html donde controlara
            data: JSON.stringify(stObject),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        });
        return response;
    }
});