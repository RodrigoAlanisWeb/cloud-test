const express = require('express');
const morgan = require('morgan');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routers
app.use('/api/paths',require('./routes/path'));
app.use('/api/uploads',require('./routes/upload'));
app.use('/api/downloads',require('./routes/donwload'));

// Start Server

app.listen(3000,()=>{
    console.log('Server on port 3000');
});