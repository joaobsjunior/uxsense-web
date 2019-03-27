UXSenseWebManager.controller('GroupsController', ['$scope', '$state', '$rootScope', '$translate', 'requestService', '$timeout', 'alertService', '$stateParams', function($scope, $state, $rootScope, $translate, requestService, $timeout, alertService, $stateParams) {
    $scope.groupShowCreate = false;
    $scope.updateGroupsList = function() {
        requestService.getGroups(null, {
            success: function(data) {
                $timeout(function() {
                    $scope.groups = data.groups;
                    $scope.$apply();
                });
            }
        });
    };
    $scope.updateGroupsList();
    $scope.changeGroup = function(group) {
        if (group.name.toLocaleLowerCase() === group._name.toLocaleLowerCase()) {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
            return;
        }
        var params = {
            id: group.id,
            name: group._name
        };
        requestService.setGroup(params, {
            success: function(data) {
                $scope.updateGroupsList();
            }
        });
    };
    $scope.viewGroup = function(group) {
        $state.go('subgroups', {
            idgroup: group.id
        });
    };
    $scope.deleteGroup = function(group) {
        var params = group;
        requestService.deleteGroup(params, {
            success: function() {
                $scope.updateGroupsList();
            }
        });
    };
    $scope.registerGroup = function(event) {
        event.preventDefault();
        if ($scope.formRegister.$valid) {
            var params = {
                name: $scope.send.name
            };
            requestService.setGroup(params, {
                success: function() {
                    $scope.send.name = null;
                    $scope.updateGroupsList();
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
        }
    };
}]);
