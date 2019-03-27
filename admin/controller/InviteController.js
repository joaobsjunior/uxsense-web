UXSenseWebManager.controller('InviteController', function($scope, $state, $rootScope, requestService, alertService, $translate) {
    console.log("InviteController");
    $scope.form = {};
    $scope.submit = function(event) {
        event.preventDefault();
        if (!$scope.formInvite.$invalid) {
            var params = {
                login: $scope.form.email,
                name: $scope.form.name,
                group_id: $scope.form.group
            };
            requestService.invite(params, {
                success: function(response) {
                    if (response.created) {
                        if (response.sent) {
                            alertService.alert({
                                message: $translate.instant('msg-InviteSuccessSend')
                            });
                        } else {
                            alertService.alert({
                                message: $translate.instant('msg-InviteSuccessNotSend')
                            });
                        }
                    }
                },
                error: function(response) {
                    if (response.response.showMessage) {
                        alertService.alert({
                            message: $translate.instant('msg-' + response.response.message)
                        });
                    }
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-AllRequired')
            });
        }
    };
    var getGroupList = function() {
        requestService.getGroups(null, {
            success: function(data) {
                $scope.form.groupList = data.groups;
            }
        });
    }();
});
