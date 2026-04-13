import { Request, Response } from 'express';

// Interface para seguir o padrão TypeScript
interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
}

export class ProductController {
  // Seus produtos "padrão" agora vivem no servidor
  private static produtos: Produto[] = [
    { id: 1, nome: "Noir Absolu", categoria: "Masculino", preco: 489 },
    { id: 2, nome: "Rouge Intense", categoria: "Unissex", preco: 529 },
    { id: 3, nome: "Fleur Délicate", categoria: "Feminino", preco: 399 },
    { id: 4, nome: "Jardin Secret", categoria: "Unissex", preco: 459 }
  ];

  // Listar todos (O "R" do CRUD - Read)
  public static getAll(req: Request, res: Response) {
    res.json(this.produtos);
  }

  // Criar novo (O "C" do CRUD - Create)
  public static create(req: Request, res: Response) {
    const { nome, categoria, preco } = req.body;
    const novo = { id: Date.now(), nome, categoria, preco };
    ProductController.produtos.push(novo);
    res.status(201).json(novo);
  }
}