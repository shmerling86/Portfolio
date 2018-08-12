app.controller('signupCtrl', function ($scope, $location, $log, signupSrv) {



    $scope.email = '';
    $scope.password = '';
    $scope.confirmPassword = '';
    $scope.phone = '';
    $scope.shippingAddress = '';
    $scope.productIds = [];
    $scope.guestProductIds = [];



    $scope.newUser = function () {

        signupSrv.newUser($scope.email, $scope.password, $scope.confirmPassword, $scope.phone,
            $scope.shippingAddress, $scope.productIds, $scope.guestProductIds).then(function (newUser) {


                $location.path('/signupApprovment');

            }, function (error) {
                $log.error(error)
            });


    }

});