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
            var result = hljs.highlightAuto($scope.orgtext);
           // $scope.destext ="<h2>xxxx</h2>";//result.value.toString();
          // $scope.destext =$scope.orgtext;
            /****
            valiJson($scope.orgtext);
            $http.post('/formatJson', {'date': $scope.orgtext})
                .success(function (data, status, headers, config) {
                    $scope.destext = data;
                })
                .error(function () {
                    $scope.destext = "格式化远程调用失败";
                });
             ***/
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
}]).directive("formatdynamic",  function($compile){
    alert("x");
    return{
        link: function(scope, element){
            alert(scope.class);
            var template = "<textarea >{{orgtext}}</textarea>";
            var linkFn = $compile(template);
            var content = linkFn(scope);
            element.append(content);
        }
    };
    /*
    return {
        templateUrl: function(elem, attr) {
            return $scope.orgtext;
        }
    };

    return{
        link: function(scope, element){
            var template =  hljs.highlightAuto(scope.orgtext);
            alert(template.value);
            var linkFn = $compile(template.value);
            var content = linkFn(scope);
            element.append(content);
        }
    }
    */
});
