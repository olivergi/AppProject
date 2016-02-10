'use strict';

angular.module('theApp')
	.controller('uploadCtrl', function ($scope, $http) {

    /* Get the file type */
    $scope.setMediaFile = function (element) {
        $scope.mimeType = element.files[0].type;
        $scope.type = $scope.mimeType.substr(0, 5);
    };

    $scope.uploadImage = function () {

        var fd = new FormData(document.getElementById('uploadForm'));
        if (localStorage.getItem('username') != null){
            fd.append('user', (localStorage.getItem('userID')-1));
        } else {
            console.log("user not logged in, can't upload media");
        }
        fd.append('type', $scope.type);
        fd.append('mime-type', $scope.mimeType);
        
        //Post
        $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (response) {

            //if (response.data) /* equals to object or some other shit tbd --> success } else --> uploadfail*/
                $('#upSuccess').fadeIn();
                setTimeout(function(){
                    $('#upSuccess').click();
                }, 6000);
            $('#hamburger').click();
            angular.element(document.getElementById('contents')).empty();
            $.showImages();

            console.log("file uploaded: " + JSON.stringify(response.data));
        }, function (error) {
            $('#upFailed').show();
            console.log("Error:" + error.data);
        });
    };


});