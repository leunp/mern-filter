import controller from "./controller.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors({
    origin: 'http://localhost:5000',  // Allow frontend running on port 5000 while server on 8000
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
}));

app.use(express.json());
app.use("/", controller);

// Serve static files - Only for deploying on gcloud.
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})