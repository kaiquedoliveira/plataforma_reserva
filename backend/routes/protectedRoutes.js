const express = require('express');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();

app.use('/api', protectedRoutes);
