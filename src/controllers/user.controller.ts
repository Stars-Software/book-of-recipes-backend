import { Request } from "express";
import UserService from "../services/user.service";
import { IRequest } from "../types/request.type";

export class UserController {
  static async signUp(req: Request) {
    return await UserService.signUp(req.body);
  }

  static async signIn(req: Request) {
    return await UserService.signIn(req.body);
  }

  static async refresh(req: Request) {
    const { cookies } = req;
    return await UserService.refresh(cookies.refreshToken);
  }

  static async getProfile(req: IRequest) {
    const { userId } = req.user;
    return await UserService.getById(userId);
  }

  static async logOut(req: IRequest) {
    const { userId } = req.user;
    return await UserService.logOut(userId);
  }
}
