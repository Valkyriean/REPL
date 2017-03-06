/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('LoginCont', function($cookieStore, $scope, $state, $http) {
    var token = {
        "token": $cookieStore.get("WatchCatLoginToken")
    };
    window.onload = function() {
        $http.post('/api/users/token', token).then(function(res) {
            if(res.status == "success") {
                goState('classroom');
            } else {
                alert("Sorry, login failed.");
            }
        });
    };
    $scope.data = {
        "email": "",
        "pass": ""
    };
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/api/users/login', $scope.data).then(function(res) {
            alert("Helloooooo");
            if(res.data.status == "success") {
                alert("login success");
                $state.go('classroom');
            } else {
                if(res.message == "repeat email") {
                    alert("Email address already exist.");
                } else {
                    alert("Sorry, login in failed.")
                }
            }
        });
    };
});
