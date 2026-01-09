const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL to image
    subProjects: [{ type: String }] // Array of strings
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
