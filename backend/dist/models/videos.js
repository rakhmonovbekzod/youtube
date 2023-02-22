"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideos = void 0;
const fs = require('fs');
const path = require('path');
const getVideos = () => {
    const videos = fs.readFileSync(path.join(__dirname, '../../', 'assets/resources', 'videos.json'), 'utf8');
    return JSON.parse(videos);
};
exports.getVideos = getVideos;
//# sourceMappingURL=videos.js.map