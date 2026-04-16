"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductRepository {
    // Listar todos os produtos (Read)
    async findAll() {
        return await prisma.product.findMany({
            include: { category: true } // Traz o nome da categoria junto
        });
    }
    // Criar novo produto (Create)
    async create(data) {
        return await prisma.product.create({ data });
    }
}
exports.ProductRepository = ProductRepository;
