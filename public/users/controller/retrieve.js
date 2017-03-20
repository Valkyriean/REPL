/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('RetrCont', function($scope, $state, $http) {
    $scope.data = {
        "email": ""
    };
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/api/users/lostPass', $scope.data).then(function(res){
            if(res.status == "success") {
                alert("The new password has been sent to your email.");
            } else if(res.status == "null") {
                alert("The email has not been registered yet.")
            } else {
                alert("Sorry, retrieve failed.");
            }
        });
    };

});
