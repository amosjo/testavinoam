function repeat($scope , $http ) {


    $http.get('datas.json')
        .success(function(data){
            console.log(data);
            $scope.contacts = data;
        })
        .error(function(data){
            console.log("Error getting data from " + thisCtrl.route);
        });



    $scope.filter = function(){



        var data = {

            "first": $scope.name,
            "last": "tt"

        }




        $http.post("/users/filter", data).then(function (response) {
          //  console.log(response.data);
            $scope.fcontacts=[];
            $scope.fcontacts[0] = response.data;
            console.log($scope.fcontacts[0]);
        });



    }




}