angular.module('theApp').directive('pics', function($http, $sce) {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {

            var imagesCount = 0;
			scope.files = [];
            scope.videos = [];
            scope.audio = [];
			scope.showing = [];
            
            scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
            };
            

			scope.showMore = function() {
                
                $http({
				method: 'GET',
				url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
			     }).then(function successCallback(response) {
                    var newValue = imagesCount + 10;
                    
                    for (var i = imagesCount; i < newValue; i++) {
                    
                        imagesCount +=1;
                        if (response.data[i] == null){
                            $('#outofpics').show();
                            $('#showMore').hide();
                            break;
                    } else {
                        
                        var item = {
                        path: 'http://util.mw.metropolia.fi/uploads/' + response.data[i].path,
                        title: response.data[i].title,
                        type: response.data[i].type,
                        //uploader: userArray[response.data[z].userId],
                        mimetype: response.data[i].mimeType,
                        fileId: response.data[i].fileId
                        
                        };
                        //add item to array
                        scope.showing.push(item);
                           
                    } 
                }
                    
                },
                    function errorCallback(response) {
                        console.log("Error gettting data");
                    }
			)};

			// Get files from server
			$http({
				method: 'GET',
				url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
			}).then(function successCallback(response) {

				// Clear previous items
				scope.files.length = 0;

				// Rebuild the list
				/* for (var z = 0; z < response.data.length; z++) {
                    
                    if (response.data[z] == null){
                        break;
                        
                    } else {
                        //create new item from response data
                        var item = {
                        path: 'http://util.mw.metropolia.fi/uploads/' + response.data[z].path,
                        title: response.data[z].title,
                        type: response.data[z].type,
                        //uploader: userArray[response.data[z].userId],
                        mimetype: response.data[z].mimeType
                        
                        };
                        //add item to array
                        scope.files.push(item);
                    } 
                } */

				// Show intial batch of 10
				scope.showMore();

			}, function errorCallback(response) {
				console.log("Error gettting data");
			});
		},
		templateUrl: "/directives/pics.html"
	};
});