require('dotenv').config();
import router from './router'
import express from 'express';
import cors from 'cors';
import './bot'

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;
