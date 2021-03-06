(function() {

    // The ngResource module provides interaction support with RESTful services via the $resource service.
    // https://docs.angularjs.org/api/ngResource#!
    // The ngTable is simple table with sorting and filtering on AngularJS http://ng-table.com/
    var app = angular.module("myApp", ["ngTable", "ngResource"]);
    
    // "custom filters" configuration in ng table module
    app.config(setConfigPhaseSettings);
    setConfigPhaseSettings.$inject = ["ngTableFilterConfigProvider"];
    function setConfigPhaseSettings(ngTableFilterConfigProvider) {
        var filterAliasUrls = {
            "text": "ng-table/filters/text.html",
            "houseNumber": "ng-table/filters/houseNumber.html",
            "created": "ng-table/filters/created.html"
        };
        ngTableFilterConfigProvider.setConfig({
            aliasUrls: filterAliasUrls
        });
        // optionally set a default url to resolve alias names that have not been explicitly registered
        // if you don't set one, then 'ng-table/filters/' will be used by default
        ngTableFilterConfigProvider.setConfig({
            defaultBaseUrl: "ng-table/filters/"
        });
    }
    

    app.controller("addresstableController", function($scope, NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        
        // set path to for ajax request
        var Api = $resource("/ajax");  
        
        // this function is declarated for ngBind attribute in "created"-column
        $scope.formatDate = function(date){
            // moment.js - parses, validates, manipulates, and displays dates in JavaScript (http://momentjs.com/)
            return moment(date,'YYYY-MM-DD HH:mm:ss').format('DD.MM.YY, HH:mm');
        };
    
        this.tableParams = new NgTableParams({
            // initial object (json)
            page: 1,                    // show first page
            count: 100,                 // count per page
            filter: {
                houseNumber: '1-149' // min and max values for slider-filter (house numbers)
            },   
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
    
    }).directive('slider', function () {
        // this directive allow to use JQuery UI Slider in custom filter type "houseNumber"
        // JQuery UI Slider allow select a numeric values by dragging a handle
        // (http://jqueryui.com/slider/)
        return {
            restrict: 'A',
            require : 'ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                $(function(){
                    $("#slider-range").slider({
                        range: true,
                        min: 1,
                        max: 149,
                        values: [ 1,149],
                        slide: function(event, ui) {
                            if(ui.values[0] == 1 && ui.values[1] == 149){
                                $('#houseNumber').next('span.input-group-btn').children('button.btn').attr('disabled', 'disabled');
                            }else{
                                $('#houseNumber').next('span.input-group-btn').children('button.btn').removeAttr('disabled');
                            }
                            $("#houseNumber").val(ui.values[0]+"-"+ui.values[1]);
                            ngModelCtrl.$setViewValue(ui.values[0]+"-"+ui.values[1]);
                            $scope.$apply(); 
                        }
                    });
                    $("#houseNumber").val($("#slider-range").slider("values",0)+"-"+$("#slider-range").slider("values",1));
               	    // if "clear button" is clicked, then init slider values 
                    $('.btn-clear-housenumber').click(function(){
                        $(this).attr('disabled', 'disabled');
                        $("#houseNumber").val('1-149');
                        $("#slider-range").slider( "option", "values", [1,149]);
                        ngModelCtrl.$setViewValue('');
                        $scope.$apply();
                    });
                }); 
            }
        }
    }).directive('text', function () {
        // this directive allow to use "clear button" in custom filters type "text"
        return {
            restrict: 'A',
            require : 'ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                $(function(){       
                    // if text field is empty disable "clear button" 
                    $('.input-filter-text').bind("keyup focusout", function(){            
                        if(this.value.length<1){
                            $(this).next('span.input-group-btn').children('button.btn').attr('disabled', 'disabled'); 
                        }else{
                            $(this).next('span.input-group-btn').children('button.btn').removeAttr('disabled');
                        }
                    });
                    // if "clear button" is clicked make text field empty 
                    $('.btn-clear-text').click(function(){
                        $(this).attr('disabled', 'disabled');
                        $(this).parent('span.input-group-btn').prev('input.input-filter-text').val('');
                        ngModelCtrl.$setViewValue('');
                        $scope.$apply();
                    });
               	}); 
            }
        }
    }).directive('daterangepicker', function () {
        // this directive allow to use jQuery UI Slider in custom filter type "created"
        // jQuery Date Range Picker - jQuery Date Range Picker is a jQuery plugin that allows user to select a date range.
        // (http://longbill.github.io/jquery-date-range-picker/)
        return {
            restrict: 'A',
            require : 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                $(function(){
                    var objectConfig = {
                        separator: ' - ',
                        autoClose: true,
                        startOfWeek: 'monday',
                        format: 'DD.MM.YY, HH:mm',  //more formats at http://momentjs.com/docs/#/displaying/format/
                        time: {
                    		enabled: true
                    	}
                    };
                    $('#created').dateRangePicker(objectConfig).bind('datepicker-change',function(event,object){
                        // This event will be triggered before date range picker close animation 
                        $(this).next('span.input-group-btn').children('button.btn').removeAttr('disabled');
                        var arrayDatetime = object.value.split(" - ");
                        var formattedDatetime1 = moment(arrayDatetime[0], 'DD.MM.YY, HH:mm').format('YYYY-MM-DD HH:mm');
                        var formattedDatetime2 = moment(arrayDatetime[1], 'DD.MM.YY, HH:mm').format('YYYY-MM-DD HH:mm');
                        ngModelCtrl.$setViewValue(formattedDatetime1+'/'+formattedDatetime2);
                        scope.$apply();
                        $("#created").val(object.value);
                    });
                    // if "clear button" is clicked make text field empty 
                    $('.btn-clear-created').click(function(event){
                        event.stopPropagation();
                        $('#created').data('dateRangePicker').clear();
                        $('#created').val('');
                        $(this).attr('disabled', 'disabled');
                        ngModelCtrl.$setViewValue('');
                    });
                });
            }
        }
    });


})();