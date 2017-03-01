/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL', ['ui.router', 'ngMessages']);
app.config(function($stateProvider, $urlRouterProvider) {
    var login = {
        name: 'login',
        url: '/login',
        controller: 'LoginCont',
        templateUrl: 'users/html/login.html'
    };
    var signup = {
        name: 'signup',
        url: '/signup',
        controller: 'SignCont',
        templateUrl: 'users/html/signUp.html'
    };
    var retrieve = {
        name: 'retrieve',
        url: '/retrieve',
        controller: 'RetrCont',
        templateUrl: 'users/html/retrieve.html'
    };
    $stateProvider.state(login);
    $stateProvider.state(signup);
    $stateProvider.state(retrieve);
    $urlRouterProvider.otherwise('/login');
});
