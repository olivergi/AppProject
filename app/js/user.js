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
                //location.reload();
                //$.showUpload();

	            console.log("Registration success?: \n" + response.data);
	        }, function (error) {
	            
	            console.log("Error: " + error.data);
	        });
	    };

	    $scope.signIn = function (uName, pWord) {
            //bad code
            
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
                            
                            if (response.data.status == 'login ok') {
	                        
	                        localStorage.setItem("userID", response.data.userId);
	                        localStorage.setItem("username", uName);
                            
                            $('#logSuccess').fadeIn();
                            console.log("Login Success: " + JSON.stringify(response.data));
                            setTimeout(function(){
                                location.reload();
                            }, 3000);   
                                
                                
                            } else {
                                console.log("Login Failed");
                                console.log("Login Fail: " + JSON.stringify(response.data));
                            $('#logFail').fadeIn();
                            setTimeout(function(){
                                $('#logFail').click();
                            }, 5000);
                            }
                             
                            
                            
	                    }, function (error) {
	                        console.log("login Error: " + error.data);
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