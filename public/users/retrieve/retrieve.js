/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('RetrCont', function($scope, $state, $http) {
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/api/users/lostPass', $scope.data).then(function(res){
            if(res.data.status === "success") {
                alert("Check the email to change your password.");
            } else {
                alert("Sorry, retrieve failed.");
            }
        });
    };
});
