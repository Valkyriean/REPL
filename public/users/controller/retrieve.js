/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('RetrCont', function($scope, $state, $http) {
    $scope.data = {};
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/api/users/retrieve', $scope.data).success(function(res){
            if(res.status == "success") {
                window.location.href = "../index.html";
            } else {
                alert("Sorry, retrieve failed.");
            }
        });
    };
});
