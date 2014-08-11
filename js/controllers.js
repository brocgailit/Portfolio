angular.module('broc.controllers', [])
    .controller('AppCtrl', function ($scope, $modal, $log) {

        $scope.portfolio = {
            name: 'Broc Gailit',
            nameFirst: 'Broc',
            nameLast: 'Gailit',
            title: 'Web Developer',
            description: "Building better web and mobile experiences with HTML5, CSS3, and JavaScript.",
            email: 'broc@gailit.com',
            address: {
                street: '234 NW Hill Street',
                city:'Bend',
                state:'Oregon',
                zip: '97701'
            }
        }

        $scope.toggleResponsiveNav = function (){
            $scope.navIsCollapsed = ! $scope.navIsCollapsed;
        }

        $scope.openModal = function (size) {
            $scope.items = ['item1', 'item2', 'item3'];

            var modal = $modal.open({
                templateUrl: 'templates/modal.html',
                    controller: 'ModalCtrl',
                    size: size,
                    resolve: {
                        items: function (){
                            return $scope.items;
                        }
                    }
            });

            modal.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    })

    .controller('MapCtrl', function($scope){

        function rgb2hex(rgb){
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return "#" +
                ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
        }


        var mapColor = rgb2hex($('body').css( "background-color" ));
        var mapTextColor = '#aaaaaa';
        var mapDark = 2;
        var mapDarker = mapDark-2;
        var mapDarkGrey = mapDark+3;
        var mapGrey = mapDark+5;
        var mapLightGrey = mapDark+4;
        var mapBright = 25;
        var mapBrightest = mapBright+5;

        var markerImage = 'img/map-marker.png';

        var addMarker = $scope.$watch('myMap', function(){
            console.log($scope.myMap);
            $scope.mapMarker = new google.maps.Marker({
                position: new google.maps.LatLng(44.053128,-121.308461),
                map: $scope.myMap,
                icon: markerImage
            });
            addMarker(); //clear the watch
        })

        $scope.mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 15,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(44.058123,-121.314383),

            // Disables the default Google Maps UI components
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: false,

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapDark
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapGrey
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapDark
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapBright
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapDarkGrey
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapDarker
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapLightGrey
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": mapColor
                }, {
                    "lightness": mapDarker
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": mapTextColor
                }, {
                    "lightness": mapBrightest
                }]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapDarkGrey
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapGrey
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": mapColor
                }, {
                    "lightness": mapDark
                }, {
                    "weight": 1.2
                }]
            }]
        };

        $scope.openMarkerInfo = function(marker) {
            console.log(marker);
            $scope.currentMarker = marker;
            $scope.currentMarkerLat = marker.getPosition().lat();
            $scope.currentMarkerLng = marker.getPosition().lng();
            $scope.myInfoWindow.open($scope.myMap, marker);
        };
    })

    .controller('ModalCtrl', function($scope, $modalInstance, items){
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
;