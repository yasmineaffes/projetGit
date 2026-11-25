require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');
const questionRoutes = require('./routes/question');
const responseFormRoutes = require('./routes/responseform');


const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use('/api', dashboardRoutes); 
app.use('/api/user', userRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/responseForm', responseFormRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error(err);
});


