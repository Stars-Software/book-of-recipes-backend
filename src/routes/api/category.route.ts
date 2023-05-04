import { Router } from "express";
import { validateBody } from "../../middlewares/body.middleware";
import { checkExistance } from "../../middlewares/check-existance.middleware";
import { responseHandler } from "../../middlewares/response.middleware";
import { CategoryController } from "../../controllers/category.controller";
import { GroupSchema } from "../../validators/category.validators";
import { errorHandler } from "../../middlewares/error.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { ICategoryDBRecord } from "../../types/category.type";
import { CategoryService } from "../../services/category.service";

const categoryRouter: Router = Router();

categoryRouter.use("", authenticate);
categoryRouter.get(
  "",
  responseHandler(CategoryController.getAll),
  errorHandler
);
categoryRouter.post(
  "",
  validateBody(GroupSchema),
  responseHandler(CategoryController.create),
  errorHandler
);
categoryRouter.use(
  "/:id",
  checkExistance<ICategoryDBRecord>("id", CategoryService.getById)
);
categoryRouter.get(
  "/:id",
  responseHandler(CategoryController.getById),
  errorHandler
);

categoryRouter.put(
  "/:id",
  validateBody(GroupSchema),
  responseHandler(CategoryController.update),
  errorHandler
);

categoryRouter.delete(
  "/:id",
  responseHandler(CategoryController.delete),
  errorHandler
);

export default categoryRouter;
