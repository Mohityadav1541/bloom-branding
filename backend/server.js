const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const serviceRoutes = require('./routes/services');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/homepage', require('./routes/homepage'));
app.use('/api/chat', require('./routes/chat'));

app.get('/', (req, res) => {
    res.send('Bloom Studio Digital API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
