import {Router} from "express";
import commentControllers from "../controllers/comment.controllers";

import {deleteComment} from "../middleware/deleteComment";


const commentRouter = Router();

commentRouter.post('/' , commentControllers.addComments);
commentRouter.get('/:id' ,commentControllers.showComment);
commentRouter.delete('/:id' , commentControllers.removeComment);
commentRouter.get('/find/:id' , commentControllers.findIdComments);
commentRouter.put('/:id' ,commentControllers.editComment);

export default commentRouter;