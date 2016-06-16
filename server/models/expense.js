var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Expense = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    merchant: { type: String },
    cost: { type: Number },
    type: { type: String },
    comment: { type: String, default: "N/A"},
    date: { type: Date, default: Date.now() },
    dateReimbursed: { type: Date, default: null }
});


module.exports = mongoose.model('Expense', Expense);
