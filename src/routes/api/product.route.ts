import { Router } from "express";
import { ProductController } from "../../controllers/product.controller";
import {
  CreateTodoSchema,
  EditTodoSchema,
} from "../../validators/todo.validators";
import { validateBody } from "../../middlewares/body.middleware";
import { checkExistance } from "../../middlewares/check-existance.middleware";
import { IProductDBRecord } from "../../types/product.type";
import { ProductService } from "../../services/product.service";
import { responseHandler } from "../../middlewares/response.middleware";
import { errorHandler } from "../../middlewares/error.middleware";
import { authenticate } from "../../middlewares/auth.middleware";

const productRouter: Router = Router();

productRouter.use("", authenticate);

productRouter.get("", responseHandler(ProductController.getAll), errorHandler);
productRouter.post(
  "",
  validateBody(CreateTodoSchema),
  responseHandler(ProductController.create)
);
productRouter.use(
  "/:id",
  checkExistance<IProductDBRecord>("id", ProductService.getById)
);
productRouter.get(
  "/:id",
  responseHandler(ProductController.getById),
  errorHandler
);
productRouter.put(
  "/:id",
  validateBody(EditTodoSchema),
  responseHandler(ProductController.update),
  errorHandler
);
productRouter.delete(
  "/:id",
  responseHandler(ProductController.delete),
  errorHandler
);

export default productRouter;
