angular.module('expenseApp', ['ui.router', 'ngCookies']);

angular.module('expenseApp')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('login', {
      url: '/',
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html',
      controller: 'expenseCtrl'
    })
    $urlRouterProvider.otherwise('/');
});
