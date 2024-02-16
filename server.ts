require('dotenv').config();
import express from 'express';
import cors from 'cors';
import './bot'

const app = express();

app.use(cors());
app.use(express.json());

export default app;
