import express from "express";
import cors from "cors";
import * as routes from './src/routes/index.js';
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())
Object.values(routes).forEach((route) => route(app))

async function start() {
  console.log("Listening on Port 3000");
  app.listen(3030);
}

start()
