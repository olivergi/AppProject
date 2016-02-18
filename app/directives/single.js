'use strict';

angular.module('theApp').directive('single', function($http, $httpParamSerializer, $sce) {
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
            scope.newfileId ='';
            scope.filePath = '';
            scope.fileType = '';
            scope.mimeType = '';
            scope.uploader = '';
            
            scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
            };
            

			// Updates list of comments and files from the server
			scope.update = function() {

				// Clear previous items
				scope.allcomments = [];
				scope.comments = [];
				scope.title = "loading...";
                scope.newfileId = '';
                
				// Get list of files
                $http({
					method: 'GET',
					url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
				}).then(function successCallback(response) {

					// Clear previous items
					//scope.files.length = 0;

					// Rebuild the list
					for (var z = 0; z < response.data.length; z++) {
						//var item = response.data[z];
						//scope.files.push(item);
                    if (z == attrs.which){    
                    //if (scope.newfileId == response.data[z].fileId){
                        //Get the Image to display in Comments.
                        scope.filePath = "http://util.mw.metropolia.fi/uploads/" + response.data[z].path;
                        scope.fileType = response.data[z].type;
                        scope.newfileId = response.data[z].fileId;
                        scope.mimeType = response.data[z].mimetype;
                        console.log("File ID Success " + scope.newfileId);
                        
                        //get Comments
                        scope.getComments();
                        
                    } 
                        
					}
                    
                    

				}, function errorCallback(response) {
					console.log("Error gettting comment data")
				});
                
            };
            
            scope.getComments = function () {
            
            $http({
					method: 'GET',
					url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comments'
				}).then(function successCallback(response) {

					// Rebuild the list
					for (var z = 0; z < response.data.length; z++) {
						var item = response.data[z];
						scope.allcomments.push(item);
						console.log("Item Created");
						if ( response.data[z].fileId == scope.newfileId ) {
                            console.log("Attr Which " + attrs.which);
                            console.log("ID " + item.fileId);
                            console.log("New ID " + scope.newfileId);
                            //Debugging - Comments not working correctly!
                            console.log(z);
                            console.log(item.fileId);
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
                
        };

            
            
            
            

			// Returns file name, given fileId
			scope.getFileNameById = function(fileId) {

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
					scope.update();
				}
			});
            
            scope.postComment = function() {
            
            $http({
	          method: 'POST',
	          url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comment/file/' + scope.newfileId,
	          headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
	          data: $httpParamSerializer({
                    //username: localStorage.getItem('username'),
                    user: localStorage.getItem('userID'),
                    comment: $('#comment').val()
                    //fileId: $('#id').val()
                })
                //Post Method NOT working correctly, Error in connection!
            
            }).then(function (response) {
	            $('#commentSuccess').show();
                $('.comment').val('');
                scope.comments = [];
                scope.getComments();

	            console.log("Comment success?: \n" + response.data);
	        }, function (error) {
	            
	            console.log("Error: " + error.data);
	        });
            }
		},
		templateUrl: "directives/single.html"
	};
});