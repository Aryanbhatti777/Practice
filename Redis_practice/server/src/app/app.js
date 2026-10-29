import express from 'express'
import postRoutes from '../routes/post.routes.js'
import morgan from 'morgan'

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use('/api/posts', postRoutes);

export default app;