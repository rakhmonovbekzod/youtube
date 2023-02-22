import express, { Express, Request, Response } from 'express';
import router  from "./routes";
import path from 'path';
import cors from 'cors';

const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
app.use(cors(corsOptions));

// Serve static files
app.use(express.static(path.join(__dirname, '../assets')));

// API routes
app.use(router);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
