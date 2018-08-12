app.controller('randomUrlCtrl', function(userSrv, $location, $scope, randomUrlSrv, $log){

    if (!userSrv.isLoggedIn()) {
        $location.path('/');
        return
    }

    $scope.showUrl = randomUrlSrv.makeId();


    $scope.addCodeToUserObj = function () {

        randomUrlSrv.addCodeToUserObj($scope.showUrl).then(function (newCode) {

                $location.path('/codeApprove');
    
            }, function (error) {
                $log.error(error)
            });
    
    
        }

});
