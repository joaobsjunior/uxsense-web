UXSenseWebManager.controller('FirstAccessController', function($scope, $state, $rootScope, requestService, alertService, $translate) {
    console.log("FirstAccessController");
    $scope.form = {};
    $scope.submit = function(event) {
        event.preventDefault();
        if (!$scope.formToken.$invalid) {
            if ($scope.form.password !== $scope.form.passwordConfirm) {
                alertService.alert({
                    message: $translate.instant('msg-PasswordNotEquals')
                });
                return;
            }
            var params = {
                token: $scope.form.token,
                password: $scope.form.password,
            };
            requestService.firstAccess(params, {
                success: function(response) {
                    alertService.alert({
                        message: $translate.instant('msg-PasswordChangeSuccess')
                    });
                    $scope.form = {};
                    $state.go('login');
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-AllRequired')
            });
        }
    };
});
