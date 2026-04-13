import express, { Application } from 'express';
import { ProductController } from './controllers/ProductController';
import { UserController } from './controllers/UserController';

class App {
  public app: Application;
  private userController: UserController;

  constructor() {
    this.app = express();
    this.userController = new UserController();
    
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

    this.app.post("/register", (req, res) => this.userController.register(req, res));
    this.app.post("/login", (req, res) => this.userController.login(req, res));

    this.app.get("/produtos", (req, res) => ProductController.getAll(req, res));
    this.app.post("/produtos", (req, res) => ProductController.create(req, res));
    
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