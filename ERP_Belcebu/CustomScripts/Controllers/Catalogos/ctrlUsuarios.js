
// Controlador para la vista de la lista de usuarios
appBelcebu.controller('ctrlUsuariosLista', ['$scope', 'facUsuarios',
    function ($scope, facUsuarios) {
        $scope.Mensaje = "Mierdas  ";

        //#region Variables
        $scope.Usuarios = [];
        //#endregion

        //#region Obtenemos la lista de usuarios y la guardamos en el array $scope.Usuarios
        facUsuarios.ListUsuarios().
            success(function (data, status) {
                $scope.Usuarios = eval(data.d);
            }).
            error(function (data, status) {
                alert(data.Message);
            });

        //#endregion

        //#region Grid donde se mostrara la lista de los usuarios que pertenecen a esa empresa
        $scope.DetalleLista = {
            data: 'Usuarios',
            columnDefs: [

                { field: "Nombre", displayName: "Nombre", cellTemplate: '<div  style="text-align:left;"><a ui-sref="Usuarios({Id:row.entity[\'UsuarioId\']})"> {{row.entity[col.field]}}</a></div>' },
                { field: "Usuario", displayName: "Usuario"}


            ],
            enableRowSelection: false
        };
        //#endregion

    }]);

//Controlador para la captura de usuarios

appBelcebu.controller('ctrlUsuarios', ['$scope', 'facUsuarios','$stateParams','$state',
    function ($scope, facUsuarios, $stateParams, $state) {

        //#region Variables
        $scope.Datos = {};

        //#endregion


        //#region Obtenemos el id del usuario
        var UsuarioId = $stateParams.Id;
        //#endregion

        //#region carga los datos al formulario
        $scope.GetUsuario = function () {
            //obtiene la información de un usuario x id
            facUsuarios.GetUsuario($stateParams.Id).
                success(function (data, status) {
                    var Respuesta = eval('(' + data.d + ')');
                    if (Respuesta.root == undefined || Respuesta.root == null) { // se valida que se tenga datos
                        $scope.Datos = Respuesta;
                    } else {
                        $scope.Datos = Respuesta.root.registros;
                    }
                }).
                error(function (data, status) {
                    alert(data.Message);
                });
        }
        //#endregion

        //#region Validamos si es un usuario existente, ejecutamos la api para cargar el formulario con los datos del usuario existente
        if ($stateParams.Id > 0 || $stateParams != undefined) {
            $scope.GetUsuario();
        }
        //#endregion


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

            facUsuarios.AddUsuario(UsuarioId, angular.toJson(t)).
                success(function (data, status) {
                    $scope.Guardado = eval(data.d);
                    alert('Proceso Completado Correctamente');
                    $state.go('UsuariosLista');
                })

        }
        //#endregion

}])