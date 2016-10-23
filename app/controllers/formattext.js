function valiJson(jsonString) {
    try {

        JSON.parse(jsonString);
        return true;
    }
    catch (err) {
        // try to throw a more detailed error message using validate
        //  validateJson(jsonString);

        // rethrow the original error

    }

    return false;
};

app.controller('FormatTextCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.isVisible = false;
    $scope.class = "col-md-12";
    $scope.formatfc = function () {
        $scope.isVisible = true;
        $scope.class = "col-md-6";
        $scope.destext = "格式化中...";
        if (valiJson($scope.orgtext)) {
            $scope.destext = valiJson($scope.orgtext);
        }
        else {
            $http.post('/vidadateJson', {'date': $scope.orgtext})
                .success(function (data, status, headers, config) {
                    $scope.destext = data;
                })
                .error(function () {
                    $scope.destext = "远程调用失败";
                });
        }
    };
}]);
