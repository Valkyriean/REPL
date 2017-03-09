/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('LoginCont', function($cookieStore, $scope, $state, $http) {
    var token = {
        "token": $cookieStore.get("WatchCatLoginToken")
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
            console.log(res);
            if(res.data.status == "success") {
                $state.go('classroom');
                $cookieStore.put("WatchCatLoginToken", res.data.token);
            } else {
                alert("Sorry, login failed.");
           }
        });
    };
});
