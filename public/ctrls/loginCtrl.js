angular.module("expenseApp").controller("loginCtrl", function($scope, $state, loginService, $cookies) {



  $scope.createUser = function() {
    loginService.createUser($scope.userInfo)
      .then(function(res) {
        $state.go('login');
        $scope.userLogin = $scope.userInfo;
        $scope.userInfo = null;
      });
  };

  $scope.loginUser = function() {
    loginService.loginUser($scope.userLogin)
      .then(function(res) {
        $scope.userLogin = null;
        $scope.user = $cookies.getObject('user');
        console.log($scope.user, "is logged in")
        $state.go('main');
      });
  };

  $scope.logout = function() {
    loginService.logout()
      .then(function(res) {
        $state.go('login');
      });
  };


});
