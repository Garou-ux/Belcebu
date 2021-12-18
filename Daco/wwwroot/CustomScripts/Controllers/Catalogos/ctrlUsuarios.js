
// Controlador para la vista de la lista de usuarios
appBelcebu.controller('ctrlUsuariosLista', ['$scope', 'facUsuarios','ServiceUsuarios',
    function ($scope, facUsuarios, ServiceUsuarios) {
        $scope.Mensaje = "Mierdas  ";

        //#region Variables
        $scope.Usuarios = [];
        //#endregion

        fnObtenerListaUsuarios(); //Ejecutamos la funcion que cargara la lista de usuarios

        //#region funcion para Obtener la lista de usuarios
        function fnObtenerListaUsuarios() {
            var CallUsuariosService = ServiceUsuarios.getUsuarios();
            CallUsuariosService.then(function (d) {
                $scope.ListUsuarios = d.data;
            }, function (error) {
                alert('Error');
            })
        }
        //#endregion
     
    }]);

//Controlador para la captura de usuarios

appBelcebu.controller('ctrlUsuarios', ['$scope', 'facUsuarios', '$stateParams', '$state','ServiceUsuarios',
    function ($scope, facUsuarios, $stateParams, $state, ServiceUsuarios) {

        //#region Variables
        $scope.Datos = [];

        //#endregion


        //#region Obtenemos el id del usuario
        var UsuarioId = $stateParams.Id;
        //#endregion

     
        fnGetUsuario();
        //#region carga los datos al formulario
        function fnGetUsuario() {
            var CallUsuariosService = ServiceUsuarios.GetUsuario(UsuarioId);
            CallUsuariosService.then(function (d) {
                var Respuesta = d.data;
                if (Respuesta.root == undefined || Respuesta.root == null) { // se valida que se tenga datos
                        $scope.Datos = Respuesta;
                    } else {
                        $scope.Datos = Respuesta.root.registros;
                    }

            }, function (error) {
                alert('Error');
            })
        }

       
        //#endregion

        ////#region Validamos si es un usuario existente, ejecutamos la api para cargar el formulario con los datos del usuario existente
       
        ////#endregion


        //#region Guarda el usuario
        $scope.Guardar = function () {
            //validamos que los datos obligatorios tengan datos
            if ($scope.frmDatos.$valid == false) {
                alert('favor, capture los campos obligatorios para guardar la información')
                return;
            }

            var DatosMaestro = {};



            DatosMaestro.UsuarioId = UsuarioId || 0;
            DatosMaestro.Nombre = $scope.Datos.Nombre || '';
            DatosMaestro.Usuario = $scope.Datos.Usuario || '';
            DatosMaestro.Pwd = $scope.Datos.Pwd || '';
            DatosMaestro.EmpresaId = 1;
            DatosMaestro.Uso = $scope.Datos.Uso;
            DatosMaestro.RolId = $scope.Datos.RolId || 0;


            var t = [];
            t.push(DatosMaestro);// convertimos el objeto a un array

            var Guarda = ServiceUsuarios.AddUsuarios(UsuarioId, angular.toJson(t));
            Guarda.then(function (response) {
                $scope.Guardado = response.data;
                alert('Proceso Completado Correctamente');
            }, function (error) {
                $scope.Guardado[0].MensajeError;
                alert($scope.Guardado[0].MensajeError);
            })
        

        }
        //#endregion

}])