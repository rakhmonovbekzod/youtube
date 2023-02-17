import { Request, Response, NextFunction } from 'express';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export default checkToken;