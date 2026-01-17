const mongoose = require('mongoose');

const HomepageSchema = new mongoose.Schema({
    heroTitle: {
        type: String,
        default: "We Help Brands Bloom & Thrive"
    },
    heroSubtitle: {
        type: String,
        default: "Where strategic storytelling meets immersive technology. We craft digital experiences that exist at the edge of imagination."
    },
    heroVideoUrl: {
        type: String,
        default: "https://videos.pexels.com/video-files/3205903/3205903-hd_1920_1080_25fps.mp4"
    },
    heroBadge: {
        type: String,
        default: "Future of Branding"
    },
    showreelLink: {
        type: String,
        default: "/work"
    },
    storyTeamImage: { type: String, default: "" },
    storyFounderImage: { type: String, default: "" },
    storyVisionImage: { type: String, default: "" },
    storyMissionImage: { type: String, default: "" },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Homepage', HomepageSchema);
