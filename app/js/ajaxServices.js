angular.module('theApp')
    .factory('AjaxService', function ($http, $httpParamSerializer) {
        var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
        var ajaxFunctions = {};


        //        Search by UserID
        ajaxFunctions.searchUserId = function (args) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/' + args)
                .success(function (data) {
                    //                    searchResult.add(data);
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        };

        //        Search by type (audio/video/image)

        ajaxFunctions.searchType = function (args) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/type/' + args)
                .success(function (data) {
                    //                    searchResult.add(data);
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        };

        //        Search by title

        ajaxFunctions.searchTitle = function (args) {
            return $http.post(urlBase + 'files/search/title', $httpParamSerializer(args), {
                //                transformRequest: angular.identity,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        //        Search by description

        ajaxFunctions.searchDesc = function (args) {
            return $http.post(urlBase + 'files/search/desc', $httpParamSerializer(args), {
                //                transformRequest: angular.identity,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        //Log in function

        ajaxFunctions.logIn = function (args) {
            return $http.post(urlBase + 'login', $httpParamSerializer(args), {
                //                transformRequest: angular.identity,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        //        Like function

        ajaxFunctions.likeAFile = function (args1, args2) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/like/' + args1 + '/' + args2)
                .success(function (data) {
                    //                    searchResult.add(data);
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        };

        //        Unlike function

        ajaxFunctions.unlikeAFile = function (args1, args2) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/unlike/' + args1 + '/' + args2)
                .success(function (data) {
                    //                    searchResult.add(data);
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        };

        //Get all comments

        ajaxFunctions.getAllComments = function () {
            return $http.get(urlBase + 'comments')
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        };

        //Get comments of a file    
        ajaxFunctions.getAllCommentsAFile = function (args) {
            return $http.get(urlBase + 'comments/file/' + args)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        };
    
        ajaxFunctions.filesLikedByUser = function (args)    {
            return $http.get(urlBase + 'likes/user/' + args)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                }); 
        }


        return ajaxFunctions;
    });