app.factory('homeSrv', function ($http, $q, productListSrv) {

    function loginWithCode(enterCode) {
        var async = $q.defer();
        var loginURL = 'https://json-server-heroku-kycjbhiagv.now.sh/users?code=' + enterCode

        $http.get(loginURL).then(function (response) {
            
                if (response.data[0]["code"] == enterCode) {
                    var userListItemsIds = response.data[0]["productIds"];
                    productListSrv.userCodeId = response.data[0].id;
                    
                    async.resolve(userListItemsIds)
                } else {
                    async.reject(response)
                }

        }, function (err) {
            async.reject(err);
        });
        return async.promise;
    };


    return {
        loginWithCode: loginWithCode

    }

});