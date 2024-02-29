import express from "express";
import {publicRouter} from "../route/publicApi";
import {errorMiddleware} from "../middleware/error-middleware";
import {apiRouter} from "../route/api";
import {logger} from "./logging";

export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);