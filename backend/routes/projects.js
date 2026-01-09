const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one project
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project == null) {
            return res.status(404).json({ message: 'Cannot find project' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create project
router.post('/', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        subProjects: req.body.subProjects
    });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update project
router.patch('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project == null) {
            return res.status(404).json({ message: 'Cannot find project' });
        }

        if (req.body.title != null) project.title = req.body.title;
        if (req.body.category != null) project.category = req.body.category;
        if (req.body.description != null) project.description = req.body.description;
        if (req.body.image != null) project.image = req.body.image;
        if (req.body.subProjects != null) project.subProjects = req.body.subProjects;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Cannot find project' });

        await Project.deleteOne({ _id: req.params.id });
        res.json({ message: 'Deleted Project' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
