const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema( 
    {
        name: {
            type: String,
            minlength: 2,
            enum: ['clothes', 'shoes', 'accessories', 'ehnic']
        }
    }    
);

module.exports = mongoose.model('Category', categorySchema);