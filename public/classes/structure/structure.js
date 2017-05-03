/**
 * Created by Josh on 12/04/2017.
 */
var app = angular.module('REPL');
app.controller('ClassroomCont', function($cookieStore, $scope, $state, $http) {
    $scope.logout = function() {
        $cookieStore.remove("WatchCatLoginToken");
        $state.go('login');
    };
    $scope.goState = function(add) {
        $state.go(add);
    };
});
