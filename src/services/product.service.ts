import Category from "../models/Product-Category";
import Product from "../models/Product";
import { IProduct, IProductDBRecord } from "../types/product.type";
import ProductCategory from "../models/Product-Category";

export class ProductService {
  static async create(
    userId: string,
    data: IProduct
  ): Promise<IProductDBRecord | null> {
    return await Product.build({ ...data, userId }).save();
  }

  static async update(
    userId: string,
    id: string,
    data: IProduct
  ): Promise<IProductDBRecord | null> {
    await Product.update(data, { where: { id, userId } });
    return await ProductService.getById(userId, id);
  }

  static async delete(userId: string, id: string) {
    return await Product.destroy({ where: { id, userId } });
  }

  static async getAll(userId: string): Promise<IProductDBRecord[] | null> {
    return await Product.findAll({
      where: { userId },
      include: [{ as: "categories", model: Category }],
    });
  }

  static async getById(
    userId: string,
    id: string
  ): Promise<IProductDBRecord | null> {
    return await Product.findOne({
      where: { id, userId },
      include: [{ as: "categories", model: Category }],
    });
  }

  static async getCategories() {
    return await ProductCategory.findAll();
  }
}
