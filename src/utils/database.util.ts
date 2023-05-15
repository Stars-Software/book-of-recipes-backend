import { sequelize } from "../config/database/pool";
import { readFileSync } from "fs";

class DataBaseUtils {
  private tool: any;
  private fileReader: any;
  constructor() {
    this.tool = sequelize;
    this.fileReader = readFileSync;
  }
  async seedData(filePath: string, model: any) {
    try {
      await model.sync({ force: true });

      const jsonData = this.fileReader(filePath, "utf8");
      const data = JSON.parse(jsonData);

      await model.bulkCreate(data);

      console.log("Data inserted successfully.");
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      this.tool.close();
    }
  }
}

export const dataBaseUtils = new DataBaseUtils();
