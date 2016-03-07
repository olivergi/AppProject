'use strict';

angular.module('theApp')
	// Define controller
	.controller('loginCtrl', function ($scope, $http, $httpParamSerializer) {
	    $scope.user = $('#lusername').val();
	    $scope.pass = $('#lpassword').val();
	    
	    // Function to register a new user with the server
	    $scope.registerUser = function () {

	        $http({
	          method: 'POST',
	          url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/register',
	          headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
	          data: $httpParamSerializer({
	          		// Get essential input from user
	                  username: $('#rusername').val(),
	                  email: $('#remail').val(),
	                  password: $('#rpassword').val()
	                })
	        }).then(function (response) {
	            $scope.signIn($('#rusername').val(), $('#rpassword').val());
                //location.reload();
                //$.showUpload();

	            console.log("Registration success?: \n" + response.data);
	        }, function (error) {
	            
	            console.log("Error: " + error.data);
	        });
	    };

	    $scope.signIn = function (uName, pWord) {
            
	        if (uName == null){
	            uName = $('#lusername').val();
	            pWord = $('#lpassword').val();
	        }

	                   $http({
	                      method: 'POST',
	                      url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/login',
	                      headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
	                      data: $httpParamSerializer({
	                              username: uName,
	                              password: pWord
	                            })
	                    }).then(function (response) {
                            
                            // If login succeeded
                            if (response.data.status == 'login ok') {
	                        
	                        // Store the userId and username in the browser
	                        localStorage.setItem("userID", response.data.userId);
	                        localStorage.setItem("username", uName);
                            
                            $('#logSuccess').fadeIn();
                            console.log("Login Success: " + JSON.stringify(response.data));
                            setTimeout(function(){
                                location.reload();
                            }, 3000);   
                                
                                
                            } else { // Login failed
                                console.log("Login Failed");
                                console.log("Login Fail: " + JSON.stringify(response.data));
                            $('#logFail').fadeIn();
                            // Tell the request to time out after 5 secs
                            setTimeout(function(){
                                $('#logFail').click();
                            }, 5000);
                            }
                             
                            
	                    }, function (error) { // There was an error
	                        console.log("login Error: " + error.data);
	                    });

	    };

	});

// Conditionally (depending on logged in status) display upload/signin/signout
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