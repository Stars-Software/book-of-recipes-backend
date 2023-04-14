import { Application } from 'express';
import groupsRouter from './api/category.route';
import subTasksRouter from './api/recipe.route';
import todosRouter from './api/product.route';
import userRouter from './api/users.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/todos', todosRouter);
    this.app.use('/api/user', userRouter);
    this.app.use('/api/groups', groupsRouter);
    this.app.use('/api/sub-tasks', subTasksRouter);
  }
}

export default AppRouter;
