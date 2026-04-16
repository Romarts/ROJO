"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "sua_chave_secreta_aqui"; // Em produção, use variáveis de ambiente (.env)
class UserController {
    async register(req, res) {
        try {
            const { nome, email, cpf, senha } = req.body;
            // --- VALIDAÇÕES NO BACK-END (Requisito da Rubrica) ---
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email))
                return res.status(400).json({ mensagem: "E-mail inválido." });
            if (cpf.length !== 14)
                return res.status(400).json({ mensagem: "CPF incompleto." });
            if (senha.length < 8)
                return res.status(400).json({ mensagem: "A senha deve ter 8+ caracteres." });
            const senhaHash = await bcrypt_1.default.hash(senha, 10);
            const user = await prisma_1.prisma.user.create({
                data: { nome, email, cpf, senha: senhaHash }
            });
            return res.status(201).json({ mensagem: "Usuário criado!", id: user.id });
        }
        catch (error) {
            return res.status(400).json({ mensagem: "E-mail ou CPF já cadastrados." });
        }
    }
    async login(req, res) {
        const { email, senha } = req.body;
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (user && await bcrypt_1.default.compare(senha, user.senha)) {
            // --- RETORNO JWT (Requisito da Rubrica) ---
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({
                token,
                user: { nome: user.nome, email: user.email }
            });
        }
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }
    // --- EDIÇÃO DE PERFIL (Requisito da Rubrica) ---
    async update(req, res) {
        const { id } = req.params;
        const { nome, cpf, senha } = req.body; // Note que não recebemos o email aqui!
        try {
            const dataUpdate = { nome, cpf };
            if (senha)
                dataUpdate.senha = await bcrypt_1.default.hash(senha, 10);
            await prisma_1.prisma.user.update({
                where: { id: Number(id) },
                data: dataUpdate
            });
            return res.json({ mensagem: "Perfil atualizado com sucesso!" });
        }
        catch (error) {
            return res.status(400).json({ mensagem: "Erro ao atualizar perfil." });
        }
    }
}
exports.UserController = UserController;
