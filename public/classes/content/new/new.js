var app = angular.module('REPL');
app.controller('NewClassroomCont', function($scope, $state, $http) {
    var token = {
        "token": $cookieStore.get("WatchCatLoginToken")
    };
    $scope.data={
        "token": token
    };
    $scope.confirm = function() {
        $http.post('/api/classroom/newClassroom', $scope.data).then(function(res){
            if(res.data.status === "success") {
                alert("Check the email to change your password.");
            } else {
                alert("Fail to create a class room.");
            }
        });
    };
});
