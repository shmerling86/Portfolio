app.controller('payment', function ($scope, productListSrv, $location, guestListSrv) {

    if (!productListSrv.userCodeId) {
        $location.path('/');
        return
    }

    $scope.buyer = '';

    $scope.userId = productListSrv.userCodeId;

    $scope.reduceGift = function () {

        guestListSrv.getUserGuestFullProducts($scope.userId).then(function (selectedGifts) {
            
            $scope.selectedGifts = selectedGifts
            for (var i = 0; i < $scope.selectedGifts.length; i++) {
                if (!$scope.selectedGifts[i]["isPaid"]) {
                    $scope.selectedGifts[i]["isPaid"] = true;
                    $scope.selectedGifts[i]["buyer"] = $scope.buyer;
                }
            }
            productListSrv.getUserProducts($scope.userId).then(function (userList) {
                $scope.userList = userList
                // console.log($scope.userList);
                for (var i = 0; i < $scope.selectedGifts.length; i++) {
                    for (var j = 0; j < $scope.userList.length; j++) {
                        if ($scope.userList[j].id === $scope.selectedGifts[i].id) {
                            $scope.userList[j].isPaid = true;
                            $scope.userList[j].buyer = $scope.selectedGifts[i].buyer;

                        }
                    }
                }

                guestListSrv.updateUserProducts($scope.selectedGifts, $scope.userId, $scope.userList).then(function (user) {

                }, function (error) {
                    $log.error(error)
                });

            }, function (error) {
                $log.error(error)
            });

        }, function (error) {
            $log.error(error)
        });
    }
});

