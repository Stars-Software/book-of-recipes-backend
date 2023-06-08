import { Router } from "express";
import { validateBody } from "../../middlewares/body.middleware";
import { checkExistance } from "../../middlewares/check-existance.middleware";
import { responseHandler } from "../../middlewares/response.middleware";
import { RecipeController } from "../../controllers/recipe.controller";
import {
  CreateRecipeSchema,
  EditRecipeSchema,
} from "../../validators/recipe.validator";
import { errorHandler } from "../../middlewares/error.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { RecipeService } from "../../services/recipe.service";
import { IRecipeDBRecord } from "../../types/recipe.type";

const recipeRouter: Router = Router();

recipeRouter.use("", authenticate, errorHandler);
recipeRouter.get(
  "",

  responseHandler(RecipeController.getAll),
  errorHandler
);
recipeRouter.post(
  "",
  validateBody(CreateRecipeSchema),
  responseHandler(RecipeController.create),
  errorHandler
);
recipeRouter.use(
  "/:id",
  checkExistance<IRecipeDBRecord>("id", RecipeService.getById)
);
recipeRouter.get(
  "/:id",
  responseHandler(RecipeController.getById),
  errorHandler
);
recipeRouter.put(
  "/:id",
  validateBody(EditRecipeSchema),
  responseHandler(RecipeController.update),
  errorHandler
);
recipeRouter.delete(
  "/:id",
  responseHandler(RecipeController.delete),
  errorHandler
);

export default recipeRouter;
