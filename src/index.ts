import express, { Application, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ProductController } from './controllers/ProductController';

const SECRET_KEY = "sua_chave_secreta_aqui";

interface User {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
}

class App {
  public app: Application;
  private users: User[] = [];

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  private routes(): void {
    this.app.post("/register", async (req: Request, res: Response) => this.handleRegister(req, res));
    this.app.post("/login", async (req: Request, res: Response) => this.handleLogin(req, res));
    this.app.get("/produtos", (req, res) => ProductController.getAll(req, res));
    this.app.post("/produtos", (req, res) => ProductController.create(req, res));
  }

  private async handleRegister(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha, cpf } = req.body;
    
    // Criptografia (Atende requisito de Segurança)
    const hashedPassword = await bcrypt.hash(senha, 10);
    this.users.push({ nome, email, senha: hashedPassword,cpf });
    
    return res.status(201).json({ message: "Usuário criado com segurança!" });
  }

  private async handleLogin(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;
    const user = this.users.find(u => u.email === email);

    if (user && await bcrypt.compare(senha, user.senha)) {
      // Geração de Token (Atende requisito de JWT)
      const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      return res.json({ auth: true, token });
    }

    return res.status(401).json({ message: "Login inválido" });
  }

  public start(): void {
    this.app.listen(3000, () => console.log("Servidor 100% pronto 🚀"));
  }
}

new App().start();