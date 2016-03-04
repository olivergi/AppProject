var app = angular.module('theApp', []);

// Main controller is applied to the body tag
app.controller('mainCtrl', function($scope) {
    
    // True if main gallery is shown
    $scope.main = true;
    // True if Upload button is hidden / User not Logged In
    $scope.hideUpload = true;

    // Set to negative one initially in order to
    $scope.pos = -1;

    $scope.toggleView = function(fileId) {
        $scope.pos = fileId;
        $scope.main = !($scope.main);
        console.log("View toggled");
    };
    
    if (localStorage.getItem('userID') != null){
        $scope.hideUpload = false;
        $scope.showLogIn = false;
        console.log('User Logged In: ' + localStorage.getItem('username'));
    } else {
        $scope.hideUpload = true;
        $scope.showLogIn = true;
        console.log('User Logged Out');
    }
    
    
    $scope.userLogout = function() {
        localStorage.clear();
        location.reload();
    }
    
    
    // enter-keypress for inputfields 
    $(".loginputs").keyup(function(event){
	    if(event.keyCode == 13){ 
	        $("#signButton").click();
	    }
	    });
    
     $(".reginputs").keyup(function(event){
	    if(event.keyCode == 13){ 
	        $("#regButton").click();
	    }
	    });
    

});


$(document).ready(function() {

    $("#owlSlider").owlCarousel();

    /* Hiding some stuff */
    // $('#upSuccess, #upFailed').hide();

    /*
        Button click function to open a pop-up window
    */
    $("#uploadbtn").click(function() {
        $("#uploadModal").modal();
    });
    
    //showImages();

});