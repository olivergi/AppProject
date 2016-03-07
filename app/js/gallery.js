var app = angular.module('theApp', []);

// Main controller is applied to the body tag
app.controller('mainCtrl', function($scope) {
    
    // True if main gallery is shown
    $scope.main = true;
    // True if Upload button is hidden / User not Logged In
    $scope.hideUpload = true;

    // Set to negative one initially in order to
    $scope.pos = -1;

    // Function to switch between gallery and single view
    $scope.toggleView = function(fileId) {
        $scope.pos = fileId;
        $scope.main = !($scope.main);
        console.log("View toggled");
    };
    
    // If the user is logged in, show uupload functionality
    if (localStorage.getItem('userID') != null){
        $scope.hideUpload = false;
        $scope.showLogIn = false;
        console.log('User Logged In: ' + localStorage.getItem('username'));
    } else { // Otherwise hide it
        $scope.hideUpload = true;
        $scope.showLogIn = true;
        console.log('User Logged Out');
    }
    
    // Log the user out by deleting stored credentials
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

	// Start the carousel
    $("#owlSlider").owlCarousel();

    $("#uploadbtn").click(function() {
        $("#uploadModal").modal();
    });

});