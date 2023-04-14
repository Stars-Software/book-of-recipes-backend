import { IRecipe, IRecipeDBRecord } from "../types/recipe.type";
import Recipe from "../models/Category";

export class RecipeService {
  static async create(
    userId: string,
    data: IRecipe
  ): Promise<IRecipeDBRecord | null> {
    return await Recipe.build({ ...data, userId }).save();
  }

  static async update(
    userId: string,
    id: string,
    data: IRecipe
  ): Promise<IRecipeDBRecord | null> {
    await Recipe.update(data, { where: { id, userId } });
    return await RecipeService.getById(userId, id);
  }

  static async delete(userId: string, id: string) {
    return await Recipe.destroy({ where: { id, userId } });
  }

  static async getAll(userId: string): Promise<IRecipeDBRecord[] | null> {
    return await Recipe.findAll({ where: { userId } });
  }

  static async getById(
    userId: string,
    id: string
  ): Promise<IRecipeDBRecord | null> {
    return await Recipe.findOne({ where: { id, userId } });
  }
}
