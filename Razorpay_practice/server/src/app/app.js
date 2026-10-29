import express from 'express'
import paymentRouter from '../routes/payments.routes.js';
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use("/api/payments", paymentRouter)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})
export default app;