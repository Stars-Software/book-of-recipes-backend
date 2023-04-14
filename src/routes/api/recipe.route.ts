import { Router } from "express";
import { validateBody } from "../../middlewares/body.middleware";
import { checkExistance } from "../../middlewares/check-existance.middleware";
import { responseHandler } from "../../middlewares/response.middleware";
import { RecipeController } from "../../controllers/recipe.controller";
import {
  CreateSubTaskSchema,
  EditSubTaskSchema,
} from "../../validators/sub-task.validator";
import { errorHandler } from "../../middlewares/error.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { RecipeService } from "../../services/recipe.service";
import { IRecipeDBRecord } from "../../types/recipe.type";

const recipeRouter: Router = Router();

recipeRouter.use("", authenticate);
recipeRouter.get(
  "",

  responseHandler(RecipeController.getAll),
  errorHandler
);
recipeRouter.post(
  "",

  validateBody(CreateSubTaskSchema),
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
  validateBody(EditSubTaskSchema),
  responseHandler(RecipeController.update),
  errorHandler
);
recipeRouter.delete(
  "/:id",
  responseHandler(RecipeController.delete),
  errorHandler
);

export default recipeRouter;
