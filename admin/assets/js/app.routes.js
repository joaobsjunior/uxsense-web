UXSenseWebManager.config(["$stateProvider", "$urlRouterProvider", "$rootScopeProvider", "$translateProvider", "$httpProvider",
    function ($stateProvider, $urlRouterProvider, $rootScopeProvider, $translateProvider, $httpProvider) {
        /*HTTP INTERCEPTION*/
        $httpProvider.interceptors.push('httpInterceptionService');
        /*TRANSLATE*/
        $translateProvider.translations('pt', Locale.pt);
        (Locale.en) ? $translateProvider.translations('en', Locale.en): "";
        (Locale.es) ? $translateProvider.translations('es', Locale.es): "";
        $translateProvider.preferredLanguage('pt');
        /*ROUTERS*/
        $stateProvider.state('main', {
            templateUrl: 'view/main.html',
            controller: 'MainController',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Home' | translate}}"
            }
        }).state('contact', {
            parent: 'main',
            url: '/contact',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Contact' | translate}}"
            },
            bodyClassName: 'contact',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/contact.html'
                }
            }
        }).state('login', {
            parent: 'main',
            url: '/login',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Login' | translate}}"
            },
            bodyClassName: 'login',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/login.html',
                    controller: 'LoginController'
                }
            }
        }).state('lostPassword', {
            parent: 'main',
            url: '/lost-password',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-NoPassword' | translate}}"
            },
            bodyClassName: 'lostpassword',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/lost-password.html',
                    controller: 'LostPasswordController'
                }
            }
        }).state('firstAccess', {
            parent: 'main',
            url: '/first-access',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-firtAccess' | translate}}"
            },
            bodyClassName: 'firstaccess',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/first-access.html',
                    controller: 'FirstAccessController'
                }
            }
        }).state('home', {
            parent: 'main',
            url: '/home',
            ncyBreadcrumb: {
                skip: true
            },
            bodyClassName: 'home',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/home.html'
                }
            }
        }).state('invite', {
            parent: 'main',
            url: '/invite',
            ncyBreadcrumb: {
                skip: true
            },
            bodyClassName: 'invite',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/invite.html',
                    controller: 'InviteController'
                }
            }
        }).state('groups', {
            parent: 'main',
            url: '/groups',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Groups' | translate}}"
            },
            bodyClassName: 'group',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/groups.html',
                    controller: 'GroupsController'
                }
            }
        }).state('subgroups', {
            parent: 'groups',
            url: '/:idgroup/subgroups',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Subgroups' | translate}}"
            },
            bodyClassName: 'subgroup',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/subgroups.html',
                    controller: 'SubgroupsController'
                }
            },
            params: {
                data: {}
            }
        }).state('teams', {
            parent: 'subgroups',
            url: '/:idsubgroup/teams',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Teams' | translate}}"
            },
            bodyClassName: 'team',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/teams.html',
                    controller: 'TeamsController'
                }
            },
            params: {
                data: {}
            }
        }).state('questions', {
            parent: 'main',
            url: '/questions',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Questions' | translate}}"
            },
            bodyClassName: 'questions',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/questions.html',
                    controller: 'QuestionsController'
                }
            },
            params: {
                data: {}
            }
        }).state('scheduler', {
            parent: 'questions',
            url: '/scheduler/:id?:question?',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Scheduler' | translate}}"
            },
            bodyClassName: 'scheduler',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/scheduler.html',
                    controller: 'SchedulerController'
                }
            },
            params: {
                data: {}
            }
        }).state('activities', {
            parent: 'main',
            url: '/activities',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Activities' | translate}}"
            },
            bodyClassName: 'activities',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/activities.html',
                    controller: 'ActivitiesController'
                }
            },
            params: {
                data: {}
            }
        }).state('units', {
            parent: 'main',
            url: '/units',
            ncyBreadcrumb: {
                label: "{{'breadcrumb-Units' | translate}}"
            },
            bodyClassName: 'units',
            animation: 'fade',
            views: {
                "mainContent@main": {
                    templateUrl: 'view/units.html',
                    controller: 'UnitsController'
                }
            },
            params: {
                data: {}
            }
        });
        $urlRouterProvider.otherwise('/login');
    }
]);