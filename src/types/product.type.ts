import { IDataBaseRecord } from "./database-record.type";
import { IRequest } from "./request.type";

export interface IProduct {
  title: string;
  amount: number;
}

export interface IProductRequest extends IRequest {
  body: IProduct;
}

export type IProductDBRecord = IProduct &
  IDataBaseRecord & {
    categoryId: string;
    userId: string;
  };
