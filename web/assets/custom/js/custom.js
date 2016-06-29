(function() {

    // The ngResource module provides interaction support with RESTful services via the $resource service.
    // https://docs.angularjs.org/api/ngResource#!
    // The ngTable is simple table with sorting and filtering on AngularJS http://ng-table.com/
    var app = angular.module("myApp", ["ngTable", "ngResource"]);
    

    app.controller("addresstableController", function($scope, NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        
        // set path to for ajax request
        var Api = $resource("/ajax");  
        this.tableParams = new NgTableParams({
            // @TODO initial object (json)
        }, {
            getData: function(params) {
                // ajax request to api
                return Api.get(params.url()).$promise.then(function(data) {
                    // @TODO: workout serverside (ajaxAction in AppController)
                    params.total(data.inlineCount); // recal. page nav controls
                    return data.results;
                });
            }
        });
    
    });


})();