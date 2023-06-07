import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { CategoryController } from "../../controllers/category.controller";
import { responseHandler } from "../../middlewares/response.middleware";

const categoryRouter: Router = Router();

categoryRouter.use("", authenticate);

categoryRouter.get(
  "/products",
  responseHandler(CategoryController.getProductCategories)
);

categoryRouter.get(
  "/recipes",
  responseHandler(CategoryController.getRecipeCategories)
);
export default categoryRouter;
