const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodTypeSchema = new Schema(
    {
        name: {
            type: String,
            minlength: 1
        }
    }
);

module.exports = mongoose.model('prodType', prodTypeSchema);