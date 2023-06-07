import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async getProductCategories() {
    return await CategoryService.getAllProductCategories();
  }
  static async getRecipeCategories() {
    return await CategoryService.getAllRecipeCategories();
  }
}
