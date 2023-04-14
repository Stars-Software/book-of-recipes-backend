import { Request } from 'express';

export interface IRequest extends Request {
  user: {
    userId: string;
  };
  params: {
    [key: string]: string;
  };
}
