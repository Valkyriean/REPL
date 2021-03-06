/**
 * Created by David on 06/02/2017.
 */
angular.module('REPL').directive('email', function() {
    var filter = /^[A-Za-z0-9d]+([-_.][A-Za-z0-9d]+)*@([A-Za-z0-9d]+[-.])+[A-Za-zd]{2,5}$/;
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            ctrl.$validators.email = function(value) {
                if(filter.test(value)) {
                    return true;
                }
                return false;
            };
        }
    }
});
angular.module('REPL').directive('first', function() {
    var filter = /^[a-zA-Z]{1,10}$/;
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            ctrl.$validators.first = function(value) {
                if(filter.test(value)) {
                    return true;
                }
                return false;
            };
        }
    }
});
angular.module('REPL').directive('last', function() {
    var filter = /^[a-zA-Z]{2,10}$/;
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            ctrl.$validators.last = function(value) {
                if(filter.test(value)) {
                    return true;
                }
                return false;
            };
        }
    }
});
angular.module('REPL').directive('pass', function() {
    var filter = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            ctrl.$validators.pass = function(value) {
                if(filter.test(value)) {
                    return true;
                }
                return false;
            };
        }
    }
});
angular.module('REPL').directive('conf', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            ctrl.$validators.conf = function(value) {
                if(value === scope.data.pass) {
                    return true;
                }
                return false;
            };
        }
    }
});
angular.module('REPL').directive('loaded', ['$cookieStore', '$http', '$state', function($cookieStore, $http, $state) {
    return {
        restrict: 'E',
        scope: {
            src: "="
        },
        controller: function($scope) {
            var token = {
                "token": $cookieStore.get("WatchCatLoginToken")
            };
            $http.post('/api/users/tokenLogin', token).then(function(res) {
                console.log($scope.src);
                if(res.data.status === "success") {
                    $state.go($scope.src);
                }
            });
        }
    }
}]);
