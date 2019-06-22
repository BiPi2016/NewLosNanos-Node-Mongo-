const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        brand: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
        }
    }
);