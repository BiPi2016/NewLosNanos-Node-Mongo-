const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = new Schema( {
    name: {
        type: String,
        required: true,
    },
    prodType: {
        type: Schema.Types.ObjectId,
        ref: 'prodType'
    }       
});

sizeSchema.methods.sizes = function(cb) {
    ruturn ( this.model('Size').find({ prodType: this.prodType }) );
}

module.exports = mongoose.model('Size', sizeSchema);

