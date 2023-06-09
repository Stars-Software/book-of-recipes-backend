import { Application } from "express";
import recipeRouter from "./api/recipe.route";
import productRouter from "./api/product.route";
import userRouter from "./api/users.route";
import categoryRouter from "./api/category.route";

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use("/products", productRouter);
    this.app.use("/user", userRouter);
    this.app.use("/categories", categoryRouter);
    this.app.use("/recipes", recipeRouter);
  }
}

export default AppRouter;
