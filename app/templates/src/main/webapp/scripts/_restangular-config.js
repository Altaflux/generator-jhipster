'use strict';

var BASE_URL = '/app/rest/api';
var CONTENT_TAG = '_embedded';
var HREF_TAG = 'href';
var LINKS_TAG = '_links';
var GETLIST_OP = 'getList';


<%= angularAppName %>.factory('DataRestRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(BASE_URL);
        RestangularConfigurer.setRestangularFields({
            selfLink: "_links.self.href"
        });
        RestangularConfigurer.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
            var returnElement = element;
            if (operation === 'patch' || operation === 'put' || operation === 'post') {
                angular.forEach(element, function(value, key) {
                    if (!(key === LINKS_TAG)) {
                        if (angular.isObject(value)) {
                            element[key] = value._links.self.href;
                        }
                    }
                })
            }
            return {
                element: returnElement,
                headers: headers,
                httpConfig: httpConfig
            };
        });

        RestangularConfigurer.addResponseInterceptor(function(data, operation, route, url, response, deferred) {
            var returnData = data;
            var link = undefined;
			
            if (operation == 'get') {
                link = data[LINKS_TAG]['self'][HREF_TAG].split('/');
                data.id = link[link.length - 1];
            }

            if (operation == GETLIST_OP && Object.keys(data).length === 0) {
                return undefined;
            }

            if (operation == GETLIST_OP && (CONTENT_TAG in data || 'page' in data)) {

                if (data[CONTENT_TAG] == undefined) {
                    return undefined;
                }
                var dataKey = Object.keys(data[CONTENT_TAG])[0];
                for (var i = 0; i < data[CONTENT_TAG][dataKey].length; i++) {
                    data[CONTENT_TAG][i] = angular.copy(data[CONTENT_TAG][dataKey][i]);
                    link = data[CONTENT_TAG][i][LINKS_TAG]['self'][HREF_TAG].split('/');
                    data[CONTENT_TAG][i].id = link[link.length - 1];
                }
                delete data[CONTENT_TAG][dataKey];
                returnData = data[CONTENT_TAG];
                delete data[CONTENT_TAG];

                var array = $.map(returnData, function(value, index) {
                    return [value];
                });
                returnData = array;

                for (var key in data) {
                    returnData[key] = data[key];
                }
            }
            return returnData;
        });
    });
});

jhipsterApp.factory('ResourceConfigurer', function(DataRestRestangular) {

    function configureResource(type, relations) {
        DataRestRestangular.addElementTransformer(type, false, function(element) {

            element.save = function() {
                if (!element.fromServer) {
                    return element.post();
                } else {
                    return element.patch();
                }
            }

            if (element.fromServer) {
                angular.forEach(relations, function(value, key) {
                    if (value !== 'self') {
                        element.one(value).get().then(function(response) {
                            element[value] = response;
                        })
                    }
                })
            }
            return element;
        });
    }


    return function(type, relations) {
		configureResource(type, relations);
		configureResource(type + 's', relations);
    }
});
