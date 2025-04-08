const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    lessonIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    }],
    numberOfSpaces: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema); 