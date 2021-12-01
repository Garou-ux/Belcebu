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

        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, $templateCache) {
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            if (typeof (toState) !== 'undefined') {
                $templateCache.remove(toState.templateUrl);
            }
        });
    });


