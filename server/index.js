require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');


const port = process.env.PORT || 3001;


const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}


mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    
    const server = app.listen(port, () => {
      console.log(`Server is running and listening on port ${port}`);
    });

    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`);
      } else {
        console.error(`Server error: ${err.message}`);
      }
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
