import { IDataBaseRecord } from "./database-record.type";
import { IRequest } from "./request.type";

export type IProduct = {
  title: string;
  amount: number;
}

export interface IProductRequest extends IRequest {
  body: IProduct;
  query: {
    categoryId: string;
  };
}

export type IProductDBRecord = IProduct & IDataBaseRecord & {
  categoryId: string;
  userId: string;
};
