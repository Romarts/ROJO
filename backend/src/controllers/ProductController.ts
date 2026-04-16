import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductController {
  
  // O "R" do CRUD - Busca do Banco (Prisma)
  public async listAll(req: Request, res: Response) {
    try {
      // Busca todos os produtos e já inclui os dados da Categoria vinculada!
      const produtos = await prisma.product.findMany({
        include: {
          category: true 
        }
      });
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  }

  // O "C" do CRUD - Salva no Banco (Prisma)
  public async create(req: Request, res: Response) {
    try {
      const { nome, preco, descricao, categoryId } = req.body;

      const novoProduto = await prisma.product.create({
        data: {
          nome,
          preco: Number(preco),
          descricao,
          categoryId: Number(categoryId)
        }
      });

      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  }
}