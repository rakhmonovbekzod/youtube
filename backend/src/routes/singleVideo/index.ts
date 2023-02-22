import express, { Request, Response, Router } from 'express';
import { getAll } from '../../controllers/videos';


const router: Router = express.Router();

router.get('/videos',async (req: Request, res: Response,next) => {
  const data = await getAll();
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
  res.send(data);
});

export default router;
