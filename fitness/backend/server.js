const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// ==========================================
// Main Routes Link (All registered before listen)
// ==========================================
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/subscription', require('./routes/subscriptionRoutes')); 
app.use('/api/videos', require('./routes/videoRoutes')); 

// Base Route
app.get('/', (req, res) => {
  res.send('EliteFit API Server is running smoothly!');
});

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));