import { ICategory } from "../types/category.type";
import { ProductService } from "../services/product.service";
import { IProductRequest, IProductDBRecord } from "../types/product.type";

export class ProductController {
  static async getById(req: IProductRequest): Promise<IProductDBRecord | null> {
    const { params, user } = req;
    const { userId } = user;
    const { id: productId } = params;
    return await ProductService.getById(userId, productId);
  }

  static async getAll(
    req: IProductRequest
  ): Promise<IProductDBRecord[] | null> {
    const { user, query } = req;
    const { userId } = user;
    const { categoryId } = query;
    return await ProductService.getAll(userId, categoryId);
  }

  static async create(req: IProductRequest): Promise<IProductDBRecord | null> {
    const { body, user } = req;
    const { userId } = user;
    return await ProductService.create(userId, body);
  }

  static async update(req: IProductRequest): Promise<IProductDBRecord | null> {
    const { body, params, user } = req;
    const { userId } = user;
    const { id: productId } = params;
    return await ProductService.update(userId, productId, body);
  }

  static async delete(req: IProductRequest): Promise<void> {
    const { params, user } = req;
    const { userId } = user;
    const { id: productId } = params;
    return await ProductService.delete(userId, productId);
  }

  static async getCategories(): Promise<ICategory[]> {
    return await ProductService.getCategories();
  }
}
