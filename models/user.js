const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'The password must be at least characters long']
    }
});

userSchema.pre('save', function(next) {
    const saltrounds = 12;
    const salt = bcrypt.genSaltSync(saltrounds);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

// Hashing Passwords
userSchema.methods.encryptPass = function(enteredPass) {
    const saltrounds = 12;
    const salt = bcrypt.genSaltSync(saltrounds);
    return bcrypt.hashSync(enteredPass, salt);
};

// Unhashing Passwords
userSchema.methods.passwordMatches = function(enteredPass) {
    return bcrypt.compareSync(enteredPass, this.password);
}

module.exports = mongoose.model('User', userSchema);