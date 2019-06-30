const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema( {
    expires: {
        type: Date
    },
    session: {
        type: String
    },
    validated: {
        type: Boolean
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'cart'
    }
});

module.exports = mongoose.model('Session', sessionSchema);