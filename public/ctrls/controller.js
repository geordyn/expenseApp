angular.module('expenseApp').controller('expenseCtrl', function($scope, $state, loginService, $cookies, expenseService) {

  $scope.pending = [];
  $scope.reimbursed = [];
  $scope.edit = true;
  $scope.quantity = 10;

  $scope.user = $cookies.getObject('user');

  if (!$scope.user) {
    $state.go('login');
    swal("Unauthorized", "Please log in", "error");
  }


  $scope.logout = function() {
    $scope.user = {};
    loginService.logout()
      .then(function() {
        swal("User Logged Out", "", "success")
        $state.go('login')
      })
  }


  $scope.getUserExpenses = function() {
    expenseService.getUserExpenses($scope.user._id)
      .then(function(res) {
        $scope.pending = [];
        $scope.reimbursed = [];
        $scope.expenses = res;
        $scope.expenses.forEach(function(element, index, array) {
          if (element.dateReimbursed === null) {
            $scope.pending.push(element)
          } else {
            $scope.reimbursed.push(element);
          };
        });
      });
  };
  $scope.getUserExpenses();


  $scope.addUserExpense = function() {
          expenseService.addUserExpense($scope.newExpense, $scope.user._id)
            .then(function(res) {
              $scope.getUserExpenses();
              $scope.expense.$setUntouched();
              $scope.newExpense = {};
            });
      }
  };


  $scope.updateExpense = function(editExpense, expenseId) {
    if (!editExpense) {
      swal("Unable to Update Expense", "Inputs are invalid or empty", "error")
    };
    expenseService.updateExpense(editExpense, expenseId)
      .then(function(res) {
        swal("Expense Updated", "Your expense has been successfully updated.", "success")
        $scope.getUserExpenses();
      });
  };


  $scope.rmvAlert = function(id) {
    $scope.rmvId = id;
    swal({
      title: "Delete Expense: Are you sure?",
      text: "You will not be able to recover this expense!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm) {
      if (isConfirm) {
        expenseService.removeExpense($scope.rmvId)
          .then(function(res) {
            swal("Deleted!", "Your expense has been successfully deleted.", "success");
            $scope.getUserExpenses();
          });
      } else {
        swal("Canceled", "Your imaginary file is safe :)", "error");
      };
    });
  };


  $scope.rmbAlert = function(expenseId) {
    $scope.expId = expenseId;
    swal({
      title: "Reimburse Expense",
      text: "Date of Reimbursement",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "MM/DD/YYYY"
    }, function(inputValue) {
      if (!inputValue) {
        swal.showInputError("You need to enter the date of reimbursement!");
        return false
      };
      $scope.rmbDate = new Date(inputValue);
      if (!$scope.rmbDate.valueOf()) {
        swal.showInputError("You need to enter a valid date!");
        return false
      };
      if ($scope.rmbDate.valueOf()) {
        swal("Reimbursed!", "Reimbursement Date: " + inputValue, "success");
        expenseService.reimburse($scope.rmbDate, $scope.expId)
          .then(function(res) {
            $scope.getUserExpenses();
          });
      };
    });
  };



  // END CTRL
})
