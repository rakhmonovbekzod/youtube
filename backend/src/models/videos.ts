const fs = require('fs');
const path = require('path');

const getVideos = () => {
  const videos = fs.readFileSync(path.join(__dirname, '../../', 'assets/resources', 'videos.json'), 'utf8');
  return JSON.parse(videos);
}

export {
  getVideos
};






