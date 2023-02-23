import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoCard from '../../components/VideoCard';

type Video = {
  video_id: string;
  video_title: string;
  video_description: string;
  video_url: string;
  video_thumbnail_url: string;
};

const SingleVideo = () => {
  const { id } = useParams<{id: string}>();
  const [video, setVideo] = useState<Video>();

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await axios.get(`http://localhost:4000/videos/${id}`);
      setVideo(response && response.data[0]);
    };
    fetchVideo();
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, voluptate illum. Corporis id delectus eveniet amet odit praesentium! Eligendi aliquam aliquid dignissimos quidem enim rem sequi iure exercitationem deleniti corrupti?
       <VideoCard className='card' {...video}/>
    </div>
  );
};

export default SingleVideo;
