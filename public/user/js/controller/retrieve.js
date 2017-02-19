/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('User');
app.controller('RetrCont', function($scope, $state, $http) {
    $scope.data = {};
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/user/retrieve', $scope.data).success(function(res){
            if(res.status == "Success") {
                window.location.href = "../index.html";
            } else {
                alert("Sorry, retrieve failed.");
            }
        });
    };
});
