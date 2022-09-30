import express from "express";
import cors from 'cors'
import apiRouter from './routes/index.js'
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use('/api/v1', apiRouter)

app.get('/')

app.listen(5000);