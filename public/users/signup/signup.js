/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('SignCont', function($scope, $state, $http) {
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        console.log($scope.data);
        $http.post('/api/users/signup', $scope.data).then(function(res){
            switch(res.data.status) {
                case 1:
                    $state.go('login');
                    break;
                case 122:
                    alert("Sorry, email already exist. ");
                    break;
                case 131:
                    alert("Sorry, an error occurred in server, sign up failed. ");
                    break;
                case 121:
                    alert("Sorry, validation failed. ");
                    break;
                default:
                    alert("Unknown error, code: " + res.data.status);
            }

        });
    };
});
