
import React, { useState, useEffect } from 'react';
import axios from "axios";

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
      <ul>
        {videos.map((video) => (
          <li key={video.video_id}>
            <h2>{video.video_title}</h2>
            <p>{video.video_description}</p>
            <a href={video.video_url} target="_blank" rel="noopener noreferrer">
              <img src={video.video_thumbnail_url} alt={video.video_title} />
            </a>
            <video width="320" height="240" controls>
              <source src={video.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
