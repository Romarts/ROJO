import { Request, Response } from 'express';
import { ProductRepository } from '../repositories/ProductRepository';

// Instanciamos o repositório para falar com o banco real
const productRepository = new ProductRepository();

export class ProductController {
  
  // O "R" do CRUD - Agora busca do Prisma (Banco SQLite)
  public async listAll(req: Request, res: Response) {
    try {
      const produtos = await productRepository.findAll();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar perfumes no banco." });
    }
  }

  // O "C" do CRUD - Agora salva no Prisma (Banco SQLite)
  public async create(req: Request, res: Response) {
    try {
      const { nome, preco, categoryId, descricao } = req.body;

      // Validação rápida (Boa prática!)
      if (!nome || !preco || !categoryId) {
        return res.status(400).json({ message: "Campos obrigatórios: nome, preco, categoryId" });
      }

      const novo = await productRepository.create({
        nome,
        preco: Number(preco), // Garante que o preço seja número
        categoryId: Number(categoryId),
        descricao
      });

      return res.status(201).json(novo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar o perfume." });
    }
  }
}