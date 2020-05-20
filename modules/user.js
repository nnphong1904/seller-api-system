const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({});
const User = mongoose.model('users', UserSchema, 'users');
module.exports = User;