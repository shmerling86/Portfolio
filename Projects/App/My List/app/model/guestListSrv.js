app.factory('guestListSrv', function ($http, $q, userSrv) {

    function Product(id, productName, description, price, zone, brand, image, isPaid, buyer) {
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.zone = zone;
        this.brand = brand;
        this.image = image;
        this.id = id;
        this.isPaid = isPaid;
        this.buyer = buyer
    }

    function getUserGuestFullProducts(userId) {
        
        var selectedProducts = [];
        var async = $q.defer();
        var id = userId || userSrv.getActiveUser().id;
        
        var productsIdsUrl = 'https://json-server-heroku-kycjbhiagv.now.sh/users/' + id;

        $http.get(productsIdsUrl).then(function (response) {
            response.data.guestProductIds.forEach(function (guestProduct) {

                selectedProducts.push(new Product(guestProduct.id, guestProduct.productName, guestProduct.description,
                    guestProduct.price, guestProduct.zone, guestProduct.brand, guestProduct.image,
                    guestProduct.isPaid, guestProduct.buyer));
            });
            // console.log(selectedProducts);
            async.resolve(selectedProducts);
        }, function (response) {
            console.error(response);
            async.reject([]);
        });

        return async.promise;
    }

    function updateUserProducts(selectedProducts, userId, userList) {

        var id = userId
        var async = $q.defer();
        var productsIdsUrl = 'https://json-server-heroku-kycjbhiagv.now.sh/users/' + id;
        var patch = { guestProductIds: selectedProducts,
            productIds: userList
        };

        $http.patch(productsIdsUrl, patch).then(function (response) {

            async.resolve(response);

        }, function (guestProduct) {
            console.error(guestProduct);
            async.reject([]);
        });
        return async.promise;
    }


    return {
        getUserGuestFullProducts: getUserGuestFullProducts,
        updateUserProducts: updateUserProducts
    }

});