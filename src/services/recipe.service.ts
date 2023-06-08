import RecipeCategory from "../models/Recipe-Category";
import Product from "../models/Product";
import { Recipe } from "../models/Recipe";
import { IRecipe, IRecipeDBRecord } from "../types/recipe.type";

export class RecipeService {
  static async create(userId: string, data: any): Promise<any | null> {
    const { products, ...rest } = data;
    const recipe = await Recipe.create({ ...rest, userId });
    for (const { id, amount } of products) {
      const product = await Product.findByPk(id);
      await recipe.addProduct(product, { through: { amount } });
    }
    return recipe;
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
    return await Recipe.findAll({
      where: { userId },
      include: [
        { model: Product, through: { arguments: "amount" } },
        RecipeCategory,
      ],
    });
  }

  static async getById(
    userId: string,
    id: string
  ): Promise<IRecipeDBRecord | null> {
    return await Recipe.findOne({ where: { id, userId } });
  }
}
