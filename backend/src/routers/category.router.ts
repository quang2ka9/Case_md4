import {Router} from "express";
import categoryControllers from "../controllers/category.controllers";

const categoryRouter = Router();

categoryRouter.get('/' , categoryControllers.findAllCategory);

export default categoryRouter;