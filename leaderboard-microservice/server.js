const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const leaderboardRoutes = require('./routes/leaderBoard');
require('dotenv').config();

const app = express();
const PORT = 3005;

const MONGODB_URI = process.env.MONGO_URI;


app.use(bodyParser.json());

app.use('/api/leaderboard', leaderboardRoutes);
app.get("/", (req, res) => {
    res.send("API is running.. successfully");
  });
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => console.error('MongoDB connection error:', error));