var globalScope = {};
UXSenseWebManager.controller('SchedulerController', ['$scope', '$filter', '$state', '$rootScope', '$translate', 'requestService', '$timeout', 'alertService', '$stateParams', function ($scope, $filter, $state, $rootScope, $translate, requestService, $timeout, alertService, $stateParams) {
    var map = null,
        groupList = [],
        zoneString = new Date().toISOString().substring(20);
    $scope.techEmotions = [
        ["grupo", 0, 1, 2, 3, 4, 5, 6, 8],
        ["Angústia", 3, 2, 1, 3, 1, 1, 1, 2],
        ["Desagrado", 2, 1, 0, 1, 1, 1, 0, 0],
        ["Desânimo", 4, 3, 4, 0, 1, 1, 1, 2],
        ["Sonolência", 3, 1, 2, 0, 1, 1, 1, 2],
        ["Relaxamento", 5, 4, 4, 1, 3, 2, 1, 3],
        ["Prazer", 2, 2, 2, 1, 2, 1, 2, 2],
        ["Entusiasmo", 2, 1, 1, 1, 1, 2, 1, 1],
        ["Excitação", 5, 2, 4, 1, 0, 2, 1, 2]
    ];
    $scope.emotions = (function () {
        var emotions = [];
        for (var i = 1; i < $scope.techEmotions.length; i++) {
            emotions.push({
                id: i,
                name: $scope.techEmotions[i][0]
            });
        }
        return emotions;
    })();
    $scope.techFilter = [];
    $scope.emotinosChecked = {};
    globalScope = $scope;
    $scope.tecnicaRecomendada = {};
    $scope.tecnicaRecomendadaTxt = "";
    $scope.onClickEmotions = function () {
        console.log($scope.techEmotions);
        var tecnicasReprovadas = [];
        var tecnicasAprovadas = {};
        $scope.tecnicaRecomendadaTxt = "";
        for (var i = 1; i < $scope.techEmotions.length; i++) {
            if ($scope.emotinosChecked[i] == false){
                delete $scope.emotinosChecked[i];
            }
            for (var j = 2; j < $scope.techEmotions[i].length; j++) {
                var tecnicaId = $scope.techEmotions[0][j];

                if ($scope.emotinosChecked[i] == true && tecnicasReprovadas.indexOf(tecnicaId) == -1) {
                    var tecnicaNome = $scope.form.techniqueList.filter(function (obj) {
                        return obj.id == tecnicaId
                    })[0].name;
                    var emocaoNome = $scope.techEmotions[i][0];
                    var valor = $scope.techEmotions[i][j];

                    var data = {
                        tecnicaNome: tecnicaNome,
                        tecnicaId: tecnicaId,
                        emocaoNome: emocaoNome,
                        valor: valor
                    }
                    if (valor <= 0) {
                        tecnicasReprovadas.push(tecnicaId);
                        delete tecnicasAprovadas[tecnicaId];
                    } else {
                        tecnicasAprovadas[tecnicaId] = tecnicasAprovadas[tecnicaId] ? tecnicasAprovadas[tecnicaId] + valor : valor;
                    }
                }
            }
        }

        console.log("tecnicasReprovadas",tecnicasReprovadas);
        console.log("tecnicasAprovadas", tecnicasAprovadas);

        if(Object.keys(tecnicasAprovadas).length){

            var sortable = [];
            for (var _tecnica in tecnicasAprovadas) {
                sortable.push([_tecnica, tecnicasAprovadas[_tecnica]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            var tecnicaRecomendada = $scope.form.techniqueList.filter(function (obj) {
                return obj.id == sortable[0][0]
            })[0];
            console.log(tecnicaRecomendada);
            $scope.tecnicaRecomendadaTxt = "A técnica recomendada é: "+tecnicaRecomendada.name;
            $scope.form.technique = tecnicaRecomendada.id

        }
    };
    $scope.inQuestion = $stateParams.id || false;
    $scope.question = $stateParams.question;
    $scope.minDate = new Date();
    $scope.minDate.setHours(0);
    $scope.minDate.setMinutes(0);
    $scope.minTime = function () {
        if ($scope.form.date) {
            var now = new Date(),
                value1 = dateFormat($scope.form.date, 'yyyy-mm-dd'),
                value2 = dateFormat(now, 'yyyy-mm-dd');
            if (value1 === value2) {
                return $filter("date")(new Date(), "HH:mm");
            }
        }
        return "00:00";
    };
    $scope.showFormBox = false;
    $scope.schedulerShowCreate = false;
    $scope.form = {};
    $scope.form.typeScheduler = "custom";
    $scope.updateSchedulerList = function () {
        var params = {
            question_id: parseInt($scope.inQuestion)
        };
        requestService.getScheduler(params, {
            success: function (data) {
                $timeout(function () {
                    $scope.schedulers = data.schedulers;
                    $scope.showFormBox = false;
                    $scope.$apply();
                });
            }
        });
    };
    $scope.updateSchedulerList();
    var getQuestionList = function () {
        requestService.getQuestions(null, {
            success: function (data) {
                $scope.form.questionList = data.questions;
            }
        });
    }();
    var getGroupList = function () {
        requestService.getGroups(null, {
            success: function (data) {
                $scope.form.groupList = data.groups;
            }
        });
    }();
    var getTechniqueList = function () {
        requestService.getTechniques(null, {
            success: function (data) {
                $scope.form.techniqueList = data.techniques;
            }
        });
    }();
    $scope.groupOptionChange = function (clear) {
        clear = (clear !== undefined) ? clear : true;
        $scope.form.subgroupList = [];
        $scope.form.teamList = [];
        if (clear) {
            $scope.form.subgroup = null;
            $scope.form.team = null;
        }
        if (!$scope.form.group) {
            return;
        }
        var params = {
            idGroup: $scope.form.group
        };
        if (['admin', 'group'].indexOf($scope.form.typeScheduler) !== -1) {
            return;
        }
        requestService.getSubgroupByGroup(params, {
            success: function (data) {
                $scope.form.subgroupList = data.subgroups;
                if ($scope.form.subgroup_id) {
                    $scope.form.subgroup = $scope.form.subgroup_id;
                    $scope.subgroupOptionChange(false);
                }
            }
        });
    };
    $scope.subgroupOptionChange = function (clear) {
        clear = (clear !== undefined) ? clear : true;
        $scope.form.teamList = [];
        if (clear) {
            $scope.form.team = null;
        }
        if (!$scope.form.subgroup) {
            return;
        }
        var params = {
            idSubgroup: $scope.form.subgroup
        };
        if (['admin', 'group', 'subgroup'].indexOf($scope.form.typeScheduler) !== -1) {
            return;
        }
        requestService.getTeamBySubgroup(params, {
            success: function (data) {
                $scope.form.teamList = data.teams;
                if ($scope.form.team_id) {
                    $scope.form.team = $scope.form.team_id;
                }
            }
        });
    };
    $scope.deleteScheduler = function (scheduler) {
        var params = scheduler;
        requestService.deleteScheduler(params, {
            success: function () {
                $scope.updateSchedulerList();
            }
        });
    };
    $scope.editScheduler = function (scheduler) {
        $scope.cleanForm();
        var params = JSON.parse(JSON.stringify(scheduler));
        params.date = new Date(scheduler.date + "T00:00");
        params.time = new Date("1970-01-01T" + scheduler.time);
        params.date.setTime(params.date.getTime() + params.date.getTimezoneOffset() * 60 * 1000);
        params.time.setTime(params.time.getTime() + params.time.getTimezoneOffset() * 60 * 1000);
        $scope.showForm(params);
    };
    $scope.viewScheduler = function (scheduler) {
        $scope.cleanForm();
        $scope.inFormView = true;
        $scope.showForm(params);
    };
    $scope.newScheduler = function () {
        $scope.cleanForm();
        $scope.showForm();
    };
    $scope.showForm = function (scheduler) {
        scheduler = scheduler || {};
        $scope.showFormBox = true;
        if ($scope.inQuestion) {
            $scope.form.question = parseInt($scope.inQuestion);
        }
        $scope.updateFormData(scheduler);
    };
    $scope.formSave = function (event) {
        event.preventDefault();
        console.log($scope.formScheduler, $scope.form);
        if ($scope.formScheduler.$valid) {
            if ($scope.form.isRepeater && ($scope.form.qtdWeeks > 20 || $scope.form.qtdWeeks < 1)) {
                alertService.alert({
                    message: $translate.instant('msg-InvalidSchedulerRepeater')
                });
                return;
            }
            var params = {
                type_scheduler: $scope.form.typeScheduler,
                question_id: $scope.form.question,
                admin_id: $rootScope.authData.id,
                group_id: $scope.form.group,
                subgroup_id: $scope.form.subgroup,
                technique_id: $scope.form.technique,
                team_id: $scope.form.team,
                repeater: $scope.form.isRepeater,
                qtd_repeater: $scope.form.qtdWeeks,
                time: $scope.form.time.toLocaleTimeString('pt-BR'),
                date: $scope.form.date.toISOString().substring(10, -1)
            };
            if ($scope.form.id) {
                params.id = $scope.form.id;
            }
            requestService.setScheduler(params, {
                success: function () {
                    $scope.updateSchedulerList();
                }
            });
        } else {
            if ($scope.formScheduler.time.$viewValue.length && $scope.formScheduler.time.$invalid) {
                alertService.alert({
                    message: $translate.instant('msg-InvalidTime')
                });
                return;
            }
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
        }
    };
    $scope.onChangeTechnique = function () {
        if (!$scope.form.technique) {
            $scope.form.techniqueDescription = null;
            return;
        }
        $index = $scope.form.techniqueList.findIndex(function (value) {
            return value.id == $scope.form.technique;
        });
        $scope.form.techniqueDescription = $scope.form.techniqueList[$index].description;
    }
    $scope.cleanForm = function () {
        $scope.form.techniqueDescription = null;
        $scope.form.question = null;
        $scope.form.group = null;
        $scope.form.subgroup = null;
        $scope.form.subgroup_id = null;
        $scope.form.technique = null;
        $scope.form.date = null;
        $scope.form.time = null;
        $scope.form.id = null;
        $scope.form.isRepeater = null;
        $scope.form.qtdWeeks = null;
        $scope.form.typeScheduler = 'custom';
    };
    $scope.updateFormData = function (data) {
        $timeout(function () {
            if (!$scope.inQuestion) {
                $scope.form.question = (data.question.id) ? data.question.id : $scope.form.question;
            }
            $scope.form.group = (data.team) ? data.team.subgroup.group_id : $scope.form.group;
            $scope.form.technique = (data.technique) ? data.technique.id : $scope.form.technique;
            $scope.form.team = (data.team) ? data.team.id : $scope.form.team;
            $scope.form.subgroup = (data.team) ? data.team.subgroup.id : $scope.form.subgroup;
            $scope.form.date = data.date || $scope.form.date;
            $scope.form.time = data.time || $scope.form.time;
            $scope.form.id = (data.id) ? data.id : $scope.form.id;
            if ($scope.form.group && $scope.form.subgroup && $scope.form.team) {
                $scope.form.subgroup_id = $scope.form.subgroup;
                $scope.form.team_id = $scope.form.team;
                $scope.groupOptionChange(false);
            }
        }, 0);
    };
    $scope.formCancel = function () {
        $scope.cleanForm();
        $scope.showFormBox = false;
    };
}]);