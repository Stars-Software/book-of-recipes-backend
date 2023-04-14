import { IDataBaseRecord } from "./database-record.type";
import { IRequest } from "./request.type";

export interface IRecipeProduct {
  title: string;
  amount: number;
}

export interface IRecipeRequest extends IRequest {
  body: IRecipe;
}

export interface IRecipe extends IDataBaseRecord {
  title: string;
  desription: string;
  video: string;
  products: IRecipeProduct[];
}

export type IRecipeDBRecord = IRecipe &
  IDataBaseRecord & {
    userId: string;
  };
