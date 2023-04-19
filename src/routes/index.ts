import { Application } from 'express';
import categoryRouter from './api/category.route';
import recipeRouter from './api/recipe.route';
import productRouter from './api/product.route';
import userRouter from './api/users.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/products', productRouter);
    this.app.use('/api/user', userRouter);
    this.app.use('/api/categories', categoryRouter);
    this.app.use('/api/recipes', recipeRouter);
  }
}

export default AppRouter;
