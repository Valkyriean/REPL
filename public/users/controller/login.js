/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL', ["ngCookies"]);
app.controller('LoginCont', function($cookieStore, $scope, $state, $http) {
    var token = {
        "token": $cookieStore.get("WatchCatLoginToken")
    };
    $http.post('/api/users/token', token).success(function(res){
        if(res.status == "success") {
            goState('classroom');
        } else {
            alert("Sorry, login failed.");
        }
    });
    $scope.data = {
        "email": "",
        "pass": ""
    };
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/api/users/login', $scope.data).success(function(res){
            if(res.status == "success") {
                goState('classroom');
            } else {
                alert("Sorry, login failed.");
            }
        });
    };
});
