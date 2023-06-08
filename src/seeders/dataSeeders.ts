import { RecipeCategory } from "../models/Recipe-Category";
import { dataBaseUtils } from "../utils/database.util";
import { ProductCategory } from "../models/Product-Category";

const PRODUCT_CATEGORIES_PATH =
  "src/config/database/data/product-categories.json";
const RECIPE_CATEGORIES_PATH =
  "src/config/database/data/recipe-categories.json";

(async () => {
  await dataBaseUtils.seedData(RECIPE_CATEGORIES_PATH, RecipeCategory);
  await dataBaseUtils.seedData(PRODUCT_CATEGORIES_PATH, ProductCategory);
  await dataBaseUtils.close();
})();
