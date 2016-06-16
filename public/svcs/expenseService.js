angular.module("expenseApp").service("expenseService", function($http, $cookies) {


  this.getUserExpenses = function(userId) {
    console.log(userId);
    return $http({
      method: 'GET',
      url: '/api/expenses/' + userId
    }).then(function(res) {
      console.log(res);
      return res.data;
    });
  };

  this.removeExpense = function(userId) {
    console.log(userId);
    return $http({
      method: 'DELETE',
      url: '/api/expenses/' + userId
    });
  };

  this.addUserExpense = function(newExpense, userId) {
    console.log(newExpense, userId);
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

  //
  // this.editExpense = function (editExpense, id) {
  //   return $http({
  //     method: 'PUT',
  //     url: '/api/expenses/' + id,
  //     data: {
  //       name: editFeedback.name,
  //       review: editFeedback.review,
  //       stars: editFeedback.stars
  //     }
  //   });
  // };







});
