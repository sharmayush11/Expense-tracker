const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
title: {
type: String,
required: true,
trim: true
},
amount: {
type: Number,
required: true,
min: 0
},
category: {
type: String,
required: true,
default: 'Other'
},
date: {
type: String,
required: true
}
});

const UserSchema = new Schema({
name: {
type: String,
required: true
},
email: {
type: String,
required: true,
unique: true
},
password: {
type: String,
required: true
},
expenses: [ExpenseSchema]
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
