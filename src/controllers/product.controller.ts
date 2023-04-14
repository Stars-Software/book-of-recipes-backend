import { ProductService } from "../services/product.service";
import { IProductRequest, IProductDBRecord } from "../types/product.type";

export class ProductController {
  static async getById(req: IProductRequest): Promise<IProductDBRecord | null> {
    const { params, user } = req;
    const { userId } = user;
    const productId = params.id;
    return await ProductService.getById(userId, productId);
  }

  static async getAll(
    req: IProductRequest
  ): Promise<IProductDBRecord[] | null> {
    const { userId } = req.user;
    return await ProductService.getAll(userId);
  }

  static async create(req: IProductRequest): Promise<IProductDBRecord | null> {
    const { body, user } = req;
    const { userId } = user;
    return await ProductService.create(userId, body);
  }

  static async update(req: IProductRequest): Promise<IProductDBRecord | null> {
    const { body, params, user } = req;
    const { userId } = user;
    const productId = params.id;
    return await ProductService.update(userId, productId, body);
  }

  static async delete(req: IProductRequest) {
    const { params, user } = req;
    const { userId } = user;
    const productId = params.id;
    return await ProductService.delete(userId, productId);
  }
}
