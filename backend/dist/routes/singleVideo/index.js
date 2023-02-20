import express from 'express';
import checkToken from '../../middlewares/checkToken';
const router = express.Router();
const mockVideos = [
    {
        title: 'Cute Kittens Playing',
        description: 'Watch these adorable kittens play with toys and each other.',
        url: '/assets/videos/kittens.mp4',
        thumbnail_url: '/assets/images/kittens.jpg',
    },
    {
        title: 'Epic Nature Time-lapse',
        description: 'Experience the beauty of nature in this stunning time-lapse video.',
        url: '/assets/videos/nature.mp4',
        thumbnail_url: '/assets/images/nature.jpg',
    },
];
router.get('/video/:id', checkToken, (req, res) => {
    res.send('this is single video page');
});
export default router;
//# sourceMappingURL=index.js.map