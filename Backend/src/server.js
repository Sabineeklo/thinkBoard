import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import ratelimiter from './middlware/rateLimiter.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== 'production') {
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
}


app.use(express.json()); // Middleware to parse JSON request bodies
app.use(ratelimiter);

app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server started on port:', PORT);
  });
});
