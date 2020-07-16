let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    data: Object
});

module.exports = mongoose.model('User', UserSchema);

