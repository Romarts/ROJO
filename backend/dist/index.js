"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("./controllers/ProductController");
const AuthController_1 = require("./controllers/AuthController"); // Use o Auth que tem o JWT
const CategoryController_1 = require("./controllers/CategoryController");
const authMiddleware_1 = require("./controllers/authMiddleware"); // Verifique se o caminho está certo!
class App {
    app;
    authController;
    productController;
    categoryController;
    constructor() {
        this.app = (0, express_1.default)();
        this.authController = new AuthController_1.AuthController();
        this.productController = new ProductController_1.ProductController();
        this.categoryController = new CategoryController_1.CategoryController();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            if (req.method === 'OPTIONS')
                res.sendStatus(200);
            else
                next();
        });
        this.app.use(express_1.default.json());
    }
    routes() {
        // Rotas de Auth (Usando o seu novo AuthController)
        this.app.post("/register", (req, res) => this.authController.register(req, res));
        this.app.post("/login", (req, res) => this.authController.login(req, res));
        // Rotas de Produtos
        this.app.get("/produtos", (req, res) => this.productController.listAll(req, res));
        this.app.post("/produtos", authMiddleware_1.authMiddleware, (req, res) => this.productController.create(req, res));
        this.app.put("/produtos/:id", authMiddleware_1.authMiddleware, (req, res) => this.productController.update(req, res));
        this.app.delete("/produtos/:id", authMiddleware_1.authMiddleware, (req, res) => this.productController.delete(req, res));
        // Rotas de Categorias
        this.app.get("/categorias", (req, res) => this.categoryController.listAll(req, res));
        this.app.post("/categorias", authMiddleware_1.authMiddleware, (req, res) => this.categoryController.create(req, res));
        this.app.get("/", (req, res) => res.status(200).json({ status: "API Online" }));
    }
    start() {
        this.app.listen(3000, () => console.log(`🚀 Servidor pronto`));
    }
}
new App().start();
