angular.module("expenseApp").controller("loginCtrl", function($scope, $state, loginService, $cookies) {



  $scope.createUser = function() {
    if ($scope.userInfo.password === $scope.userInfo.passwordTwo) {
      loginService.createUser($scope.userInfo)
        .then(function(res) {
          swal("Created New User", "You are now logged in.", "success")
          $state.go('main');
        });
    } else {
      swal("Passwords Do Not Match", "Please check to be sure your passwords match.", "error")
    }
  };

  $scope.loginUser = function() {
    loginService.loginUser($scope.userLogin)
      .then(function(res) {
        // swal("User Logged In", "", "success")
        $scope.userLogin = null;
        $scope.user = $cookies.getObject('user');
        $state.go('main');
      });
  };


});
