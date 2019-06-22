const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 1,
            enum: ['male', 'female', 'neutral']
        }
    }
);

module.exports = mongoose.model('Gender', genderSchema);