import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    res.send('this is home page');
});
export default router;
//# sourceMappingURL=index.js.map