var Expense = require('../models/expense.js');

module.exports = {

  addExpense: function(req, res) {
    new Expense(req.body).save(function(err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  },

  getUserExpenses: function(req, res) {
    // console.log(req.params.id)
    Expense.find({
        user: req.params.id
      })
      .exec()
      .then(function(expense, err) {
        if (err) {
          return console.error(err);
        } else {
          res.send(expense);
        }
      });
  },

  removeExpense: function(req, res) {
      Expense.findByIdAndRemove(req.params.id, function(err, expense) {
          if (err) {
              return console.error(err);
          } else {
              res.send(expense);
          }
      });
  }

};
