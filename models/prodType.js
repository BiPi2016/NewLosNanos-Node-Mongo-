const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodTypeSchema = new Schema(
    {
        name: {
            type: String,
            minlength: 1,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    }
);

module.exports = mongoose.model('prodType', prodTypeSchema);