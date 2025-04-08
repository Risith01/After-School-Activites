const express = require('express');
const path = require('path');

const staticFileMiddleware = express.static(path.join(__dirname, '../public/images'));

// Error handling middleware for images
const imageErrorHandler = (req, res, next) => {
    res.status(404).json({ message: 'Image not found' });
};

module.exports = {
    staticFileMiddleware,
    imageErrorHandler
}; 