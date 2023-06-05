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
import { serveImage } from "../../middlewares/image.middleware";

const productRouter: Router = Router();

productRouter.get("/images/:file", serveImage("images/products/"), errorHandler);

productRouter.use("", authenticate);

productRouter.get("", responseHandler(ProductController.getAll), errorHandler);

productRouter.post(
  "",
  validateBody(CreateProductSchema),
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
  validateBody(EditProductSchema),
  responseHandler(ProductController.update),
  errorHandler
);
productRouter.delete(
  "/:id",
  responseHandler(ProductController.delete),
  errorHandler
);
productRouter.get(
  "/categories",
  responseHandler(ProductController.getCategories),
  errorHandler
);

export default productRouter;
