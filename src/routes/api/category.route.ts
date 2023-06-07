import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { CategoryController } from "../../controllers/category.controller";
import { responseHandler } from "../../middlewares/response.middleware";
import { serveImage } from "../../middlewares/image.middleware";
import { errorHandler } from "../../middlewares/error.middleware";

const categoryRouter: Router = Router();

categoryRouter.get(
  "/images/products/:file",
  serveImage("images/products/"),
  errorHandler
);

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
