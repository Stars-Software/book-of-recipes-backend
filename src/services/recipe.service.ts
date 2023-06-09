import RecipeCategory from "../models/Recipe-Category";
import Product from "../models/Product";
import { Recipe } from "../models/Recipe";
import { IRecipeDBRecord } from "../types/recipe.type";
import { CustomError } from "../utils/error.util";
import { ProductService } from "./product.service";
// import { productChecker, productsChecker } from "../utils/checkAvaliable";

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
    data: any
  ): Promise<IRecipeDBRecord | null> {
    const { title, description, products } = data;
    const recipe = await Recipe.findOne({ where: { id, userId } });
    if (!recipe) {
      throw new CustomError(409, "Permission denied");
    }
    await Recipe.update({ title, description }, { where: { id, userId } });
    for (const item of products) {
      const product = await Product.findByPk(item.id);
      await recipe.addProduct(product, { through: { amount: item.amount } });
    }
    return await RecipeService.getById(userId, id);
  }

  static async delete(userId: string, id: string) {
    return await Recipe.destroy({ where: { id, userId } });
  }

  static async getAll(userId: string): Promise<IRecipeDBRecord[] | null> {
    return await Recipe.findAll({
      where: { userId },
      include: [
        { model: Product, through: { attributes: ["amount"] } },
        RecipeCategory,
      ],
    });
  }

  static async getById(
    userId: string,
    id: string
  ): Promise<IRecipeDBRecord | null> {
    return await Recipe.findOne({
      where: { id, userId },
      include: [
        { model: Product, through: { attributes: ["amount"] } },
        RecipeCategory,
      ],
    });
  }

  static async getAvaliable(userId: string) {
    // const recipes = await RecipeService.getAll(userId);
    // const products = await ProductService.getAll(userId, "");
    // const id = productsChecker.checkRecipe(
    //   recipes,
    //   products
    // );
    // if (!id) return [];
    // return await RecipeService.getById(userId, id);
  }
}
