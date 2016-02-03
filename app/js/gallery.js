angular.module('theApp', [])

.controller('contentCtrl', function ($scope, $http) {
    var imagesCount = 0;


        $http({
            method: 'GET',
            url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
        }).then(function successCallback(response) {
            console.log(response.data);
     angular.element(document.getElementById('gallery')).append("<Strong>Gallery size: " + response.data.length + "<Strong> <br>");
            for (var i = 0; i < 10; i++) {
                imagesCount += 1;

                if (response.data[i] == null){
                    /*Do this check only that console doesn't notify null values */
                    break;
                } else if(response.data[i].type == 'image'){
                    angular.element(document.getElementById('gallery')).append("<img width='100%' height='100%' src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "''> <br>" +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                } else if (response.data[i].type == 'video'){
                    angular.element(document.getElementById('gallery')).append("<video width='100%' height='100%' controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='"+ response.data[i].mimeType + "' > </video><br>" +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                } else if (response.data[i].type == 'audio'){
                    angular.element(document.getElementById('gallery')).append("<audio controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "'' > </audio><br>" +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                }     
            }
        }, function errorCallback(response) {
            jotain.content = "apuva \n";
            angular.element(document.getElementById('gallery')).append(response.data);
        });

$scope.showMore = function() {

        $http({
        method: 'GET',
        url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
    }).then(function successCallback(response) {
        var newValue = imagesCount + 10;

        for (var i = imagesCount; i < newValue; i++) {
        imagesCount +=1;
        angular.element(document.getElementById('gallery')).append("<img width='100%' height='100%' src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "''>" + "<br>" +
         "<p class='imgTitle'>img " + response.data[i].title + "</p>");
        }

    }, function errorCallback(response) {
        jotain.content = "apuva \n";
        angular.element(document.getElementById('gallery')).append(response.data);
    });

    }

})


.controller('uploadCtrl', function ($scope, $http) {

        /* Get the file type */
        $scope.setMediaFile = function (element) {
            $scope.mimeType = element.files[0].type;
            $scope.type = $scope.mimeType.substr(0,5);
        };

        $scope.uploadImage = function () {
            
            var fd = new FormData(document.getElementById('uploadForm'));
            fd.append('user', 6);
            fd.append('type', $scope.type);
            fd.append('mime-type', $scope.mimeType);
            var request = $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
            request.then(function (response) {
                $('#upSuccess').show();
                $('#hamburger').click();
                angular.element(document.getElementById('gallery')).empty();
                showImages();
                

                console.log("success?: \n" + response.data);
            }, function (error) {
                console.log("oh dog: " + error);
            });
        };


});

$(document).ready(function(){
    /* Hiding some stuff */
    $('#upSuccess, #upFailed').hide();
    $('.registration').hide();

    /*
        Button click function to open a pop-up window
    */
    $("#uploadbtn").click(function(){
        $("#uploadModal").modal();
    });
    $("#loginbtn").click(function(){
        $("#loginModal").modal();
    });
    $("#regislink").click(function(){
        $('.registration').fadeIn();
        $('.login').hide();
    });
    $("#loginlink").click(function(){
        $('.registration').hide();
        $('.login').fadeIn();
    });

});