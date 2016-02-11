angular.module('theApp', [])

.controller('contentCtrl', function ($scope, $http) {
    var imagesCount = 0;

    
    $scope.showComments = function(fileId) {
        
        console.log("showComments");
        
        angular.element(document.getElementById('single')).attr('fileId', fileId);
        angular.element(document.getElementById('single')).attr('ngShow', true);
        angular.element(document.getElementById('galleryContainer')).attr('ngShow', false);
    };
    

    showImages = function() {
        
        var sliderarray = [];
        
        $scope.images= [];
        
        $http({
            method: 'GET',
            url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
        }).then(function successCallback(response) {
            console.log(response.data);
            angular.element(document.getElementById('gallery')).append("<Strong>Gallery size: " + response.data.length + "<Strong> <br>");
                
            for (var i = 0; i < 10; i++) {
                imagesCount += 1;

                if (response.data[i] == null){
                    
                    break;
                } else if(response.data[i].type == 'image'){
                    angular.element(document.getElementById('gallery')).append('<img width="100%" height="100%" onclick="showComments(' + response.data[i].fileId + ')" src="http://util.mw.metropolia.fi/uploads/' + response.data[i].path + '"> <br>' +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                    
                    
                    for (var u = 0; u < 3; u++) {
                    sliderarray.push(response.data[u].path);
                    }
                    
                } else if (response.data[i].type == 'video'){
                    angular.element(document.getElementById('gallery')).append("<video width='100%' height='100%' controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='"+ response.data[i].mimeType + "' > </video><br>" +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                } else if (response.data[i].type == 'audio'){
                    angular.element(document.getElementById('gallery')).append("<audio controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "'' > </audio><br>" +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                }     
            }
            
            /* Slider Design */
            /* angular.element(document.getElementById('slider1')).append('<img src="http://util.mw.metropolia.fi/uploads/' + sliderarray[0] + '"> <br>'); */
            
            
        }, function errorCallback(response) {
            jotain.content = "apuva \n";
            angular.element(document.getElementById('gallery')).append(response.data);
        });
    }
 
    
$scope.showMore = function() {

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
                } else if(response.data[i].type == 'image'){
                  angular.element(document.getElementById('gallery')).append('<img width="100%" height="100%" ng-click="showComments(' + response.data[i].fileId + ')" src="http://util.mw.metropolia.fi/uploads/' + response.data[i].path + '"> <br>' +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                    
                    /* $scope.images.push('<img width="100%" height="100%" src="http://util.mw.metropolia.fi/uploads/' + response.data[i].path + '"> <br>' + "<p class='imgTitle'>" + response.data[i].title + "</p>"); 
                    
                    console.log($scope.images); */
                    
                } else if (response.data[i].type == 'video'){
                    angular.element(document.getElementById('gallery')).append("<video width='100%' height='100%' controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='"+ response.data[i].mimeType + "' > </video><br>" +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                } else if (response.data[i].type == 'audio'){
                    angular.element(document.getElementById('gallery')).append("<audio controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "'' > </audio><br>" +
                    "<p class='imgTitle'>" + response.data[i].title + "</p>");
                }
            } 

        }, function errorCallback(response) {
            angular.element(document.getElementById('contents')).append(response.data);
        });

    }

    });



$(document).ready(function(){
    
     $("#owlSlider").owlCarousel();
    
    /* Hiding some stuff */
    // $('#upSuccess, #upFailed').hide();

    /*
        Button click function to open a pop-up window
    */
    $("#uploadbtn").click(function(){
        $("#uploadModal").modal();
    });
    showImages();

});