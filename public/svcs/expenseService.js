angular.module("expenseApp").service("expenseService", function($http, $cookies) {


  this.getUserExpenses = function(userId) {
    return $http({
      method: 'GET',
      url: '/api/expenses/' + userId
    }).then(function(res) {
      return res.data;
    });
  };

  this.removeExpense = function(userId) {
    return $http({
      method: 'DELETE',
      url: '/api/expenses/' + userId
    });
  };

  this.addUserExpense = function(newExpense, userId) {
    return $http({
      method: 'POST',
      url: '/api/expenses',
      data: {
        user: userId,
        merchant: newExpense.merchant,
        cost: newExpense.cost,
        type: newExpense.type,
        date: newExpense.date,
        comment: newExpense.comment
      }
    });
  };

  this.updateExpense = function(expense, expenseId) {
    return $http({
      method: 'PUT',
      url: '/api/updateExpense/' + expenseId,
      data: {
        merchant: expense.merchant,
        cost: expense.cost,
        type: expense.type,
        date: expense.date,
        comment: expense.comment
      }
    }).then(function(res) {

    })
  };


  this.reimburse = function(reimburseDate, expenseId) {
    return $http({
      method: 'PUT',
      url: '/api/expenses/' + expenseId,
      data: {
        dateReimbursed: reimburseDate
      }
    });
  };




});
