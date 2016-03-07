'use strict';

angular.module('theApp')
	.controller('uploadCtrl', function ($scope, $http) {

    /* Get the file type */
    $scope.setMediaFile = function (element) {
        $scope.mimeType = element.files[0].type;
        $scope.type = $scope.mimeType.substr(0, 5);
    };

    // Function to upload a file
    $scope.uploadImage = function () {

        // Select the upload form and get it's form data
        var fd = new FormData(document.getElementById('uploadForm'));
        if (localStorage.getItem('username') != null){
            // Include logged in user as the author of the file
            fd.append('user', (localStorage.getItem('userID')));
        } else {
            console.log("user not logged in, can't upload media");
        }
        // Include info about the file type
        fd.append('type', $scope.type);
        fd.append('mime-type', $scope.mimeType);
        
        // Post it to the server
        $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (response) {

                // If success
                $('#upSuccess').fadeIn();
                setTimeout(function(){
                    $('#upSuccess').click();
                }, 6000);
            angular.element(document.getElementById('contents')).empty();
                setTimeout(function(){
                    location.reload();
                }, 4000);

            console.log("file uploaded: " + JSON.stringify(response.data));
        }, function (error) { // An error occured
            // Notify user
            $('#upFailed').show();
            console.log("Error:" + error.data);
        });
    };


});