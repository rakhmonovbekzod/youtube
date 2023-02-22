const fs = require('fs');
const path = require('path')

let videos = fs.readFileSync(path.join(__dirname, '../../', 'assets/resources', 'videos.json'), 'utf8');

videos = JSON.parse(videos)

const getVideos = () => videos

export {
    getVideos
}







