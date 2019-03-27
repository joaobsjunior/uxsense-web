UXSenseWebManager.controller('MainController', ['$scope', '$state', '$rootScope', '$translate', 'requestService', '$timeout', function ($scope, $state, $rootScope, $translate, requestService, $timeout) {
    var updateAppTitle = function (stateName) {
        switch (stateName) {
            case "login":
                $rootScope.appTitle = $translate.instant('title-Login');
                break;
            case "login.lostpassword":
                $rootScope.appTitle = $translate.instant('title-LoginLostPassword');
                break;
            default:
                $rootScope.appTitle = $translate.instant('title-Default');
        }
        if ($rootScope.appTitle != $translate.instant('title-Default')) {
            $rootScope.appTitle += ' | ' + $translate.instant('title-Default');
        }
    };
    var changeMenu = function (stateName) {
        switch (stateName) {
            case "login":
            case "lostPassword":
            case "firstAccess":
                if ($rootScope.authData.authenticated) {
                    $state.go('home');
                }
                $scope.menuHeader = "view/menu.html";
                break;
            case "contact":
                break;
            default:
                if (!$rootScope.authData.authenticated) {
                    $state.go('login');
                }
                $scope.menuHeader = "view/menu-auth.html";
        }
    };
    $scope.$on('$viewContentLoading', function (event, viewConfig) {
        $timeout(function () {
            $rootScope.isRouteLoading = true;
        }, 0);
    });
    $scope.$on('$viewContentLoaded', function (event, viewConfig) {
        $timeout(function () {
            $rootScope.starckLoading.pop();
            if (!$rootScope.starckLoading.length) {
                $rootScope.isRouteLoading = false;
            }
            $rootScope.bodyClass = $state.current.bodyClassName;
            updateAppTitle($state.current.name);
            changeMenu($state.current.name);
        }, 0);
    });
    $rootScope.$on('$translateChangeSuccess', function () {
        updateAppTitle($state.current.name);
    });
    $scope.setLang = function (lang) {
        if ($translate.use() != lang && Locale.hasOwnProperty(lang)) {
            $translate.use(lang);
        }
    };
    $rootScope.exitSite = function (isRequest) {
        if (isRequest) {
            $rootScope.authData = {};
            $rootScope.authHeader = {};
            $rootScope.updateDataStorage();
            $state.go('login');
        } else {
            requestService.logout({}, {
                success: function (data) {
                    $rootScope.authData = {};
                    $rootScope.authHeader = {};
                    $rootScope.updateDataStorage();
                    $state.go('login');
                },
                error: function (data) {}
            });
        }
    };
}]);