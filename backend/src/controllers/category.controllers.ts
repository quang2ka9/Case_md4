import {Request, Response} from "express";
import postService from "../service/post.service";
import categoryService from "../service/category.service";

class PostController{
    private postService;
    private categoryService;

    constructor() {
        this.postService = postService;
        this.categoryService = categoryService;
    }
    findAll = async (req: Request, res: Response) => {
        let listPost = await this.postService.getAll();
        res.render('index',{posts: listPost})
    }
    findAllCategory = async (req: Request, res: Response) => {
        let listCategory = await this.categoryService.getAll();
        res.status(200).json(listCategory);
    }

}
export default new PostController();