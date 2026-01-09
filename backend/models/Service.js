const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    features: [{ type: String }],
    icon: { type: String }, // Store icon name (e.g., 'Target', 'Palette') and handle mapping on frontend
    color: { type: String } // Store Tailwind gradient classes or color codes
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
