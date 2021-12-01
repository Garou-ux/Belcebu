
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

                { field: "Nombre", displayName: "Nombre",  cellTemplate: '<div style="text-align:left;"><a ui-sref="Usuarios({Id:row.entity[\'UsuarioId\']})"> {{row.entity[col.field]}}</a></div>' },
                { field: "Usuario", displayName: "Usuario"}


            ],
            enableRowSelection: false
        };
        //#endregion

    }]);

//Controlador para la captura de usuarios

appBelcebu.controller('ctrlUsuarios', ['$scope', 'facUsuarios','$stateParams',
    function ($scope, facUsuarios, $stateParams) {

        //#region Variables
        $scope.Datos = {};

        //#endregion

        //#region
        $scope.Guardar = function () {

            var DatosMaestro = {};

            DatosMaestro.UsuarioId = $scope.Datos.UsuarioId || 0;
            DatosMaestro.Nombre = $scope.Datos.Nombre || '';
            DatosMaestro.Usuario = $scope.Datos.Usuario || '';
            DatosMaestro.Pwd = $scope.Datos.Pwd || '';
            DatosMaestro.EmpresaId = 1;
            DatosMaestro.Uso = $scope.Datos.Uso;
            DatosMaestro.RolId = $scope.Datos.RolId || 0;


            var t = [];
            t.push(DatosMaestro);

        }
        //#endregion

}])