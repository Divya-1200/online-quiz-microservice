const express = require('express');
const connectDB  = require('./config');
const quizRoutes = require('./routes/quizRoutes');
const roomRoutes = require('./routes/roomRoutes');
const app = express();



// MongoDB Connection
connectDB();


app.use(express.json()); // to accept json data
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/api/quiz', quizRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/answer', roomRoutes);

app.get("/", (req, res) => {
    res.send("API is running.. successfully");
  });

