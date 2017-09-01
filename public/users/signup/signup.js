/**
 * Created by David on 06/02/2017.
 */
var app = angular.module('REPL');
app.controller('SignCont', function($scope, $state, $http) {
    $scope.data = {
        "teacher": false
    };
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        console.log($scope.data);
        $http.post('/api/users/signup', $scope.data).then(function(res){
            switch(res.data.status) {
                case "success":
                    $state.go('login');
                    break;
                case "repeat email":
                    alert("Sorry, email already exist. ");
                    break;
                case "user save failed":
                    alert("Sorry, an error occurred in server, sign up failed. ");
                    break;
                case "invalid input":
                    alert("Sorry, validation failed. ");
                    break;
                default:
                    alert("Unknown error, code: " + res.data.status);
            }

        });
    };
    $scope.setStudent = function() {
        $scope.data.teacher = false;
    };
    $scope.setTeacher = function() {
        $scope.data.teacher = true;
    };
});
