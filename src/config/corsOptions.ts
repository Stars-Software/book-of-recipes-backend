import { CustomError } from "../utils/error.util";

const whiteList = ["http://localhost:3000"];

export const corsOptions = {
  credentials: true,
  origin: (origin: any, cb: any) => {
    if (whiteList.indexOf(origin) !== -1) {
      return cb(null, true);
    }
    cb(new CustomError(500, "Not allowed!"));
  },
};
