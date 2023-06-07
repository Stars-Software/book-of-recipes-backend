import { Router } from "express";
import { ProductController } from "../../controllers/product.controller";
import {
  CreateProductSchema,
  EditProductSchema,
} from "../../validators/product.validators";
import { validateBody } from "../../middlewares/body.middleware";
import { checkExistance } from "../../middlewares/check-existance.middleware";
import { IProductDBRecord } from "../../types/product.type";
import { ProductService } from "../../services/product.service";
import { responseHandler } from "../../middlewares/response.middleware";
import { errorHandler } from "../../middlewares/error.middleware";
import { authenticate } from "../../middlewares/auth.middleware";

const productRouter: Router = Router();

productRouter.use("", authenticate, errorHandler);

productRouter.get("", responseHandler(ProductController.getAll), errorHandler);

productRouter.post(
  "",
  validateBody(CreateProductSchema),
  responseHandler(ProductController.create),
  errorHandler
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
  validateBody(EditProductSchema),
  responseHandler(ProductController.update),
  errorHandler
);
productRouter.delete(
  "/:id",
  responseHandler(ProductController.delete),
  errorHandler
);

export default productRouter;
