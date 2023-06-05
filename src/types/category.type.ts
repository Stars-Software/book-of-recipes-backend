import { IDataBaseRecord } from "./database-record.type";

export type ICategory = {
  title: string;
  image: string;
};

export type CategoryDBRecord = IDataBaseRecord &
  ICategory & {
    userId: string;
  };
