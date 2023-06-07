import { sequelize } from "../config/database/pool";
import { readFileSync } from "fs";
import { CustomError } from "./error.util";

class DataBaseUtils {
  private tool: any;
  private fileReader: any;
  constructor() {
    this.tool = sequelize;
    this.fileReader = readFileSync;
  }

  destructObjects(
    mainObjects: Record<string, any>[],
    nestedFields: [string, ...string[]][]
  ): Record<string, any>[] {
    const modifiedObjects: Record<string, any>[] = [];

    for (const mainObj of mainObjects) {
      const mainObjStringified = JSON.stringify(mainObj);
      const mainObjParsed = JSON.parse(mainObjStringified);
      const modifiedObj: Record<string, any> = { ...mainObjParsed };

      for (const [nestedObjName, ...nestedFieldNames] of nestedFields) {
        if (nestedObjName in modifiedObj) {
          const nestedObj = modifiedObj[nestedObjName];
          const nestedProperties = Object.keys(nestedObj);

          for (const nestedFieldName of nestedFieldNames) {
            if (nestedProperties.includes(nestedFieldName)) {
              modifiedObj[nestedFieldName] = nestedObj[nestedFieldName];
            }
          }

          delete modifiedObj[nestedObjName];
        }
      }

      modifiedObjects.push(modifiedObj);
    }

    return modifiedObjects;
  }

  async seedData(filePath: string, model: any) {
    try {
      await model.sync({ force: true });

      const jsonData = this.fileReader(filePath, "utf8");
      const data = JSON.parse(jsonData);

      await model.bulkCreate(data);

      console.log("Data inserted successfully.");
    } catch (error) {
      throw new CustomError(500, "Something went wrong");
    }
  }
  async close() {
    await this.tool.close();
  }
}

export const dataBaseUtils = new DataBaseUtils();
