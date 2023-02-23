
import { fetch } from "../../database";

type Video = {
    id: number,
    title: string,
    description: string,
    url: string,
    thumbnailUrl: string,
}

  
  const getSingleVideo = async (id:number):Promise<Video[]> => {
    const query = `SELECT * FROM videos where video_id = $1`;

    const result = await fetch(query, [id]);
    return result;
  }
  
  export { getSingleVideo };