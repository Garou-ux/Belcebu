UsuariosApp.controller("HomeController", function ($scope, UsuariosService) {

    $scope.attendance = {
        value: true
    };


    //obtener todos los usuarios
    GetAllUsuarios();
    function GetAllUsuarios() {
        var stObj = UsuariosService.GetUsuarios();
        stObj.then(function (us) {
            $scope.Usuarios = us.data;
        }, function (error) {

        })
    }

    //fin obtener todos los usuarios

    //valor de boton guardar
    $scope.btntext = "Guardar";

    //Agregar_ActualizarUsuarios
    $scope.AgregarActualizarUs = function () {   
        var stObject = {
            UsuarioId: $scope.UsuarioId,
            Nombre: $scope.Nombre,
            Usuario: $scope.Usuario,
            Pwd: $scope.Pwd,
            Empresa: $scope.Empresa,
            Sucursal: $scope.Sucursal,
            Activo: true,
            FotoNombre: $scope.FotoNombre,
            AlmacenId: $scope.AlmacenId


        };
        var stObj = UsuariosService.Agregar_ActualizarUsuario(stObject);
        stObj.then(function (succes) {
            alert('Usuario guardado correctamente');
        }, function (error) {
            alert('Error');
        })
    }
    //Fin guardar_actualizarUsuarios

    //abrir modal para agregar o actualizar usuario(tambien limpia el formulario)

    $scope.BtnModal = function () {
        $scope.UsuarioId = "";
        $scope.Nombre = "";
        $scope.EmpresaId = "";
        $scope.SucursalId = "";
        $scope.AlmacenID = "";


        $('#btnUpdate').hide();
        $('#btnAdd').show();



    }

    //fin

});