import express, { Request, Response, Router } from 'express';
import { getSingleVideo } from '../../controllers/singleVideo';
import { getAll } from '../../controllers/videos';


const router: Router = express.Router();

router.get('/videos',async (req: Request, res: Response) => {
  const data = await getAll();
   res.send(data);
});

router.get('/videos/:id',async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await getSingleVideo(id);
  res.send(data);
})

export default router;
