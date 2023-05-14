import userRouter from "./user.router";
import postRouter from "./post.router";
import categoryRouter from "./category.router";
import commentRouter from "./comment.router";

const router = (app) => {
    app.use('/auth', userRouter);
    app.use('/post', postRouter);
    app.use('/category', categoryRouter);
    app.use('/comment', commentRouter);
};

export default router;