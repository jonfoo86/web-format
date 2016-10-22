
function validateJson(jsonString) {
        return jsonlint.parse(jsonString);
};

function parseJson(jsonString) {
    alert(jsonlint);
    return jsonlint.parse(jsonString);

    try {
        alert("parse start");
         JSON.parse(jsonString);
    }
    catch (err) {
        alert("parse exception");
        // try to throw a more detailed error message using validate
        validateJson(jsonString);

        // rethrow the original error
        throw err;
    }
};

app.controller('FormatTextCtrl', ['$scope', function ($scope) {
    $scope.isVisible = false;
    $scope.class = "col-md-12";
    $scope.formatfc = function () {
        $scope.isVisible = true;
        $scope.class = "col-md-6";
        $scope.destext =  "格式化失败";
        $scope.destext =  parseJson($scope.orgtext);

    };
}]);
