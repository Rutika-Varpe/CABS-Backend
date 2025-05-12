// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env file

const authRoutes = require('./routes/authRoutes');  // Import authentication routes
const sequelize = require('./db/pool');          // Database connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);  // Register authentication routes

// Test route
app.get('/', (req, res) => {
  res.send('Clinic Appointment API is running');
});

// Sync the database and start the server
sequelize.sync({ force: false }) // Set `force: true` to drop tables on restart (not recommended in production)
  .then(() => {
    console.log('Database synced');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
