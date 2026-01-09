const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create service
router.post('/', async (req, res) => {
    const service = new Service({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        features: req.body.features,
        icon: req.body.icon,
        color: req.body.color
    });
    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update service
router.patch('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service == null) {
            return res.status(404).json({ message: 'Cannot find service' });
        }

        if (req.body.title != null) service.title = req.body.title;
        if (req.body.description != null) service.description = req.body.description;
        if (req.body.image != null) service.image = req.body.image;
        if (req.body.features != null) service.features = req.body.features;
        if (req.body.icon != null) service.icon = req.body.icon;
        if (req.body.color != null) service.color = req.body.color;

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete service
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Cannot find service' });

        await Service.deleteOne({ _id: req.params.id });
        res.json({ message: 'Deleted Service' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
