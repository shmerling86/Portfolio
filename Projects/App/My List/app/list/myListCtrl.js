app.controller('myListCtrl', function ($scope, $location, productListSrv, userSrv) {

    if (!userSrv.isLoggedIn()) {
        $location.path('/');
        return
    }

    
    $scope.hoverIn = function () {        
        this.hoverEdit = true;
    };
    $scope.hoverOut = function () {   
        this.hoverEdit = false;
    };

    $scope.selectedProducts = [];
    
    productListSrv.getUserProducts().then(function(selectedProducts) {        
        $scope.selectedProducts = selectedProducts;
        // console.log($scope.selectedProducts);
        
    }, function(err) {
        console.log(err);
    });
    
    
    $scope.deleteTask = function($index) {
        $scope.selectedProducts.splice($index, 1);
    }



});