app.controller('guestLogin', function ($scope, $location, productListSrv, guestListSrv) {


    if (!productListSrv.userCodeId) {
        $location.path('/');
        return
    }

    $scope.userId = productListSrv.userCodeId;

    $scope.userListItems = [];
    //מביא לאורח את המוצרים שהמשתמש סימן
    productListSrv.getUserProducts($scope.userId).then(function (userListItems) {

        $scope.userListItems = userListItems;
        guestListSrv.getUserGuestFullProducts($scope.userId).then(function (selectedGifts) {
            $scope.selectedGifts = selectedGifts;

            if ($scope.selectedGifts) {
                $scope.selectedGifts.forEach(function (product) {
                    for (var i = 0; i < $scope.userListItems.length; i++) {
                        if (product.id == $scope.userListItems[i].id) {
                            $scope.userListItems[i].selected = true;
                        }
                    }
                });
            }
        }, function (err) {
            console.log(err);
        });

    }, function (error) {
        $log.error(error)
    });


    $scope.checkIfListEmpty = function () {
        for (var i = 0; i < $scope.userListItems.length; i++) {
            if (!$scope.userListItems[i].isPaid) {
                return true; 
            }
        }
        return false;
    }


    $scope.checkedProducts = [];
    // עובר על המערך של המשתמש אם המתנה סומנה אז מצרף למערך חדש אחרת מסיר 
    $scope.getUserProducts = function () {
        for (var i = 0; i < $scope.userListItems.length; i++) {

            if ($scope.userListItems[i].selected) {
                $scope.userListItems[i].selected = true
                $scope.checkedProducts.push($scope.userListItems[i]);

            } else if ($scope.userListItems[i].selected === false) {
                $scope.checkedProducts.splice(i);
            }
        }

        productListSrv.updateUserProducts($scope.checkedProducts, $scope.userId).then(function (user) {

            // if (user.data.guestProductIds[0].id == $scope.checkedProducts[0].id) {
            $location.path('/guestList')
            // }

        }, function (error) {
            $log.error(error)
        });
    }

});