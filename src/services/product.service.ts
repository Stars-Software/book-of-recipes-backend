import Category from "../models/Product-Category";
import Product from "../models/Product";
import { IProduct, IProductDBRecord } from "../types/product.type";
import ProductCategory from "../models/Product-Category";

export class ProductService {
  static async create(
    userId: string,
    data: IProduct
  ): Promise<IProductDBRecord | null> {
    return await Product.create({ ...data, userId });
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
    await Product.destroy({ where: { id, userId } });
  }

  static async getAll(
    userId: string,
    categoryId: string
  ): Promise<IProductDBRecord[] | null> {
    const where = { userId };
    const include = categoryId
      ? [
          {
            model: Category,
            as: "product_categories",
            where: { id: categoryId },
          },
        ]
      : [];

    return await Product.findAll({ where, include });
  }

  static async getById(
    userId: string,
    id: string
  ): Promise<IProductDBRecord | null> {
    return await Product.findOne({
      where: { id, userId },
      include: [{ model: Category, as: "product_categories" }],
    });
  }

  static async getCategories() {
    return await ProductCategory.findAll();
  }
}
