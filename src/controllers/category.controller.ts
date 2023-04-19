import { CategoryService } from "../services/category.service";
import { ICategoryDBRecord, ICategoryRequest } from "../types/category.type";

export class CategoryController {
  static async getById(
    req: ICategoryRequest
  ): Promise<ICategoryDBRecord | null> {
    const { params, user } = req;
    const { userId } = user;
    const categoryId = params.id;
    return await CategoryService.getById(userId, categoryId);
  }

  static async getAll(
    req: ICategoryRequest
  ): Promise<ICategoryDBRecord[] | null> {
    const { userId } = req.user;
    return await CategoryService.getAll(userId);
  }

  static async create(
    req: ICategoryRequest
  ): Promise<ICategoryDBRecord | null> {
    const { body, user } = req;
    const { userId } = user;
    return await CategoryService.create(userId, body);
  }

  static async update(
    req: ICategoryRequest
  ): Promise<ICategoryDBRecord | null> {
    const { body, params, user } = req;
    const { userId } = user;
    const categoryId = params.id;
    return await CategoryService.update(userId, categoryId, body);
  }

  static async delete(req: ICategoryRequest) {
    const { params, user } = req;
    const { userId } = user;
    const categoryId = params.id;
    return await CategoryService.delete(userId, categoryId);
  }
}
