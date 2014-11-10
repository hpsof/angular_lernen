'use strict';

angular.module('tutorialApp', ['ngAnimate', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'articles.html' })
            .when('/about', { template: '&Uuml;ber unsere Pizzeria' })
            .otherwise({ redirectTo: '/'});
    })

    .directive('price', function(){
        return {
            restrict: 'E',
            scope: {
                value: '='
            },
            template: '<span ng-show="value == 0">kostenlos</span>' +
            '<span ng-show="value > 0">{{value | currency}}</span>'
        };
    })

    .factory('Cart', function() {
        var items = [];
        return {
            getItems: function() {
                return items;
            },
            addArticle: function(article) {
                items.push(article);
            },
            sum: function() {
                return items.reduce(function(total, article) {
                    return total + article.price;
                }, 0);
            }
        };
    })

    .controller('ArticlesCtrl', function($scope, $http, Cart){
        $scope.cart = Cart;
        $http.get("articles.json").then(function(articlesResponse) {
                $scope.articles = articlesResponse.data;
        });
    })

    /* http://stackoverflow.com/questions/17648014/how-can-i-use-an-angularjs-filter-to-format-a-number-to-have-leading-zeros */
    .filter('numberFixedLen', function () {
                return function(a,b){
                    return(1e4+a+"").slice(-b)
                }
            }
    )

    .controller('CartCtrl', function($scope, Cart){
        $scope.cart = Cart;
    });

;

