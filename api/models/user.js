var mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name : {
    first: { type: String, required: true, default: '' },
    last: { type: String, required: true, default: '' }
  },
  hashedPassword: { type: String, default: '' }
});

UserSchema.methods.authenticate = function(password, cb) {
  bcrypt.compare(password, this.hashedPassword, function (err, isValidPassword) {
    if (err) {
      return cb(err);
    }
    return cb(null, isValidPassword);
  });
};

UserSchema.virtual('password').set(function (password) {
  // TODO: Remove this virtual function to a method so we can make it async
	this.hashedPassword = bcrypt.hashSync(password, 10);
});

UserSchema.path('email').validate(function (email) {
  // TODO: Add real validation
  return email.length;
}, 'Please provide a valid email');

UserSchema.path('hashedPassword').validate(function (hashed_password) {
  // TODO: Add real validation
  return hashed_password.length;
}, 'Please provide a password');
  
mongoose.model('User', UserSchema);