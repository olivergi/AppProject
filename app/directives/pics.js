angular.module('theApp').directive('pics', function($http, $sce) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {

            // Init some empty arrays
            var imagesCount = 0;
            scope.files = [];
            scope.videos = [];
            scope.audio = [];
            scope.showing = [];

            // Set initial number of images displayed
            scope.limited = 10;

            scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            };

            // Increases the number of images that are shown in the
            // gallery by ten.
            scope.showMore = function() {
                scope.limited += 10;
            };

            // Fetches files from the server, constructing a custom object for each to be stored in an array
            scope.load = function() {

                $http({
                    method: 'GET',
                    url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
                }).then(function successCallback(response) {
                        for (var i = 0; i < response.data.length; i++) {

                            // Check to make sure response is non-empty
                            if (response.data[i] == null) {
                                // Notify user that there are no more pics on the server
                                $('#outofpics').show();
                                // Hide 'show more' functionality
                                $('#showMore').hide();
                                break;
                            } else { // There are still files

                                // Item object represents a file
                                var item = {
                                    path: 'http://util.mw.metropolia.fi/uploads/' + response.data[i].path,
                                    title: response.data[i].title,
                                    type: response.data[i].type,
                                    mimetype: response.data[i].mimeType,
                                    fileId: response.data[i].fileId,
                                    thumbnail: 'http://util.mw.metropolia.fi/uploads/' + response.data[i].thumbNails.medium

                                };

                                // Add newly created item to array
                                scope.showing.push(item);

                            }
                        }
                    },
                    function errorCallback(response) {
                        console.log("Error gettting data");
                    }
                )
            };

            // Get files from server on load
            $http({
                method: 'GET',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
            }).then(function successCallback(response) {

                // Clear previous items (if any)
                scope.files.length = 0;

                // Show intial batch of 10
                scope.load();

            }, function errorCallback(response) {
                console.log("Error gettting data");
            });
        },
        templateUrl: "directives/pics.html"
    };
});