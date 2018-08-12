var app = angular.module('myApp', ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "app/home/home.html",
            controller: "navbarCtrl"
        })
        .when("/products", {
            templateUrl: "app/products/products.html",
            controller: 'productCtrl'
        })
        .when("/list", {
            templateUrl: "app/list/myList.html",
            controller: 'myListCtrl'
        })
        .when("/login", {
            templateUrl: "app/login/login.html",
            controller: 'loginCtrl'

        })
        .when("/mylink", {
            templateUrl: "app/mylink/mylink.html",
            controller: 'randomUrlCtrl'
        })
        .when("/signup", {
            templateUrl: "app/signup/signup.html",
            controller: 'signupCtrl'
        })
        .when("/signupApprovment", {
            templateUrl: "app/signup/signupApprovment.html"

        })
        .when("/codeApprove", {
            templateUrl: "app/mylink/codeApprove.html"

        })
        .when("/guestLogin", {
            templateUrl: "app/guestLogin/guestLogin.html",
            controller: "guestLogin"

        })
        .when("/guestList", {
            templateUrl: "app/guestList/guestList.html",
            controller: "guestList"
        })
        .when("/payment", {
            templateUrl: "app/payment/payment.html",
            controller: "payment"
        })
        .when("/payPal", {
            templateUrl: "app/payment/payPal.html"
        })
        .otherwise({
            redirectTo: '/'
        });

});