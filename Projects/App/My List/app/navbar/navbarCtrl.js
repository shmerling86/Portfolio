app.controller('navbarCtrl', function ($scope, userSrv, homeSrv, $location, $timeout) {

    
    $scope.logout = function () {
        userSrv.logout();
        $location.path('/');
    }
    
$scope.code = '';
    
    $scope.loginWithCode = function () {
        homeSrv.loginWithCode($scope.code).then(function (userListItemsIds) {   
        })
        $timeout(function () {$location.path('/guestLogin')}, 500);
    }
    
    $scope.isUserLoggedIn = function() {
        return userSrv.isLoggedIn();
    }

});