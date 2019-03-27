UXSenseWebManager.controller('ActivitiesController', ['$scope', '$state', '$rootScope', '$translate', 'requestService', '$timeout', 'alertService', '$stateParams', function($scope, $state, $rootScope, $translate, requestService, $timeout, alertService, $stateParams) {
    $scope.activityShowCreate = false;
    $scope.updateActivitiesList = function() {
        requestService.getActivities(null, {
            success: function(data) {
                $timeout(function() {
                    $scope.activities = data.activities;
                    $scope.$apply();
                });
            }
        });
    };
    $scope.updateActivitiesList();
    $scope.changeActivity = function(activity) {
        if (activity.description.toLocaleLowerCase() === activity._description.toLocaleLowerCase()) {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
            return;
        }
        var params = {
            id: activity.id,
            description: activity._description
        };
        requestService.setActivity(params, {
            success: function(data) {
                $scope.updateActivitiesList();
            }
        })
    }
    $scope.deleteActivity = function(activity) {
        var params = activity;
        requestService.deleteActivity(params, {
            success: function() {
                $scope.updateActivitiesList();
            }
        });
    }
    $scope.registerActivity = function(event) {
        event.preventDefault();
        if ($scope.formRegister.$valid) {
            var params = {
                description: $scope.send.description
            };
            requestService.setActivity(params, {
                success: function() {
                    $scope.send.description = null;
                    $scope.updateActivitiesList();
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
        }
    }
}]);
