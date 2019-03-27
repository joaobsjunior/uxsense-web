UXSenseWebManager.controller('UnitsController', ['$scope', '$state', '$rootScope', '$translate', 'requestService', '$timeout', 'alertService', '$stateParams', function($scope, $state, $rootScope, $translate, requestService, $timeout, alertService, $stateParams) {
    var map = null;
    $scope.showFormBox = false;
    $scope.inFormView = false;
    $scope.unitShowCreate = false;
    $scope.form = {};
    $scope.updateUnitsList = function() {
        requestService.getUnits(null, {
            success: function(data) {
                $timeout(function() {
                    $scope.units = data.units;
                    $scope.showFormBox = false;
                    $scope.$apply();
                });
            }
        });
    };
    $scope.updateUnitsList();
    $scope.deleteUnit = function(unit) {
        var params = unit;
        requestService.deleteUnit(params, {
            success: function() {
                $scope.updateUnitsList();
            }
        });
    };
    $scope.editUnit = function(unit) {
        $scope.cleanForm();
        $scope.showForm(unit);
    };
    $scope.viewUnit = function(unit) {
        $scope.cleanForm();
        $scope.inFormView = true;
        $scope.showForm(unit);
    };
    $scope.newUnit = function() {
        $scope.cleanForm();
        $scope.showForm();
    };
    $scope.showForm = function(unit) {
        unit = unit || {};
        $scope.showFormBox = true;
        $scope.createMap(unit);
    };
    $scope.formSave = function(event) {
        event.preventDefault();
        if ($scope.formUnit.$valid) {
            var params = {
                name: $scope.form.name,
                latitude: $scope.form.latitude,
                longitude: $scope.form.longitude
            };
            if ($scope.form.id) {
                params.id = $scope.form.id;
            }
            requestService.setUnit(params, {
                success: function() {
                    $scope.updateUnitsList();
                }
            });
        } else {
            alertService.alert({
                message: $translate.instant('msg-NotChange')
            });
        }
    };
    $scope.cleanForm = function() {
        $timeout(function() {
            $scope.form.name = null;
            $scope.form.id = null;
            $scope.form.latitude = null;
            $scope.form.longitude = null;
            $scope.$apply();
        }, 0);
    };
    $scope.onEnter = function(keyEvent) {
        console.log(keyEvent);
        if (keyEvent.which === 13) {
            $scope.formSearch();
        }
    };
    $scope.createMap = function(data) {
        data = data || {};
        var form = document.getElementById('formMap');
        form.innerHTML = "";
        form.removeAttribute("style");
        $timeout(function() {
            var styles = [{
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }];
            map = new GMaps({
                el: '#formMap',
                lat: data.latitude || -12.936036,
                lng: data.longitude || -38.422655,
                scrollwheel: !$scope.inFormView,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: true,
                panControl: !$scope.inFormView,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT
                },
                styles: styles
            });
            if (!data.latitude && !data.longitude) {
                GMaps.geolocate({
                    success: function(position) {
                        map.setCenter(position.coords.latitude, position.coords.longitude);
                    },
                    error: function(error) {
                        console.error('Geolocation failed: ' + error.message);
                    },
                    not_supported: function() {
                        console.error("Your browser does not support geolocation");
                    },
                    always: function() {
                        console.log("Done!");
                    }
                });
            } else {
                $scope.addMarker(data);
            }
            if (!$scope.inFormView) {
                google.maps.event.addListener(map.map, 'click', function(event) {
                    console.log(event);
                    var coord = event.latLng;
                    coord = {
                        latitude: coord.lat(),
                        longitude: coord.lng()
                    };
                    $scope.addMarker(coord);
                });
            }
        }, 500);
    };
    $scope.updateFormData = function(data) {
        $timeout(function() {
            $scope.form.latitude = data.latitude || $scope.form.latitude;
            $scope.form.longitude = data.longitude || $scope.form.longitude;
            $scope.form.name = data.name || $scope.form.name;
            $scope.form.id = data.id || $scope.form.id;
            $scope.$apply();
        }, 0);
    };
    $scope.formSearch = function() {
        if ($scope.form.address) {
            GMaps.geocode({
                address: $scope.form.address,
                callback: function(results, status) {
                    if (status == 'OK') {
                        var coord = results[0].geometry.location;
                        coord = {
                            latitude: coord.lat(),
                            longitude: coord.lng(),
                        };
                        $scope.addMarker(coord);
                    }
                }
            });
        }
    };
    $scope.addMarker = function(coord) {
        map.setCenter(coord.latitude, coord.longitude);
        map.removeMarkers();
        map.addMarker({
            lat: coord.latitude,
            lng: coord.longitude
        });
        $scope.updateFormData(coord);
    };
    $scope.formCancel = function() {
        $scope.cleanForm();
        $scope.showFormBox = false;
        $scope.inFormView = false;
    };
}]);
