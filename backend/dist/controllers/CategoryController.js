"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryController {
    // Create - Criar Categoria
    async create(req, res) {
        try {
            const { nome } = req.body;
            if (!nome)
                return res.status(400).json({ error: "O nome da categoria é obrigatório" });
            const novaCategoria = await prisma.category.create({
                data: { nome }
            });
            res.status(201).json(novaCategoria);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar categoria. Talvez ela já exista." });
        }
    }
    // Read - Listar todas as categorias
    async listAll(req, res) {
        try {
            const categorias = await prisma.category.findMany();
            res.status(200).json(categorias);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar categorias" });
        }
    }
    // Update - Editar Categoria
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            const categoriaAtualizada = await prisma.category.update({
                where: { id: Number(id) },
                data: { nome }
            });
            res.status(200).json(categoriaAtualizada);
        }
        catch (error) {
            res.status(404).json({ error: "Categoria não encontrada para atualizar" });
        }
    }
    // Delete - Excluir Categoria
    async delete(req, res) {
        try {
            const { id } = req.params;
            await prisma.category.delete({
                where: { id: Number(id) }
            });
            res.status(204).send(); // Sucesso sem conteúdo
        }
        catch (error) {
            res.status(404).json({ error: "Categoria não encontrada ou possui produtos vinculados" });
        }
    }
}
exports.CategoryController = CategoryController;
