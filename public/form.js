

function form($scope , $http ) {


    $scope.reset = function(){
       // alert($scope.hex);
        $scope.firstName = "";
        $scope.lastName = "";
    }

    $scope.reset();

    $scope.submit = function(){

        var data = {

            "first": $scope.firstName,
            "last": $scope.lastName,

        }

        $http.post("/users/add",data).then(function (response) {
            console.log(response.data);
        });

        $scope.reset();

    }


}