import express from "express";
import cors from 'cors'
import apiRouter from './routes/index.js'
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/api/v1', apiRouter)

app.get('/')

app.listen(5000);