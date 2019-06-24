const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema( 
    {
        name: {
            type: String,
            minlength: 2,
            lowercase: true
        },
        audience: {
            type: Schema.Types.ObjectId,
            ref: 'Gender',
            required: true
        }
    }    
);

module.exports = mongoose.model('Category', categorySchema);