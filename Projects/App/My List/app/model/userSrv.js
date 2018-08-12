app.factory('userSrv', function ($http, $q) {

    var activeUser = null;
    // var activeUser = new User({ id: "1", email: 'lior@lior.com', phone: "0525727333", shippingAddress: "hertzel", password: "123" });



    function User(plainUser) {
        this.id = plainUser.id;
        this.email = plainUser.email;
        this.phone = plainUser.phone;
        this.shippingAddress = plainUser.shippingAddress;
        this.password = plainUser.password;
        this.productIds = plainUser.productIds;
    }

    function isLoggedIn() {
        return activeUser ? true : false
    }

    function logout() {
        activeUser = null;
    }

    function login(email, password) {
        var async = $q.defer();
        var loginURL = 'https://json-server-heroku-kycjbhiagv.now.sh' + '/users?email=' + email + "&password=" + password;

        $http.get(loginURL).then(function (response) {
            if (response.data.length > 0) {
                activeUser = new User(response.data[0]);
                async.resolve(activeUser);
            } else {
                async.reject('invalid Credentials');
            }
        }, function (err) {
            async.reject(err);
        });
        return async.promise;
    };

    function getActiveUser() {
        return activeUser;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser,
        activeUser: activeUser
    }
});