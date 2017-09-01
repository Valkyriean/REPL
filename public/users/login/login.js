/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('LoginCont', function($cookieStore, $scope, $state, $http) {
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/api/users/passLogin', $scope.data).then(function(res) {
            console.log(res);
            switch(res.data.status) {
                case "success":
                    $state.go('classroom');
                    break;
                case "user not found":
                    alert("Sorry, email address does not exist. ");
                    break;
                case "wrong pass":
                    alert("Sorry, your password is not correct. ");
                    break;
                case "user not found":
                    console.log("Token is not available for login. ");
                    break;
                default:
                    alert("Unknown error, code: " + res.data.status);
            }
        });
    };
});
