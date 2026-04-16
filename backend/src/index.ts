import express, { Application } from 'express';
import { ProductController } from './controllers/ProductController';
import { UserController } from './controllers/UserController';

class App {
  public app: Application;
  private userController: UserController;
  private productController: ProductController; // 1. Declare aqui

  constructor() {
    this.app = express();
    this.userController = new UserController();
    this.productController = new ProductController(); // 2. Instancie aqui
    
    this.middlewares();
    this.routes();
  } 

  private middlewares(): void {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });

    this.app.use(express.json());
  }

  private routes(): void {
    // Rotas de Usuário
    this.app.post("/register", (req, res) => this.userController.register(req, res));
    this.app.post("/login", (req, res) => this.userController.login(req, res));

    // Rotas de Produtos - 3. Use 'this.productController' (minúsculo)
    // E verifique se no Controller o nome é 'listAll' ou 'getAll'
    this.app.get("/produtos", (req, res) => this.productController.listAll(req, res));
    this.app.post("/produtos", (req, res) => this.productController.create(req, res));
    
    this.app.get("/", (req, res) => {
        res.status(200).json({ status: "API ROJO Online" });
    });
  }

  public start(): void {
    const PORT = 3000;
    this.app.listen(PORT, () => {
      console.log(`🚀 Servidor pronto em http://localhost:${PORT}`);
    });
  }
}

new App().start();