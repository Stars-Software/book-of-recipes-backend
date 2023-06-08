import { IProduct, IProductDBRecord } from "../types/product.type";
import User from "../models/User";
import { dataBaseUtils } from "../utils/database.util";
import { DB_FORMAT } from "../config/database/responseOptions/product.options";
import Product, { UserProduct } from "../models/Product";

export class ProductService {
  static async create(
    userId: string,
    data: IProduct
  ): Promise<IProductDBRecord | null> {
    const { amount, ...productData } = data;
    const user = await User.findByPk(userId);
    const product = await Product.create({ ...productData });
    return await product.addUser(user, { through: { amount } });
  }

  static async update(
    userId: string,
    productId: string,
    data: IProduct
  ): Promise<IProductDBRecord | null> {
    const { categoryId, amount } = data;
    await Promise.all([
      Product.update({ categoryId }, { where: { id: productId } }),
      UserProduct.update(
        { categoryId, amount },
        { where: { productId, userId } }
      ),
    ]);
    return await ProductService.getById(userId, productId);
  }

  static async delete(userId: string, id: string) {
    await UserProduct.destroy({ where: { userId, productId: id } });
    return await Product.destroy({ where: { id } });
  }

  static async getAll(userId: string, categoryId: string): Promise<any[]> {
    const products = await User.getProducts(userId, { categoryId });
    return dataBaseUtils.destructObjects(products, DB_FORMAT.PRODUCTS_LIST);
  }

  static async getById(userId: string, id: string): Promise<any | null> {
    const product = await User.getProducts(userId, { id });
    const [formatted] = dataBaseUtils.destructObjects(
      product,
      DB_FORMAT.PRODUCTS_LIST
    );
    return formatted;
  }
}
