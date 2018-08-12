app.controller('guestList', function ($scope, $location, productListSrv, guestListSrv) {

    if (!productListSrv.userCodeId) {
        $location.path('/');
        return
    }

    $scope.hoverIn = function () {
        this.hoverEdit = true;
    };
    $scope.hoverOut = function () {
        this.hoverEdit = false;
    };

    $scope.selectedGifts = [];

    $scope.userId = productListSrv.userCodeId;

    guestListSrv.getUserGuestFullProducts($scope.userId).then(function (selectedGifts) {
        $scope.selectedGifts = selectedGifts;
        // console.log(selectedGifts);
        
    }, function (err) {
        console.log(err);
    });

    $scope.deleteTask = function ($index) {
        $scope.selectedGifts.splice($index, 1);
        console.log( $scope.selectedGifts);
        
    }

    $scope.checkIfListEmpty = function () {
        for (var i = 0; i < $scope.selectedGifts.length; i++) {
            if (!$scope.selectedGifts[i].isPaid) {
                return true; 
            }
        }
        return false;
    }

});