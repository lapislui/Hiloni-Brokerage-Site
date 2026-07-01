import { Router, type IRouter } from "express";
import healthRouter from "./health";
import backofficeRouter from "./backoffice";

const router: IRouter = Router();

router.use(healthRouter);
router.use(backofficeRouter);

export default router;
