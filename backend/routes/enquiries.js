const express = require('express');
const Enquiry = require('../models/Enquiry');
const router = express.Router();

// Get all enquiries
router.get('/', async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create an enquiry (Public)
router.post('/', async (req, res) => {
    const enquiry = new Enquiry({
        name: req.body.name,
        email: req.body.email,
        serviceInterest: req.body.serviceInterest,
        message: req.body.message
    });

    try {
        const newEnquiry = await enquiry.save();
        res.status(201).json(newEnquiry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update status
router.patch('/:id/status', async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

        if (req.body.status) {
            enquiry.status = req.body.status;
        }

        const updatedEnquiry = await enquiry.save();
        res.json(updatedEnquiry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete enquiry
router.delete('/:id', async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

        await Enquiry.deleteOne({ _id: req.params.id });
        res.json({ message: 'Deleted Enquiry' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
