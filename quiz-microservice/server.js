const express = require('express');
const connectDB  = require('./config');
const quizRoutes = require('./routes/quizRoutes');
const roomRoutes = require('./routes/roomRoutes');
const userResponseRoutes = require('./routes/userResponseRoutes.js');
const app = express();



// MongoDB Connection
connectDB();


app.use(express.json()); // to accept json data
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/api/quiz', quizRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/answer', userResponseRoutes);

app.get("/", (req, res) => {
    res.send("API is running.. successfully");
  });

