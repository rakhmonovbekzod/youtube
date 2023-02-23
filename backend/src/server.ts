import express, { Express, Request, Response } from 'express';
import router  from "./routes";
import path from 'path';
import cors from 'cors';
import {fetch} from './database';
import { getVideos } from './models/videos';
import webpush from 'web-push';
import bodyParser  from 'body-parser';

const app: Express = express();

const privateKey = 'Z8ZaHigAwokRYYq-qUuGpw2k40l88N2ut9kfc0C35M8';
const publicKey = 'BC2khsugf7WFea_kfGzXAHOwuiJw-rsTjSrSyTp1PlvPcbIGXgC-37785t22oIvQNIx5RLIT_ZDkzd-_5-doM5w';

const corsOptions = {
    origin: '*'
}
webpush.setVapidDetails(
  'mailto:bekzodrakhmonov1995@gmail.com',
  publicKey,
  privateKey
)

let globalsubscription = null;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res, next) => {
  let subscription = req.body;
  globalsubscription = subscription?.subscription;
  res.send(JSON.stringify(subscription))
})

app.delete("/register", (req, res, next) => {
   globalsubscription = null;
   res.sendStatus(200).send('successfully deleted')
})



  

// Serve static files
app.use(express.static(path.join(__dirname, '../assets')));

// API routes
app.use(router);

// Start the server
const port = 4000;
const createTable = async () => {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS videos (
    video_id BIGSERIAL NOT NULL PRIMARY KEY,
    video_title VARCHAR(150) NOT NULL,
    video_description VARCHAR(500) NOT NULL,
    video_url VARCHAR(100) NOT NULL,
    video_thumbnail_url VARCHAR(100) NOT NULL
  )`;

  await fetch(createTableQuery);
}


const insertMockData = async () => {
  const checkDataQuery = `SELECT EXISTS(SELECT 1 FROM videos)`;
  const rows= await fetch(checkDataQuery);

  if (!rows[0].exists) {
    const insertQuery = `INSERT INTO videos (video_title, video_description, video_url, video_thumbnail_url)
                           VALUES ($1, $2, $3, $4)`;
    
    for (const data of getVideos()) {
      await fetch(insertQuery, [data.title, data.description, data.url, data.thumbnailUrl]);
    }
  }
}
let testData = {
  title: "Testing",
  body: 'this is a test',
  icon: null,
  x:undefined
}
if (globalsubscription) {
  webpush.sendNotification(globalsubscription,JSON.stringify(testData)).catch(() => {});
}

app.listen(port, async() => {
  await createTable();
  await insertMockData();
  console.log(`Server is listening on port ${port}`);
});
