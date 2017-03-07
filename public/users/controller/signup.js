/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('SignCont', function($scope, $state, $http) {
    $scope.data = {
        "email": "",
        "firstname": "",
        "lastname": "",
        "pass": "",
        "conf": ""
    };
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/api/users/signup', $scope.data).then(function(res){
            if(res.data.status == "success") {
                window.location.href = "../../index.html";
            } else {
                if(res.data.message == "repeat email") {
                    alert("Email address already exist.");
                } else {
                    alert("Sorry, sign up failed.")
                }
            }
        });
    };
});
