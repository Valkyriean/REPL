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
                case 1:
                    $state.go('classroom');
                    break;
                case 142:
                    alert("Sorry, email address does not exist. ");
                    break;
                case 141:
                    alert("Sorry, your password is not correct. ");
                    break;
                case 143:
                    console.log("Token is not available for login. ");
                    break;
                default:
                    alert("Unknown error, code: " + res.data.status);
            }
        });
    };
});
