const express = require('express');
const connectDB = require('./config/db');
const boatRoutes = require('./routes/boatRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', boatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
