angular.module("expenseApp")
  .service('loginService', function($http, $state, $cookies) {


    this.createUser = function(userInfo) {
      return $http({
        method: 'POST',
        url: '/api/user',
        data: {
          first: userInfo.first,
          last: userInfo.last,
          username: userInfo.username,
          password: userInfo.password
        }
      }).then(function(res) {
        console.log(res);
        if (res.status === 200) {
          var user = res.data;
          $cookies.putObject('user', user);
          // $state.go('main');
        } else {
          alert('Login Failed');
        }
      }, function(err) {
        alert('Login Failed');
        res.send(err);
      });
    };

    this.loginUser = function(userInfo) {
      return $http({
        method: 'POST',
        url: '/api/login',
        data: {
          username: userInfo.username,
          password: userInfo.password
        }
      }).then(function(res) {
        console.log(res);
        if (res.status === 200) {
          var user = res.data;
          $cookies.putObject('user', user);
          $state.go('main');
        } else {
          alert('Login Failed');
        }
      }, function(err) {
          swal("Login Failed", "Your password or username was incorrect. If you do not have an account, please sign up.", "error")

        res.send(err);
      });
    };

    this.getCurrentUser = function() {
      return $http({
        method: 'GET',
        url: '/api/getCurrentUser'
      }).then(function(res) {
        return res;
      });
    };


    this.logout = function() {
      return $http({
        method: 'GET',
        url: '/api/logout'
      }).then(function(res) {
          $cookies.remove('user');
        return res;
      });
    };

  });
