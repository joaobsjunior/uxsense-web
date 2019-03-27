UXSenseWebManager.controller('SubgroupsController', ['$scope', '$state', '$rootScope', '$translate', 'requestService', '$timeout', 'alertService', '$stateParams', function($scope, $state, $rootScope, $translate, requestService, $timeout, alertService, $stateParams) {
    $scope.subgroupShowCreate = false;
    console.log('SubgroupsController');
    $scope.group = {};
    $scope.group.id = $stateParams.idgroup;
    if (!$scope.group.id) {
        $state.go('groups');
        return;
    }
    var getNameGroup = function() {
        var params = {
            id: $scope.group.id
        };
        requestService.getGroup(params, {
            success: function(data) {
                $scope.group = data;
            }
        });
    };
    getNameGroup();
    $scope.updateSubgroupsList = function() {
        var params = {
            idGroup: $scope.group.id
        };
        requestService.getSubgroupByGroup(params, {
            success: function(data) {
                $timeout(function() {
                    $scope.subgroups = data.subgroups;
                    $scope.$apply();
                });
            }
        });
    };
    $scope.viewGroup = function(subgroups) {
        $state.go('teams', {
            idsubgroup: subgroups.id
        });
    };
    $scope.updateSubgroupsList();
    $scope.changeSubgroup = function(subgroup) {
        var params = {
            id: subgroup.id,
            name: subgroup._name,
            complement: subgroup._complement,
            group_id: subgroup.group.id
        };
        if (!params.name) {
            delete params.name;
        }
        if (!params.complement) {
            delete params.complement;
        }
        requestService.setSubgroup(params, {
            success: function(data) {
                $scope.updateSubgroupsList();
            }
        });
    };
    $scope.deleteSubgroup = function(subgroup) {
        var params = subgroup;
        requestService.deleteSubgroup(params, {
            success: function() {
                $scope.updateSubgroupsList();
            },
            error: function() {
                $scope.updateSubgroupsList();
            }
        });
    };
    $scope.registerSubgroup = function(event) {
        event.preventDefault();
        if ($scope.formRegister.$valid) {
            var params = {
                name: $scope.send.name,
                complement: $scope.send.complement,
                group_id: $scope.group.id
            };
            if (!params.name) {
                alertService.alert({
                    message: $translate.instant('msg-NotChange')
                });
                return;
            }
            if (!params.complement) {
                delete params.complement;
            }
            requestService.setSubgroup(params, {
                success: function() {
                    $scope.send.name = null;
                    $scope.updateSubgroupsList();
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
        }
    };
}]);
