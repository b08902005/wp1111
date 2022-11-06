import express from "express";
import cors from 'cors';
import mongo from './db';
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import ScoreCard from './models/ScoreCard'
import routes from './routes';

mongo.connect();

const app = express();
app.use(cors());
const port = process.env.PORT | 4000;

app.use('/', routes);

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);