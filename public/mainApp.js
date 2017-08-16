var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/form', {
        templateUrl: 'form.html',
        controller: form
    }).

    when('/repeat-init', {
        templateUrl: 'repeat-init.html',
        controller: repeat
    }).

    otherwise({
        redirectTo: '/form'
    });
}]);






// mainApp.controller('repeat', function($scope) {
   // $scope.mountries = [{locale:'en-US',name:'United States'}, {locale:'en-GB',name:'United Kingdom'}, {locale:'en-FR',name:'France'}];
// });

mainApp.controller('ViewStudentsController', function($scope) {
    $scope.message = "This page will be used to display all the students";
});