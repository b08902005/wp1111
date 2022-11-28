import http from 'http'
import express from 'express'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import mongo from './mongo.js'
import wsConnect from './wsConnect.js'
import { WebSocket, WebSocketServer } from 'ws'
import { v4 as uuidv4 } from 'uuid'

mongo.connect();

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
const db = mongoose.connection
db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        ws.id = uuidv4();
        ws.box = '';    // keep track of client's CURRENT chat box
        // Define WebSocket connection logic
        ws.onmessage = wsConnect.onMessage(wss, ws); // 設定onmessage(綁定function到onmessage上)
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`)
});