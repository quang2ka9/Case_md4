"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("../service/post.service"));
const category_service_1 = __importDefault(require("../service/category.service"));
const comment_service_1 = __importDefault(require("../service/comment.service"));
class CommentControllers {
    constructor() {
        this.addComments = async (req, res) => {
            if (!req.body.contents) {
                res.status(400).json({
                    message: 'content missing'
                });
                res.end();
            }
            else {
                await this.commentService.addComment(req.body);
                res.status(201).json({
                    message: 'OK'
                });
            }
        };
        this.showComment = async (req, res) => {
            let id = req.params.id;
            let comment = await this.commentService.findByIdComments(id);
            res.status(200).json(comment);
        };
        this.removeComment = async (req, res) => {
            let id = req.params.id;
            await this.commentService.deleteComment(id);
            res.status(200).json({
                message: 'Delete success'
            });
        };
        this.findIdComments = async (req, res) => {
            let id = req.params.id;
            let comment = await this.commentService.findByIdCommentss(id);
            res.status(200).json(comment);
        };
        this.editComment = async (req, res) => {
            let id = req.params.id;
            let commentEdit = req.body;
            await this.commentService.updateComment(id, commentEdit);
            res.status(200).json({
                message: "Edit success"
            });
        };
        this.postService = post_service_1.default;
        this.categoryService = category_service_1.default;
        this.commentService = comment_service_1.default;
    }
}
exports.default = new CommentControllers();
//# sourceMappingURL=comment.controllers.js.map