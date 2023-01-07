import express from "express";
import cors from 'cors'
import apiRouter from './routes/index.js'

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/api/v1', apiRouter)

app.get('/')
console.log(port)
app.listen(port);