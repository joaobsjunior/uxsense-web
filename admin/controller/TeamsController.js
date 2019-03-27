UXSenseWebManager.controller('TeamsController', ['$scope', '$state', '$rootScope', '$translate', 'requestService', '$timeout', 'alertService', '$stateParams', function($scope, $state, $rootScope, $translate, requestService, $timeout, alertService, $stateParams) {
    console.log('TeamsController');
    $scope.teamShowCreate = false;
    $scope.showFormBox = false;
    $scope.subgroup = {};
    $scope.form = {};
    $scope.form.subgroup = $stateParams.idsubgroup;
    if (!$scope.form.subgroup) {
        $state.go('subgroup');
        return;
    }
    $scope.form.subgroup = parseInt($scope.form.subgroup);
    var getUnitList = function() {
        var params = {};
        requestService.getUnits(params, {
            success: function(data) {
                $scope.form.unitList = data.units;
            }
        });
    }();
    var getNameSubgroup = function() {
        var params = {
            id: $scope.form.subgroup
        };
        requestService.getSubgroup(params, {
            success: function(data) {
                $scope.subgroup = data;
            }
        });
    }();
    $scope.updateTeamsList = function() {
        var params = {
            idSubgroup: $scope.form.subgroup
        };
        requestService.getTeamBySubgroup(params, {
            success: function(data) {
                $timeout(function() {
                    console.log("Team", data);
                    $scope.teams = data.teams;
                    $scope.$apply();
                });
            }
        });
    };
    $scope.updateTeamsList();
    $scope.editTeam = function(team) {
        $scope.cleanForm();
        $scope.isEdit = true;
        $scope.form.id = team.id;
        $scope.form.name = team.name;
        $scope.form.unit = team.unit.id;
        $scope.showForm();
    };
    $scope.deleteTeam = function(team) {
        var params = team;
        requestService.deleteTeam(params, {
            success: function() {
                $scope.updateTeamsList();
            }
        });
    };
    $scope.newTeam = function() {
        $scope.cleanForm();
        $scope.showForm();
    };
    $scope.showForm = function(scheduler) {
        scheduler = scheduler || {};
        $scope.showFormBox = true;
        $scope.updateFormData(scheduler);
    };
    $scope.cleanForm = function() {
        $scope.isEdit = false;
        $scope.form.id = null;
        $scope.form.name = null;
        $scope.form.unit = null;
    };
    $scope.updateFormData = function(data) {
        $timeout(function() {
            $scope.form.id = data.id || $scope.form.id;
            $scope.form.name = data.name || $scope.form.name;
        }, 0);
    };
    $scope.formCancel = function() {
        $scope.cleanForm();
        $scope.showFormBox = false;
    };
    $scope.formSave = function(event) {
        event.preventDefault();
        if ($scope.formTeam.$valid) {
            var params = {
                name: $scope.form.name,
                subgroup_id: $scope.form.subgroup,
                unit_id: $scope.form.unit,
            };
            if ($scope.form.id) {
                params.id = $scope.form.id;
            }
            requestService.setTeam(params, {
                success: function() {
                    if (!params.id) {
                        $scope.cleanForm();
                    } else {
                        $scope.formCancel();
                    }
                    $scope.updateTeamsList();
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
        }
    };
}]);
