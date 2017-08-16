function MainCtrl($scope, $location, commServiceFactory) {
  $scope.main.selectedTab = 0;
  $scope.isDialogVisible = false;
  $scope.testText = "Main";

  $scope.openDialog = function(){
      $scope.isDialogVisible = true;
  }
}
