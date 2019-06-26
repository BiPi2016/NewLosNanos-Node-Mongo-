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
        audienceName: {
            type: String,
            required: true,
            minlength: 1
        },
        audience: {
            type: Schema.Types.ObjectId,
            ref: 'genders'
        },
        categoryName: {
            type: String,
            required: true,
            minlength: 1
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categories'
        },
        prodTypeName: {
            type: String,
            required: true,
            minlength: 1
        },
        prodType: {
            type: Schema.Types.ObjectId,
            ref: 'types'
        },
        sizeNames: [{
            type: String,
            required: true
        }],
        imageUrl: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Product', productSchema);