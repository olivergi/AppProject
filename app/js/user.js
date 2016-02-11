'use strict';

angular.module('theApp')
	.controller('loginCtrl', function ($scope, $http, $httpParamSerializer) {
	    $scope.user = $('#lusername').val();
	    $scope.pass = $('#lpassword').val();
	    
	    $scope.registerUser = function () {

	        $http({
	          method: 'POST',
	          url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/register',
	          headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
	          data: $httpParamSerializer({
	                  username: $('#rusername').val(),
	                  email: $('#remail').val(),
	                  password: $('#rpassword').val()
	                })
	        }).then(function (response) {
	            $scope.signIn($('#rusername').val(), $('#rpassword').val());
	            $('#registerSuccess').show();
	            $('#hamburger').click();

	            console.log("Registration success?: \n" + response.data);
	        }, function (error) {
	            // to do = alert that username already exists
	            console.log("oh dog: " + error.data);
	        });
	    };

	    $scope.signIn = function (uName, pWord) {
            //bad code
            
	        if (uName == null){
	            uName = $('#lusername').val();
	            pWord = $('#lpassword').val();
	        }

	        // check if user exists
	        $http({
	              method: 'POST',
	              url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/user/exists',
	              headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
	              data: $httpParamSerializer({
	                      username: uName
	                    })
	            }).then(function (response) {
	                //if user is found
	                if (JSON.stringify(response.data.userFound) == "true") {
	                    //log user in
	                    $http({
	                      method: 'POST',
	                      url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/login',
	                      headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
	                      data: $httpParamSerializer({
	                              username: uName,
	                              password: pWord
	                            })
	                    }).then(function (response) {
	                        
	                        localStorage.setItem("userID", response.data.userId);
	                        localStorage.setItem("username", uName);

	                        console.log("Login Success: " + JSON.stringify(response.data));
	                    }, function (error) {
	                        console.log("login Error: " + error.data);
	                    });
	                } else {
	                    console.log("what " + JSON.stringify(response.data));
	                }
	            }, function (error) {
	                console.log("user check oh dog: " + error.data);
	            });

	    };

	});

$(document).ready(function(){
    
    $('.registration').hide();

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