"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_router_1 = __importDefault(require("./user.router"));
const post_router_1 = __importDefault(require("./post.router"));
const category_router_1 = __importDefault(require("./category.router"));
const comment_router_1 = __importDefault(require("./comment.router"));
const router = (app) => {
    app.use('/auth', user_router_1.default);
    app.use('/post', post_router_1.default);
    app.use('/category', category_router_1.default);
    app.use('/comment', comment_router_1.default);
};
exports.default = router;
//# sourceMappingURL=index.js.map