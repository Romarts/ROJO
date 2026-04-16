"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductController {
    async listAll(req, res) {
        try {
            const produtos = await prisma.product.findMany({ include: { category: true } });
            res.status(200).json(produtos);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar produtos" });
        }
    }
    async create(req, res) {
        try {
            const { nome, preco, descricao, categoryId } = req.body;
            const novoProduto = await prisma.product.create({
                data: { nome, preco: Number(preco), descricao, categoryId: Number(categoryId) }
            });
            res.status(201).json(novoProduto);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar produto" });
        }
    }
    // ADICIONE ESTE MÉTODO (Update)
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco, descricao, categoryId } = req.body;
            const atualizado = await prisma.product.update({
                where: { id: Number(id) },
                data: { nome, preco: Number(preco), descricao, categoryId: Number(categoryId) }
            });
            res.json(atualizado);
        }
        catch (error) {
            res.status(400).json({ error: "Erro ao atualizar produto" });
        }
    }
    // ADICIONE ESTE MÉTODO (Delete)
    async delete(req, res) {
        try {
            const { id } = req.params;
            await prisma.product.delete({ where: { id: Number(id) } });
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: "Erro ao deletar produto" });
        }
    }
}
exports.ProductController = ProductController;
