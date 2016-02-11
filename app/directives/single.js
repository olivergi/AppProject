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

			// Get comments
			$http({
				method: 'GET',
				url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comments'
			}).then(function successCallback(response) {

				// Clear previous items
				scope.allcomments.length = 0;
				scope.comments.length = 0;

				// Rebuild the list
				for (var z = 0; z < response.data.length; z++) {
					var item = response.data[z];
					scope.allcomments.push(item);
					//console.log(item);
					if (item.fileId == attrs.fileId) {
						scope.comments.push({
							username: item.username,
							userId: item.userId,
							text: item.comment,
							time: item.time.substring(4, 16)
						});
					}
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
				}

			}, function errorCallback(response) {
				console.log("Error gettting comment data")
			});

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
		},
		templateUrl: "/directives/single.html"
	};
});