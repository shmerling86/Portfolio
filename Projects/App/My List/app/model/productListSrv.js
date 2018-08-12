app.factory('productListSrv', function ($http, $q, userSrv) {


    function Product(id, productName, description, price, zone, brand, image, isPaid, buyer) {
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.zone = zone;
        this.brand = brand;
        this.image = image;
        this.id = id;
        this.isPaid = isPaid;
        this.buyer = buyer;
    }

    var userCodeId;

    function readFile() {
        var products = [];

        var async = $q.defer();
        $http.get('https://json-server-heroku-kycjbhiagv.now.sh' + '/products').then(function (response) {

            response.data.forEach(function (plainObj) {
                var product = new Product(plainObj.id, plainObj.productName, plainObj.description, plainObj.price,
                    plainObj.zone, plainObj.brand, plainObj.image, plainObj.isPaid, plainObj.buyer);
                products.push(product);

            }, function (response) {
                console.error(response);
                async.reject([]);
            });
            async.resolve(products);
        });
        return async.promise;
    };

    function getUserProducts(userId) {

        var selectedProducts = [];
        var async = $q.defer();
        var id = userId || userSrv.getActiveUser().id;
        var productsIdsUrl = 'https://json-server-heroku-kycjbhiagv.now.sh/users/' + id;
        $http.get(productsIdsUrl).then(function (response) {
            response.data.productIds.forEach(function (selectedProduct) {
                    selectedProducts.push(new Product(selectedProduct.id, selectedProduct.productName, selectedProduct.description,
                                                      selectedProduct.price, selectedProduct.zone, selectedProduct.brand,
                                                      selectedProduct.image, selectedProduct.isPaid, selectedProduct.buyer));

            });
            async.resolve(selectedProducts);
        }, function (response) {
            console.error(response);
            async.reject([]);
        });

        return async.promise;
    }

    function updateUserProducts(selectedProducts, userId) {

        var id = userId || userSrv.getActiveUser().id;
        var async = $q.defer();
        var productsIdsUrl = 'https://json-server-heroku-kycjbhiagv.now.sh/users/' + id;

        if (userSrv.getActiveUser()) {
            userSrv.getActiveUser().productIds = selectedProducts;
            var patch = { productIds: selectedProducts };
        } else {
            var patch = { guestProductIds: selectedProducts };
        }

        $http.patch(productsIdsUrl, patch).then(function (response) {

            async.resolve(response);

        }, function (responseInternal) {
            console.error(responseInternal);
            async.reject([]);
        });
        return async.promise;

    }


    return {
        readFile: readFile,
        getUserProducts: getUserProducts,
        updateUserProducts: updateUserProducts,
        Product: Product,
        userCodeId: userCodeId
        }

});