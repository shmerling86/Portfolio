app.controller('productCtrl', function ($scope, $log, $location, productListSrv, userSrv) {


    if (!userSrv.isLoggedIn()) {
        $location.path('/');
        // return
    }

    $scope.products = [];

    $scope.buyer = [];

    productListSrv.readFile().then(function (products) {

        $scope.products = products;

        if (userSrv.getActiveUser().productIds) {
            userSrv.getActiveUser().productIds.forEach(function (product) {
                product.selected = true;
                $scope.products[product.id] = product;
                $scope.buyer[product.id] = product.buyer
                

            });

        }
        // else {
        //     userSrv.getActiveUser().productIds.forEach(function (product) {
        //         console.log(product.id);
        //         $scope.products[product.id].selected = false;

        //     });
        // }
    }, function (error) {
        $log.error(error)
    });



    $scope.checkedProducts = [];

    $scope.getUserProducts = function () {
        for (var i = 0; i < $scope.products.length; i++) {
            if ($scope.products[i].selected) {
                // console.log($scope.products[i]);

                $scope.checkedProducts.push($scope.products[i]);
            } else if ($scope.products[i].selected === false) {
                $scope.checkedProducts.splice(i);
            }
        }


        productListSrv.updateUserProducts($scope.checkedProducts).then(function (user) {

            // if (user.data.productIds[0].id == $scope.checkedProducts[0].id) {
                $location.path('/list')
            // }

        }, function (error) {
            $log.error(error)
        });
    }



});
