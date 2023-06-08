import { ProductCategory } from "../models/Product-Category";
import { RecipeCategory } from "../models/Recipe-Category";

export class CategoryService {
  static async getAllProductCategories() {
    return await ProductCategory.findAll();
  }

  static async getAllRecipeCategories() {
    return await RecipeCategory.findAll();
  }
}
