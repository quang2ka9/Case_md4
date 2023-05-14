"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controllers_1 = __importDefault(require("../controllers/category.controllers"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', category_controllers_1.default.findAllCategory);
exports.default = categoryRouter;
//# sourceMappingURL=category.router.js.map