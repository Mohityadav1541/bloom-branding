const express = require('express');
const Homepage = require('../models/Homepage');
const router = express.Router();

// Get Homepage Data (Public)
router.get('/', async (req, res) => {
    try {
        let homepage = await Homepage.findOne();
        if (!homepage) {
            // Create default if not exists
            homepage = new Homepage();
            await homepage.save();
        }
        res.json(homepage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Homepage Data (Protected - add auth middleware if available, currently open based on previous patterns)
router.put('/', async (req, res) => {
    try {
        let homepage = await Homepage.findOne();
        if (!homepage) {
            homepage = new Homepage();
        }

        homepage.heroTitle = req.body.heroTitle || homepage.heroTitle;
        homepage.heroSubtitle = req.body.heroSubtitle || homepage.heroSubtitle;
        homepage.heroVideoUrl = req.body.heroVideoUrl || homepage.heroVideoUrl;
        homepage.heroBadge = req.body.heroBadge || homepage.heroBadge;
        homepage.showreelLink = req.body.showreelLink || homepage.showreelLink;
        homepage.updatedAt = Date.now();

        const updatedHomepage = await homepage.save();
        res.json(updatedHomepage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
