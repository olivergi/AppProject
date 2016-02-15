angular.module('theApp').directive('pics', function($http) {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {

			scope.files = [];
            scope.videos = [];
            scope.audio = [];
			scope.showing = [];

			scope.showMore = function() {

				var lowerLim = scope.showing.length;

				for (var z = lowerLim; z < lowerLim + 10; z++) {
					if (z < scope.files.length) {
						scope.showing.push(scope.files[z]);
					}
				}
			};

			// Get files from server
			$http({
				method: 'GET',
				url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
			}).then(function successCallback(response) {

				// Clear previous items
				scope.files.length = 0;

				// Rebuild the list
				for (var z = 0; z < response.data.length; z++) {
                    
                    if (response.data[z] == null){
                        break;
                        
                    } else if(response.data[z].type == 'image'){
                        var item = response.data[z];
                        scope.files.push(item);
                        
                    } else if (response.data[z].type == 'video'){
                        scope.videos.push(response.data[z]);
                    
                    } else if (response.data[z].type == 'audio'){
                        scope.audio.push(response.data[z]);
                    }
                }

				// Show intial batch of 10
				scope.showMore();
                console.log("Videos: " + scope.videos);
                console.log("Images: " + scope.files);
                console.log("Audio: " + scope.audio);

			}, function errorCallback(response) {
				console.log("Error gettting data")
			});
		},
		templateUrl: "/directives/pics.html"
	};
});