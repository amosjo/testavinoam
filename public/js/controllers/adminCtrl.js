function AdminCtrl($scope, $http, commServiceFactory) {
    $scope.main.selectedTab = 7;

    $scope.model = {lists : {trash:[]}};

      commServiceFactory.getJson("users/complexes_to_user_type")
            .success(function(data){

                $scope.model.lists.usersTypes = data;

                console.log("data:");
                console.log($scope.model.lists);

            })
            .error(function(error){
                $scope.data = [];
            });


        commServiceFactory.getJson("complexes/complexlist")
            .success(function(data){
               $scope.model.lists.complexes = data;
            })
            .error(function(error){
                $scope.model.lists.complexes = [];
            });
    // $scope.model = {
    //     lists: {trash:[], usersTypes:[{type:"user", complexes:[{id:1, name:"קומפלקס1"}]}], complexes:[{id:1, name:"קומפלקס1"},
    //     {id:2, name:"קומפלקס2"}, {id:3, name:"קומפלקס3"}] }
    // };

    // Model to JSON for demo purpose
    // $scope.$watch('model', function(model) {
    //     $scope.modelAsJson = angular.toJson(model, true);
    // }, true);

    $scope.dragoverCallback = function(complexesForUser, callback) {
        var srcComplex = callback();

        // check if the src dragged complex does not exict.
        if (complexesForUser.complexes.find(function(currComplex){return srcComplex.id === currComplex.id})){
            return false;
        }

        return true; // Disallow dropping in the third row.
    };

    $scope.addComplexToUser = function(type, item){

      $http.post("/users/complexes_to_user_type/add",{"userType": type, "complexId":item.id})
              .then(function (response) {
                  $scope.rooms = response.data;
                });

        return true;
    };

    $scope.deleteComplexToUser = function(type, item, callback){
        var userType =callback();
        $http.post("/users/complexes_to_user_type/remove",{"userType": userType, "complexId":item.id})
                .then(function (response) {
                    $scope.rooms = response.data;
                });

        return true;
    };

}