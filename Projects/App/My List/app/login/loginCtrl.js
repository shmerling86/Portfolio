app.controller('loginCtrl', function ($scope, userSrv, $location) {

    $scope.email = '';
    $scope.password = '';
    $scope.invalidLogin = false;


    $scope.login = function () {
        $scope.invalidLogin = false;
        userSrv.login($scope.email, $scope.password).then(function (activeUser) {            
            $location.path('/list');
    
        }, function () {
            $scope.invalidLogin = true;
        })
    }


});