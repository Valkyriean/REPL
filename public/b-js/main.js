/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL', ['ui.router', 'ngMessages', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider) {
    // User Part
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginCont',
        templateUrl: 'users/login/login.html'
    });
    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'SignCont',
        templateUrl: 'users/signup/signup.html'
    });
    $stateProvider.state('retrieve', {
        url: '/retrieve',
        controller: 'RetrCont',
        templateUrl: 'users/retrieve/retrieve.html'
    });
    $stateProvider.state('findpass', {
        url: '/findpass/:hash',
        controller: 'FindpassCont',
        templateUrl: 'users/retrieve/findpass.html'
    });
    // Classroom Part
    $stateProvider.state('classroom', {
        url: '/classroom',
        controller: 'ClassroomCont',
        templateUrl: 'classes/structure/structure.html'
    });
    $stateProvider.state('classroom.main', {
        url: '/classroom/main',
        templateUrl: 'classes/content/main/main.html'
    });
    $stateProvider.state('classroom.account', {
        url: '/classroom/main',
        templateUrl: 'classes/content/main/main.html'
    });
    $stateProvider.state('createclassroom', {
        url: '/createclassroom',
        controller: 'NewClassroomCont',
        templateUrl: 'classes/classroom/newclassroom.html'
    });
    // Exception
    $urlRouterProvider.otherwise('/login');
});
