import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';

type Video = {
  video_id: string;
  video_title: string;
  video_description: string;
  video_url: string;
  video_thumbnail_url: string;
};

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get('http://localhost:4000/videos');
      setVideos(response && response.data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Video List</h1>
      <ul className='row'>
        {videos.map((video,i) => (
          <li className='col-6' key={i}>
            <Link to={`/videos/${video.video_id}`}>
              <VideoCard className='card' {...video}/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;

