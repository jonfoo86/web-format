app.controller('FormatTextCtrl', ['$scope', function ($scope) {
    $scope.formatfc = function () {
        $scope.destext =  $scope.orgtext;
    };
}])