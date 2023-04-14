import Category from "../models/Recipe";
import { ICategory, ICategoryDBRecord } from "../types/category.type";

export class CategoryService {
  static async create(
    userId: string,
    data: ICategory
  ): Promise<ICategoryDBRecord | null> {
    return await Category.build({ ...data, userId }).save();
  }

  static async update(
    userId: string,
    id: string,
    data: ICategory
  ): Promise<ICategoryDBRecord | null> {
    await Category.update(data, { where: { id, userId } });
    return await CategoryService.getById(userId, id);
  }

  static async delete(userId: string, id: string) {
    return await Category.destroy({ where: { id, userId } });
  }

  static async getAll(userId: string): Promise<ICategoryDBRecord[] | null> {
    return await Category.findAll({ where: { userId } });
  }

  static async getById(
    userId: string,
    id: string
  ): Promise<ICategoryDBRecord | null> {
    return await Category.findOne({
      where: { id, userId },
    });
  }
}
