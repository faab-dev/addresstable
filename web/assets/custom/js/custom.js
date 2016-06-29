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
            // initial object (json)
            page: 1,                    // show first page
            count: 100,                 // count per page
        }, {
            getData: function(params) {
                // ajax request to api
                return Api.get(params.url()).$promise.then(function(data) {
                    // init an "active"-object by each ajax request
                    var objectActive = {
                        country: false,
                        city: false,
                        postcode: false,
                        street: false,
                        houseNumber: false,
                        created: false
                    };
                    
                    // checks each URL parameter
                    angular.forEach(params.url(), function(value, key) {
                        switch (key) {
                            case 'filter[country]':
                                objectActive['country'] = true;
                                break
                            case 'filter[city]':
                                objectActive['city'] = true;
                                break
                            case 'filter[postcode]':
                                objectActive['postcode'] = true;
                                break
                            case 'filter[street]':
                                objectActive['street'] = true;
                                break
                            case 'filter[houseNumber]':
                                objectActive['houseNumber'] = value != '1-149';
                                break
                            case 'filter[created]':
                                objectActive['created'] = true;
                                break
                            case 'sorting[country]':
                                objectActive['country'] = true;
                                break
                            case 'sorting[city]':
                                objectActive['city'] = true;
                                break
                            case 'sorting[postcode]':
                                objectActive['postcode'] = true;
                                break
                            case 'sorting[street]':
                                objectActive['street'] = true;
                                break
                            case 'sorting[houseNumber]':
                                objectActive['houseNumber'] = true;
                                break
                            case 'sorting[created]':
                                objectActive['created'] = true;
                                break
                            default:
                        }
                    }, objectActive);
                    // set CSS style on each column where filter (or sorting) does used
                    angular.forEach(objectActive, function(value, key) {
                        switch (key) {
                            case 'country':
                                if(value){
                                    $scope.countryStyle={'background-color':'rgba(204,255,255,0.5'};
                                }else{
                                    $scope.countryStyle={};
                                }
                                break
                            case 'city':
                                if(value){
                                    $scope.cityStyle={'background-color':'rgba(204,255,255,0.5'};
                                }else{
                                    $scope.cityStyle={};
                                }
                                break
                            case 'postcode':
                                if(value){
                                    $scope.postcodeStyle={'background-color':'rgba(204,255,255,0.5'};
                                }else{
                                    $scope.postcodeStyle={};
                                }
                                break
                            case 'street':
                                if(value){
                                    $scope.streetStyle={'background-color':'rgba(204,255,255,0.5'};
                                }else{
                                    $scope.streetStyle={};
                                }
                                break
                            case 'houseNumber':
                                if(value){
                                    $scope.houseNumberStyle={'background-color':'rgba(204,255,255,0.5'};
                                }else{
                                    $scope.houseNumberStyle={};
                                }
                                break
                            case 'created':
                                if(value){
                                    $scope.createdStyle={'background-color':'rgba(204,255,255,0.5'};
                                }else{
                                    $scope.createdStyle={};
                                }
                                break
                            default:
                        }
                    }, objectActive);
                
                    params.total(data.inlineCount); // recal. page nav controls
                    return data.results;
                });
            }
        });
    
    });


})();