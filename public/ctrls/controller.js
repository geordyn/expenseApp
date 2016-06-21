angular.module('expenseApp').controller('expenseCtrl', function($scope, $state, loginService, $cookies, expenseService) {

  $scope.pending = [];
  $scope.reimbursed = [];
  $scope.reimburse = true;
  $scope.edit = true;
  // console.log($scope.reimburseDate)

  $scope.user = $cookies.getObject('user');
  console.log("user in ctrl", $scope.user)

  $scope.logout = function() {
    loginService.logout()
      .then(function() {
        alert("logged out");
        $state.go('login')
      })
  }

  $scope.getUserExpenses = function() {
    expenseService.getUserExpenses($scope.user._id)
      .then(function(res) {
        console.log(res);
        $scope.pending = [];
        $scope.reimbursed = [];
        $scope.expenses = res;
        $scope.expenses.forEach(function(element, index, array) {
          if (element.dateReimbursed === null) {
            $scope.pending.push(element)
          } else {
            $scope.reimbursed.push(element);
          }
        });
        // $scope.userExpenses = res;
      })
  }
  $scope.getUserExpenses();



  $scope.addUserExpense = function() {
    expenseService.addUserExpense($scope.newExpense, $scope.user._id)
      .then(function(res) {
        $scope.getUserExpenses();
        $scope.newExpense = null;
      })
  }

  $scope.reimburseExp = function(reimburseDate, expenseId) {
    console.log(reimburseDate, expenseId);
    expenseService.reimburse(reimburseDate, expenseId)
      .then(function(res) {
        $scope.getUserExpenses();
      })
  }

  $scope.updateExpense = function(expense, expenseId) {
    $scope.edit = true;
    console.log($scope.edit);
    console.log(expense, expenseId);
    expenseService.updateExpense(expense, expenseId)
      .then(function(res) {
        $scope.getUserExpenses();
      })
  }

  $scope.removeExpense = function(id) {
    console.log(id);
    expenseService.removeExpense(id)
      .then(function(res) {
        $scope.getUserExpenses();
        console.log($scope.pending)
      })
  }




  //end ctrl
})
