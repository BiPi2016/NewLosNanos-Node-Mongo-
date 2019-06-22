const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        brand: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
        },
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
        },
        price: {
            type: Number,
            required: true,
            min: 1
        },
        gender: {
            type: Schema.Types.ObjectId,
            ref: 'genders'
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categories'
        },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'types'
        },        
        sizes: [{
            type: String
        }]

    }
);

module.exports = mongoose.model('Product', productSchema);