var app = angular.module('REPL');
app.controller('FindpassCont', function($scope, $state, $http) {
    $scope.data = {
        "firstname": "",
        "lastname": "",
        "newpass": "",
    };
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {


    };
});