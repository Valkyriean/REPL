/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('LoginCont', function($scope, $state, $http) {
    $scope.data = {};
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
