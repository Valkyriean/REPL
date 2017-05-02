/**
 * Created by David on 21/04/2017.
 */
var app = angular.module('REPL');
app.controller('MainClassroomCont', function($scope, $state, $http) {
    $scope.goState = function(add) {
        $state.go(add);
    };
});