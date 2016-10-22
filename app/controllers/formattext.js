app.controller('FormatTextCtrl', ['$scope', function ($scope) {
    $scope.isVisible = false;
    $scope.class = "col-md-12";
    $scope.formatfc = function () {

        $scope.destext =  $scope.orgtext;
        $scope.isVisible = true;
        $scope.class = "col-md-6";
    };
}])