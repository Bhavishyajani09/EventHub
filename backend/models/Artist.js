const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Music', 'Comedy', 'Art', 'Sports', 'Other'],
        default: 'Other'
    },
    bio: {
        type: String,
        default: ''
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, {
    timestamps: true
});

artistSchema.index({ name: 'text', district: 'text' });

module.exports = mongoose.model('Artist', artistSchema);
