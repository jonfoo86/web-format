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


app.controller('FormatTextCtrl', ['$scope', '$http', '$timeout', '$sce', function ($scope, $http, $timeout, $sce) {
    $scope.isVisible = false;
    $scope.class = "col-md-12";
    $scope.formatfc = function () {
        $scope.isVisible = true;
        $scope.class = "col-md-6";
        $scope.destext = "格式化中...";
        if (valiJson($scope.orgtext)) {
            var beautifycode = js_beautify($scope.orgtext);
            var result = hljs.highlightAuto(beautifycode);
            var replacestr = result.value.replace(/\n/g, "<br\>");
            $scope.myHTML = $sce.trustAsHtml(replacestr);
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
    };
}]).directive("formatdynamic", function ($compile) {
    return {
        link: function (scope, element) {

            var template = scope.destext;
            alert(template);
            var linkFn = $compile(template);
            var content = linkFn(scope);
            alert(content);
            element.append(content);
        }
    };
});
