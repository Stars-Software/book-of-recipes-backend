import { IRecipeDBRecord, IRecipeRequest } from '../types/recipe.type';
import { RecipeService } from '../services/recipe.service';

export class RecipeController {
  static async getById(req: IRecipeRequest): Promise<IRecipeDBRecord | null> {
    const { params, user } = req;
    const taskId = params.id;
    const { userId } = user;
    return await RecipeService.getById(userId, taskId);
  }

  static async getAll(
    req: IRecipeRequest
  ): Promise<IRecipeDBRecord[] | null> {
    const { userId } = req.user;
    return await RecipeService.getAll(userId);
  }

  static async create(req: IRecipeRequest): Promise<IRecipeDBRecord | null> {
    const { body, user } = req;
    const { userId } = user;
    return await RecipeService.create(userId, body);
  }

  static async update(req: IRecipeRequest): Promise<IRecipeDBRecord | null> {
    const { body, params, user } = req;
    const { userId } = user;
    const todoId = params.id;
    return await RecipeService.update(userId, todoId, body);
  }

  static async delete(req: IRecipeRequest) {
    const { params, user } = req;
    const { userId } = user;
    const todoId = params.id;
    return await RecipeService.delete(userId, todoId);
  }
}
