
import { fetch } from "../../database";
import { getVideos } from "../../models/videos";

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
  
  const getAll = async () => {
    await createTable();
    await insertMockData();
  
    const query = `SELECT * FROM videos LIMIT $1`;
    const result = await fetch(query, [100]);
    return result;
  }
  
  export { getAll };