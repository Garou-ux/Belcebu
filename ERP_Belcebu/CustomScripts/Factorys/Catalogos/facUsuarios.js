appBelcebu.factory('facUsuarios', ['$http',
    function ($http) {

        var servicio = {};

        servicio.ListUsuarios = function () {
            return $http.post('ws/Catalogos/wsUsuarios.asmx/ListUsuarios', {
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, /;'}
            });

        }

        return servicio;
    }]);