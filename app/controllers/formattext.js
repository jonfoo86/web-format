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


app.controller('FormatTextCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.isVisible = false;
    $scope.class = "col-md-12";
    $scope.formatfc = function () {
        $scope.isVisible = false;
        $scope.class = "col-md-6";
        $scope.destext = "格式化中...";
        if (valiJson($scope.orgtext)) {
            var beautifycode = js_beautify($scope.orgtext);
            alert(beautifycode);
            var result = hljs.highlightAuto(beautifycode);
            $scope.destext = result.value;
        }
        else {
            $http.post('/vidadateJson', {'date': $scope.orgtext})
                .success(function (data, status, headers, config) {
                    $scope.destext = data;
                })
                .error(function () {
                    $scope.destext = "检查远程调用失败";
                });
        }

        $timeout(function () {
            $scope.isVisible = true;
        }, 500);
    };
}]).directive("formatdynamic", function ($compile) {
    return {
        link: function (scope, element) {
            alert(scope.destext);
            var template = "<div>" + scope.destext + "</div>";
            var linkFn = $compile(template);
            var content = linkFn(scope);
            element.append(content);
        }
    };
});
