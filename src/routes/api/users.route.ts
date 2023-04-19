import { Router } from "express";
import { responseHandler } from "../../middlewares/response.middleware";
import { validateBody } from "../../middlewares/body.middleware";
import { SignUpSchema, SignInSchema } from "../../validators/user.validators";
import { checkEmailExistance } from "../../middlewares/check-acctount.middleware";
import { UserController } from "../../controllers/user.controller";
import { errorHandler } from "../../middlewares/error.middleware";
import { authenticate } from "../../middlewares/auth.middleware";

const userRouter: Router = Router();

userRouter.post(
  "/register",
  validateBody(SignUpSchema),
  checkEmailExistance,
  responseHandler(UserController.signUp),
  errorHandler
);
userRouter.post(
  "/login",
  validateBody(SignInSchema),
  responseHandler(UserController.signIn),
  errorHandler
);

userRouter.use("/", authenticate);

userRouter.get(
  "/refresh",
  responseHandler(UserController.refresh),
  errorHandler
);

userRouter.get(
  "/profile",
  responseHandler(UserController.getProfile),
  errorHandler
);

userRouter.get("/logOut", responseHandler(UserController.logOut));

export default userRouter;
