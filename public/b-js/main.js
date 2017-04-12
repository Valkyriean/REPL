/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL', ['ui.router', 'ngMessages', 'ngCookies']);
app.config(function($stateProvider, $urlRouterProvider) {
    var login = {
        name: 'login',
        url: '/login',
        controller: 'LoginCont',
        templateUrl: 'users/login/login.html'
    };
    var signup = {
        name: 'signup',
        url: '/signup',
        controller: 'SignCont',
        templateUrl: 'users/signup/signup.html'
    };
    var retrieve = {
        name: 'retrieve',
        url: '/retrieve',
        controller: 'RetrCont',
        templateUrl: 'users/retrieve/retrieve.html'
    };
    var findpass = {
        name: 'findpass',
        url: '/findpass/:hash',
        controller: 'FindpassCont',
        templateUrl: 'users/retrieve/findpass.html'
    };
    var classroom = {
        name: 'classroom',
        url: '/classroom',
        controller: 'ClassroomCont',
        templateUrl: 'classes/classroom/classroom.html'
    };
    var createclassroom = {
        name: 'createclassroom',
        url: '/createclassroom',
        controller: 'NewClassroomCont',
        templateUrl: 'classes/classroom/newclassroom.html'
    };
    $stateProvider.state(login);
    $stateProvider.state(signup);
    $stateProvider.state(retrieve);
    $stateProvider.state(findpass);
    $stateProvider.state(classroom);
    $stateProvider.state(createclassroom);
    $urlRouterProvider.otherwise('/login');
});
