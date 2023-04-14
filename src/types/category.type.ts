import { IDataBaseRecord } from "./database-record.type";
import { IRequest } from "./request.type";

export interface ICategory {
  title: string;
  img: string;
}

export interface ICategoryRequest extends IRequest {
  body: ICategory;
}

export type ICategoryDBRecord = IDataBaseRecord &
  ICategory & {
    userId: string;
  };
