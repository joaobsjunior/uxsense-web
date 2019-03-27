"use strict";
/**
 * @ngdoc overview
 * @name UXSenseWebManager
 * @module UXSenseWebManager
 * @description Site Cliente do Rapdin (Sistema SIDMO - projeto Carteira Eletrônica)
 */
var UXSenseWebManager = angular.module('UXSenseWebManager', [
    // Angular Modules
    'ng', 'ngAnimate', 'ngCookies', 'ngLocale', 'ngMessageFormat', 'ngMessages', 'ngSanitize',
    // Angular UI Modules
    'ui.grid', 'ui.mask', 'ui.utils.masks', 'ui.router', 'ui.router.stateHelper', 'ui.bootstrap', 'ui.validate',
    // Other Third-Party Angular Modules
    'ajoslin.promise-tracker', 'cgBusy', 'ngDialog', 'restangular', 'ncy-angular-breadcrumb', 'pascalprecht.translate', 'angular-bootstrap-select', 'idf.br-filters', 'ngFileSaver'
]);
UXSenseWebManager.run(["$rootScope", "$http", "$location", "$timeout", function($rootScope, $http, $location, $timeout) {
    /*
    Global Variables
    */
    $rootScope.starckLoading = [];
    $rootScope.authHeader = localStorage.getItem('authHeader');
    $rootScope.authHeader = ($rootScope.authHeader) ? JSON.parse($rootScope.authHeader) : {};
    $rootScope.authData = localStorage.getItem('authData');
    $rootScope.authData = ($rootScope.authData) ? JSON.parse($rootScope.authData) : {};
    $rootScope.zeroFill = function(str, size) {
        if (str) {
            size = size || 11;
            str = str.toString();
            var add = size - str.length;
            for (var i = 0; i < add; i++) str = '0' + str;
        }
        return str;
    }
    $rootScope.updateDataStorage = function() {
        localStorage.setItem('authData', JSON.stringify($rootScope.authData));
        localStorage.setItem('authHeader', JSON.stringify($rootScope.authHeader));
    }
    $rootScope.getLimitWallet = function() {
        var params = $rootScope.authData.parametros || {};
        return params["0"];
    }
    $rootScope.getAPI = function(path) {
        var url = "http://localhost:8000/api/manager/";
        return url + path;
    };
    $rootScope.request = function(method, _url, _params, showLoading) {
        showLoading = (showLoading === null) ? false : showLoading;
        var header = {
            'Content-Type': 'application/json'
        };
        angular.extend(header, $rootScope.authHeader);
        _url = $rootScope.getAPI(_url);
        var config = {
            timeout: 120000,
            method: method,
            url: _url,
            headers: header,
            beforeSend: function() {
                $timeout(function() {
                    if (showLoading) {
                        $rootScope.starckLoading.push(1);
                        if ($rootScope.starckLoading.length == 1) {
                            $rootScope.isRouteLoading = true;
                        }
                    }
                }, 0);
            },
            complete: function() {
                $timeout(function() {
                    if (showLoading) {
                        $rootScope.starckLoading.pop();
                        if (!$rootScope.starckLoading.length) {
                            $rootScope.isRouteLoading = false;
                        }
                    }
                }, 500);
            },
            loading: showLoading,
            data: _params,
            params: (method.toUpperCase() == 'GET') ? _params : {},
            cache: false,
            responseType: "json"
        };
        return $http(config);
    };
}]);
