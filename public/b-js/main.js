/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL', ['ui.router', 'ngMessages', 'ngCookies']);
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
    var classroom = {
        name: 'classroom',
        url: '/classroom',
        controller: 'ClassroomCont',
        templateUrl: 'classes/html/classroom.html'
    };
    $stateProvider.state(login);
    $stateProvider.state(signup);
    $stateProvider.state(retrieve);
    $stateProvider.state(classroom);
    $urlRouterProvider.otherwise('/login');
});
