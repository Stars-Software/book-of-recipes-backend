import express from "express";
import "dotenv/config";
import AppRouter from "./routes";
import connectDB from "./config/database/pool";
import { applyPassportStrategy } from "./utils/passport.util";
import { corsOptions } from "./config/corsOptions";
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();
const router = new AppRouter(app);
connectDB();

app.set("port", process.env.PORT || 4200);
app.use(cookieParser());
app.use(passport.initialize());
applyPassportStrategy(passport);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));

router.init();

const port = app.get("port");

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});

export default server;
