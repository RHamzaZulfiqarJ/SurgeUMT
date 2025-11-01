import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import userRoutes from './routes/user.js';
import jobPostRoutes from './routes/jobPost.js';
import applicationRoutes from './routes/application.js';

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', jobPostRoutes);
app.use('/api/applications', applicationRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.mongodb_URL || "";

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('listening at port ' + PORT)))
    .catch((err) => console.log('error in connection with mongoDB = \n', err))