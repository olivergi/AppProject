var app = angular.module('theApp', []);

app.controller('mainCtrl', function($scope) {
    
    // True if main gallery is shown
    $scope.main = true;

    $scope.pos = -1;

    $scope.toggleView = function(pos) {
        console.log(pos);
        $scope.pos = pos;
        $scope.main = !($scope.main);
        console.log("View toggled");
    };

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