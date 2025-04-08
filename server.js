require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const logger = require('./middleware/logger');
const { staticFileMiddleware, imageErrorHandler } = require('./middleware/staticFile');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://Risith:2006vodka@cluster0.anfwr.mongodb.net";

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Static files
app.use('/images', staticFileMiddleware);
app.use('/images', imageErrorHandler);

// API routes
app.use('/api', apiRoutes);

// MongoDB connection with detailed error logging
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', uri);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to MongoDB.');
    console.log('Database:', mongoose.connection.db.databaseName);
})
.catch(err => {
    console.error('MongoDB connection error details:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Full error:', err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 