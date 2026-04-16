import express, { Application } from 'express';
import { ProductController } from './controllers/ProductController';
import { AuthController } from './controllers/AuthController'; // Use o Auth que tem o JWT
import { CategoryController } from './controllers/CategoryController';
import { authMiddleware, adminOnly } from './controllers/authMiddleware';
class App {
  public app: Application;
  private authController: AuthController;
  private productController: ProductController;
  private categoryController: CategoryController;

  constructor() {
    this.app = express();
    this.authController = new AuthController();
    this.productController = new ProductController();
    this.categoryController = new CategoryController();
    
    this.middlewares();
    this.routes();
  } 

  private middlewares(): void {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      if (req.method === 'OPTIONS') res.sendStatus(200);
      else next();
    });
    this.app.use(express.json());
  }

  private routes(): void {
    // Rotas de Auth (Usando o seu novo AuthController)
    this.app.post("/register", (req, res) => this.authController.register(req, res));
    this.app.post("/login", (req, res) => this.authController.login(req, res));

    // Rotas de Produtos
    this.app.get("/produtos", (req, res) => this.productController.listAll(req, res));
    this.app.post("/produtos", authMiddleware, adminOnly, (req, res) => this.productController.create(req, res));
    this.app.put("/produtos/:id", authMiddleware, adminOnly, (req, res) => this.productController.update(req, res));
    this.app.delete("/produtos/:id", authMiddleware, adminOnly, (req, res) => this.productController.delete(req, res));

    // Rotas de Categorias
    this.app.get("/categorias", (req, res) => this.categoryController.listAll(req, res));
    this.app.post("/categorias", authMiddleware, adminOnly, (req, res) => this.categoryController.create(req, res));
    
    this.app.get("/", (req, res) => res.status(200).json({ status: "API Online" }));
  }

  public start(): void {
    this.app.listen(3000, () => console.log(`🚀 Servidor pronto`));
  }
}

new App().start();