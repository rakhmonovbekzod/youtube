
import { fetch } from "../../database";
  
  const getAll = async () => {
    const query = `SELECT * FROM videos LIMIT $1`;
    const result = await fetch(query, [100]);
    return result;
  }
  
  export { getAll };