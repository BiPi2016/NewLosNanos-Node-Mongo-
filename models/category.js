const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema( 
    {
        name: {
            type: String,
            minlength: 2,
            enum: ['clothes', 'shoes', 'accessories', 'ehnic']
        },
        audience: {
            type: Schema.Types.ObjectId,
            ref: 'gender'
        }
    }    
);

module.exports = mongoose.model('Category', categorySchema);