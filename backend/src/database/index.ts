import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  password: '19951212bek',
  database: 'youtube',
  port: 5432,
  host: 'localhost',
});

const fetch = async <T>(SQL: string, params: any[]): Promise<T[]> => {
  const client = await pool.connect();
  console.log('Connected to database');

  try {
    const { rows }: { rows: T[] } = await client.query(SQL, params);
    return rows;
  } catch (e) {
    console.log(e);
    return [];
  } finally {
    client.release();
    console.log('Disconnected from database');
  }
};

const getVideoById = async (id: number) => {
  const SQL = 'SELECT * FROM videos WHERE id = $1';
  const params = [id];

  try {
    const rows = await fetch<Video>(SQL, params);
    if (rows.length > 0) {
      return rows[0];
    } else {
      console.log(`No video found with id ${id}`);
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail_url: string;
}

export { fetch, getVideoById };

