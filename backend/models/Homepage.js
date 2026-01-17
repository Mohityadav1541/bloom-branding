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

    // Founder Info
    founderName: { type: String, default: "Pranjal Jain" },
    founderRole: { type: String, default: "The Founder" },
    founderBio1: { type: String, default: "With over a decade of experience in digital design and branding, Pranjal founded Bloom Branding with a vision to bridge the gap between strategic thinking and creative expression." },
    founderBio2: { type: String, default: "\"Design isn't just about making things look good. It's about solving problems and creating meaningful connections between brands and their audience. That's what drives us every day.\"" },

    // Contact Info
    contactEmail: { type: String, default: "hello@bloombranding.com" },
    contactLocation: { type: String, default: "Jaipur, India" },
    contactInstagram: { type: String, default: "https://www.instagram.com/bloom.branding_/" },
    contactLinkedin: { type: String, default: "" },

    // Client Logos
    clientLogos: [{ type: String }],

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Homepage', HomepageSchema);
