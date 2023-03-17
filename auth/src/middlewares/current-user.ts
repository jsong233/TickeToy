import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// reach into an existing type definition and 
// augment the type definition
declare global {
  namespace Express {
    interface Request {
      // so that we have access to req.currentUser
      currentUser?: UserPayload;
    }
  }
}

// Middleware to extract the JWT payload 
// and set it on 'req.currentUser'
export const currentUser = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};