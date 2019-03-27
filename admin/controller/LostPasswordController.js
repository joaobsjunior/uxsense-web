UXSenseWebManager.controller('LostPasswordController', function($scope, $state, $rootScope, requestService, alertService, $translate) {
    console.log("LostPasswordController");
    $scope.form = {};
    $scope.submit = function(event) {
        event.preventDefault();
        if (!$scope.formLostPassword.$invalid) {
            var params = {
                login: $scope.form.email
            };
            requestService.lostPassword(params, {
                success: function(response) {
                    if (response.created) {
                        if (response.sent) {
                            alertService.alert({
                                message: $translate.instant('msg-ActivateSuccessSend')
                            });
                        } else {
                            alertService.alert({
                                message: $translate.instant('msg-ActivateSuccessNotSend')
                            });
                        }
                    }
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-AllRequired')
            });
        }
    };
});
