UXSenseWebManager.controller('QuestionsController', ['$scope', '$state', '$rootScope', '$translate', 'requestService', '$timeout', 'alertService', '$stateParams', function($scope, $state, $rootScope, $translate, requestService, $timeout, alertService, $stateParams) {
    $scope.questionShowCreate = false;
    $scope.updateQuestionsList = function() {
        requestService.getQuestions(null, {
            success: function(data) {
                $timeout(function() {
                    $scope.questions = data.questions;
                    $scope.$apply();
                });
            }
        });
    };
    $scope.updateQuestionsList();
    $scope.changeQuestion = function(question) {
        if (question.question.toLocaleLowerCase() === question._question.toLocaleLowerCase()) {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
            return;
        }
        var params = {
            id: question.id,
            question: question._question
        };
        requestService.setQuestion(params, {
            success: function(data) {
                $scope.updateQuestionsList();
            }
        });
    };
    $scope.viewSchedulerQuestion = function(question) {
        $state.go('scheduler', {
            id: question.id,
            question: question.question
        });
    };
    $scope.deleteQuestion = function(question) {
        var params = question;
        requestService.deleteQuestion(params, {
            success: function() {
                $scope.updateQuestionsList();
            }
        });
    };
    $scope.registerQuestion = function(event) {
        event.preventDefault();
        if ($scope.formRegister.$valid) {
            var params = {
                question: $scope.send.question
            };
            requestService.setQuestion(params, {
                success: function() {
                    $scope.send.question = null;
                    $scope.updateQuestionsList();
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
        }
    };
}]);
