import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/jwt';
import { AppError } from '../errors/AppError';

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
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('Invalid Token', 401);
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
