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


app.controller('FormatTextCtrl', ['$scope', '$http', '$timeout', '$sce', '$location',  function ($scope, $http, $timeout, $sce, $location) {
    $scope.isVisible = false;
    $scope.class = "col-md-12";
    $scope.alltype = [{name: "json格式化", path: "json_format"},
        {name: "javascript(js)格式化", path: "js_format"},
        {name: "xml格式化", path: "xml_format"},
        {name: "html格式化", path: "html_format"},
        {name: "c++格式化", path: "c++_format"},
        {name: "自动格式化", path: "auto_format"}];

    $timeout(function () {
        var strs = $location.absUrl().split("/"); //字符分割
        var currentpath = strs[strs.length - 1];
        var elem = document.getElementById(currentpath);
        if (elem) {
            elem.className = "active";
            $scope.formatbk = currentpath;
        }
        else {
            elem = document.getElementById("auto_format");
            if (elem)            {
                elem.className = "active";
            }
            $scope.formatbk = "auto_format";
        }
    }, 2);

    $scope.formatfc = function () {


        $scope.isVisible = true;
        $scope.class = "col-md-6 col-sm-6";
        $scope.destext = "格式化中...";

        if (1 || valiJson($scope.orgtext)) {
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
}]);

