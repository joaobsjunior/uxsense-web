UXSenseWebManager.factory('requestService', ["$rootScope", 'alertService', "$state", '$translate', function ($rootScope, alertService, $state, $translate) {
    var error = function (data, callback) {
        console.log("requestService-error:", data.config.url, data);
        var response = {
            message: "",
            response: data.data
        };
        if (data.status === -1) {
            response.message = $translate.instant('server-timeout');
        } else {
            response.message = $translate.instant('server-error' + data.status);
        }
        if (data.status === 401) {
            $rootScope.exitSite(true);
        }
        if (callback.error) {
            callback.error(response);
        } else {
            alertService.alert({
                message: response.message
            });
        }
    };
    var success = function (data, callback) {
        console.log("requestService-success:", data.config.url, data);
        if (data.status === 200) {
            var response = (data.data) ? data.data : {};
            callback.success(response);
        } else {
            error(data, callback);
        }
    };
    var service = {
        /*------------------------------------

        SESSION

        --------------------------------------*/
        login: function (_params, _option) {
            $rootScope.request("POST", "login", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        logout: function (_params, _option) {
            $rootScope.request("POST", "logout", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        invite: function (_params, _option) {
            $rootScope.request("POST", "invite", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        firstAccess: function (_params, _option) {
            $rootScope.request("POST", "login/first-access", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        lostPassword: function (_params, _option) {
            $rootScope.request("POST", "login/lost-password", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        /*------------------------------------

        GROUP

        --------------------------------------*/
        getGroups: function (_params, _option) {
            $rootScope.request("GET", "group", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        getGroup: function (_params, _option) {
            $rootScope.request("GET", "group/" + _params.id, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        setGroup: function (_params, _option) {
            if ($rootScope.authData.group) {
                alertService.alert({
                    message: $translate.instant('msg-NoAutorizationRequest')
                });
                return;
            }
            $rootScope.request("POST", "group", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        deleteGroup: function (_params, _option) {
            if ($rootScope.authData.group) {
                alertService.alert({
                    message: $translate.instant('msg-NoAutorizationRequest')
                });
                return;
            }
            $rootScope.request("DELETE", "group/" + _params.id, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        /*------------------------------------

        SUBGROUP

        --------------------------------------*/
        getSubgroupByGroup: function (_params, _option) {
            $rootScope.request("GET", "subgroup/" + _params.idGroup, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        getSubgroup: function (_params, _option) {
            $rootScope.request("GET", "subgroup/" + _params.id, {
                subgroup: true
            }, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        setSubgroup: function (_params, _option) {
            $rootScope.request("POST", "subgroup", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        deleteSubgroup: function (_params, _option) {
            $rootScope.request("DELETE", "subgroup/" + _params.id, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        /*------------------------------------

        TEAM

        --------------------------------------*/
        getTeamBySubgroup: function (_params, _option) {
            $rootScope.request("GET", "team/" + _params.idSubgroup, {
                subgroup: true
            }, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        getTeam: function (_params, _option) {
            $rootScope.request("GET", "team/" + _params.id, {
                team: true
            }, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        setTeam: function (_params, _option) {
            $rootScope.request("POST", "team", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        deleteTeam: function (_params, _option) {
            $rootScope.request("DELETE", "team/" + _params.id, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        /*------------------------------------

        QUESTIONS

        --------------------------------------*/
        getQuestions: function (_params, _option) {
            $rootScope.request("GET", "question", {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        setQuestion: function (_params, _option) {
            if ($rootScope.authData.group) {
                alertService.alert({
                    message: $translate.instant('msg-NoAutorizationRequest')
                });
                return;
            }
            $rootScope.request("POST", "question", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        deleteQuestion: function (_params, _option) {
            if ($rootScope.authData.group) {
                alertService.alert({
                    message: $translate.instant('msg-NoAutorizationRequest')
                });
                return;
            }
            $rootScope.request("DELETE", "question/" + _params.id, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        /*------------------------------------

        TECHNIQUES

        --------------------------------------*/
        getTechniques: function (_params, _option) {
            $rootScope.request("GET", "technique", {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        /*------------------------------------

        UNITS

        --------------------------------------*/
        getUnits: function (_params, _option) {
            $rootScope.request("GET", "unit", {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        setUnit: function (_params, _option) {
            $rootScope.request("POST", "unit", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        deleteUnit: function (_params, _option) {
            $rootScope.request("DELETE", "unit/" + _params.id, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        /*------------------------------------

        TEACHER

        --------------------------------------*/
        getTeachers: function (_params, _option) {
            $rootScope.request("GET", "teacher", {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        setTeacher: function (_params, _option) {
            $rootScope.request("POST", "teacher", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        deleteTeacher: function (_params, _option) {
            $rootScope.request("DELETE", "teacher/" + _params.id, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        /*------------------------------------

        SHEDULER

        --------------------------------------*/
        getScheduler: function (_params, _option) {
            $rootScope.request("GET", "scheduler", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        setScheduler: function (_params, _option) {
            $rootScope.request("POST", "scheduler", _params, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
        deleteScheduler: function (_params, _option) {
            $rootScope.request("DELETE", "scheduler/" + _params.id, {}, true).then(function (data) {
                success(data, _option);
            }, function (data) {
                error(data, _option);
            });
        },
    };
    return service;
}]);
