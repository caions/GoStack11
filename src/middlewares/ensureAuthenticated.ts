import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/jwt';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new Error('Invalid Token');
  }

  try {
    const decoded = verify(token, authConfig.jwt.secretKey);
    const { sub } = decoded as ITokenPayload;
    req.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new Error('Invalid JWT Token');
  }
}
