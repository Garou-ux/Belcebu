var appBelcebu = angular.module('ERP_Belcebu', ['ui.router', 'ngGrid'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('UsuariosLista', {
                url: '/UsuariosLista/:Id',
                templateUrl: 'views/Catalogos/UsuariosLista.html',
                controller: 'ctrlUsuariosLista'
            })

            .state('Usuarios', {
                url: '/Usuarios/:Id',
                templateUrl: 'views/Catalogos/Usuarios.html',
                controller: 'ctrlUsuarios'
            })
            .state('SolicitudCompraLista', {
                url: '/SolicitudCompraLista',
                templateUrl: 'views/Procesos/SolicitudCompraLista.html',
                controller : 'ctrlSolicitudCompraLista'
            })
            .state('SolicitudCompra',{
                url: '/SolicitudCompra/:Id',
                templateUrl: 'views/Procesos/SolicitudCompra.html',
                controller : 'ctrlSolicitudCompra'
            })
        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, $templateCache) {
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            if (typeof (toState) !== 'undefined') {
                $templateCache.remove(toState.templateUrl);
            }
        });
    });


