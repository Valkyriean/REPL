var app = angular.module('REPL');
app.controller('FindpassCont', function($scope, $state, $http) {
    var url = window.location.href;
    var token = url.substring(44);
    $scope.data = {
        "lastname": "",
        "newpass": "",
        "token": token
    };
    $scope.goState = function(add) {
        $state.go(add);
    };
    $scope.confirm = function() {
        $http.post('/api/users/findPass', $scope.data).then(function(res) {
            console.log(res);
            if(res.data.status == "success") {
                $state.go('classroom');
                $cookieStore.put("WatchCatLoginToken", res.data.token);
            } else {
                alert("Sorry, change password failed.");
            }
        });
    };
});
