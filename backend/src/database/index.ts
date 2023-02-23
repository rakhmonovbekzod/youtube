import { Pool, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  password: '19951212bek',
  database: 'youtube',
  port: 5432,
  host: 'localhost',
});

const fetch = async (SQL: string, params: any[] = []): Promise<any[]> => {
  const client = await pool.connect();
  console.log('Connected to database');

  try {
    const { rows } = await client.query(SQL, params);
    return rows;
  } catch (e) {
    console.log(e);
    return [];
  } finally {
    client.release();
    console.log('Disconnected from database');
  }
};

export {fetch};
