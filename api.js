const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Order = require('../models/Order');

// GET /lessons - Get all lessons
router.get('/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /lessons - Create a new lesson
router.post('/lessons', async (req, res) => {
    try {
        const lesson = new Lesson(req.body);
        const savedLesson = await lesson.save();
        res.status(201).json(savedLesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST /orders - Create a new order
router.post('/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /lessons/:id - Update a lesson
router.put('/lessons/:id', async (req, res) => {
    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedLesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.json(updatedLesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 