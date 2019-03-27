UXSenseWebManager.controller('LoginController', ['$scope', '$state', '$rootScope', 'requestService', 'alertService', '$translate', function($scope, $state, $rootScope, requestService, alertService, $translate) {
    console.log("LoginController");
    $scope.user = {};
    $scope.submit = function(event) {
        event.preventDefault();
        if (!$scope.userForm.$invalid) {
            var params = {
                "login": $scope.user.email,
                "password": $scope.user.password
            };
            requestService.login(params, {
                success: function(response) {
                    $rootScope.authHeader['GSX-CODE'] = response.id;
                    $rootScope.authHeader['GSX-TOKEN'] = response.token;
                    $rootScope.authData = response;
                    $rootScope.authData.authenticated = true;
                    $rootScope.updateDataStorage();
                    $state.go('home');
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-AllRequired')
            });
        }
    };
    $scope.onEnter = function(keyEvent) {
        if (keyEvent.which === 13) {
            $scope.submit();
        }
    };
}]);
