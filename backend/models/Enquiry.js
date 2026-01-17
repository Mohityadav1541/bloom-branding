const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    serviceInterest: { type: String },
    message: { type: String, required: true },
    status: { type: String, default: 'new' }, // new, read, contacted
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
