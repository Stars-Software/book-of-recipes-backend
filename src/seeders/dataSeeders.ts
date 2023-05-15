import { dataBaseUtils } from "../utils/database.util";
import ProductCategory from "../models/Product-Category";
import RecipeCategory from "../models/Recipe-Category";

const PRODUCT_CATEGORIES_PATH =
  "../config/database/data/product-categories.json";
const RECIPE_CATEGORIES_PATH = "../config/database/data/recipe-categories.json";

(async () => {
  await dataBaseUtils.seedData(RECIPE_CATEGORIES_PATH, RecipeCategory);
  await dataBaseUtils.seedData(PRODUCT_CATEGORIES_PATH, ProductCategory);
})();
