angular.module('theApp').directive('single', function($http) {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {

			scope.allcomments = [];
			scope.comments = [];
			scope.chistory = [];
			scope.files = [];
			scope.showchistory = false;
			scope.userId = -1;
			scope.name = '';
			scope.numComments = 0;
			scope.title = 'loading...';
            scope.filePath ='';

			// Updates list of comments and files from the server
			var update = function() {

				// Clear previous items
				scope.allcomments.length = 0;
				scope.comments.length = 0;
				scope.title = "loading...";

				$http({
					method: 'GET',
					url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comments'
				}).then(function successCallback(response) {

					// Rebuild the list
					for (var z = 0; z < response.data.length; z++) {
						var item = response.data[z];
						scope.allcomments.push(item);
						//console.log(item);
						if ( /*item.fileId == attrs.which*/ z == attrs.which) {
							scope.comments.push({
								username: item.username,
								userId: item.userId,
								text: item.comment,
								time: item.time.substring(4, 16)
							});
						}
					}

					scope.numComments = scope.comments.length;

					// Account for the english language
					if (scope.numComments == 0) {
						scope.title = "NO COMMENTS";
					} else if (scope.numComments == 1) {
						scope.title = "1 COMMENT";
					} else {
						scope.title = scope.numComments + " COMMENTS";
					}

				}, function errorCallback(response) {
					console.log("Error gettting comment data")
				});

				// Get list of files
				$http({
					method: 'GET',
					url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
				}).then(function successCallback(response) {

					// Clear previous items
					scope.files.length = 0;

					// Rebuild the list
					for (var z = 0; z < response.data.length; z++) {
						var item = response.data[z];
						scope.files.push(item);
                        //console.log("File Paths: " + item.path);
					}

				}, function errorCallback(response) {
					console.log("Error gettting comment data")
				});
			};

			// Returns file name, given fileId
			getFileNameById = function(fileId) {

				// Iterate through files
				for (var z = 0; z < scope.files.length; z++) {
					var item = scope.files[z];
					if (item.fileId == fileId) {
						return item.title;
					}
				}

				// No files with that ID were found
				return 'Unknown Item';
			};

			// Shows all the comments by this user
			scope.showCommentHistory = function(userId, username) {

				// Clear the array
				scope.chistory.length = 0;

				// Set username to the one who clicked
				scope.name = username;

				// Rebuild it, filtered by userId param
				for (var z = 0; z < scope.allcomments.length; z++) {
					var item = scope.allcomments[z];
					if (item.userId == userId) {
						scope.chistory.push({
							username: item.username,
							text: item.comment,
							time: item.time.substring(4, 16),
							onfile: getFileNameById(item.fileId)
						});
					}
				}

				// Set view visible
				scope.showchistory = true;

			};

			scope.hideCommentHistory = function() {
				scope.showchistory = false;
			}

			scope.$watch('main', function(newValue, oldValue) {
				// If view was toggled
				if (newValue != oldValue) {
					// Update the comments
					update();
				}
			});
            
            /*$http({
	          method: 'POST',
	          url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comments',
	          headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
	          data:$httpParamSerializer({
                    username: localStorage.getItem('username'),
                    userId: localStorage.getItem('userID'),
                    comment: $('#comment').val(),
                    fileId: ''
                })
            
            });*/

		},
		templateUrl: "/directives/single.html"
	};
});