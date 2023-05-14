"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("../service/post.service"));
const category_service_1 = __importDefault(require("../service/category.service"));
class PostController {
    constructor() {
        this.findAll = async (req, res) => {
            let listPost = await this.postService.getAll();
            res.render('index', { posts: listPost });
        };
        this.findAllCategory = async (req, res) => {
            let listCategory = await this.categoryService.getAll();
            res.status(200).json(listCategory);
        };
        this.postService = post_service_1.default;
        this.categoryService = category_service_1.default;
    }
}
exports.default = new PostController();
//# sourceMappingURL=category.controllers.js.map