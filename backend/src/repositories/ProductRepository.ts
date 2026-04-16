import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductRepository {
    // Listar todos os produtos (Read)
    async findAll() {
        return await prisma.product.findMany({
            include: { category: true } // Traz o nome da categoria junto
        });
    }

    // Criar novo produto (Create)
    async create(data: { nome: string; preco: number; descricao?: string; categoryId: number }) {
        return await prisma.product.create({ data });
    }
}