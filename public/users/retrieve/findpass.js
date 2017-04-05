var app = angular.module('REPL');
app.controller('FindpassCont', function($scope, $state, $http) {
    var url = window.location.href;
    var token = url.substring(34);
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
            switch(res.data.status) {
                case 1:
                    alert("Change successfully.");
                    $state.go('classroom');
                    $cookieStore.put("WatchCatLoginToken", res.data.token);
                    break;
                case 151:
                    alert("Link expired, please retrieve again");
                    break;
                case 152:
                    alert("Account not exist");
                    break;
            }
        });
    };
});
