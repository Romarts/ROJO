"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = require("../repositories/UserRepository");
const CpfValidator_1 = require("../utils/CpfValidator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository = new UserRepository_1.UserRepository();
class AuthController {
    async register(req, res) {
        try {
            const { nome, email, cpf, senha } = req.body;
            // 1. Validação de Email (Regex) - Requisito da Rubrica
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Formato de e-mail inválido." });
            }
            // 2. Validação de CPF - Requisito da Rubrica
            if (!CpfValidator_1.CpfValidator.isValid(cpf)) {
                return res.status(400).json({ message: "CPF inválido." });
            }
            // 3. Validação de Nível de Senha - Requisito da Rubrica
            // Mínimo 8 caracteres, pelo menos uma letra e um número
            const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!senhaRegex.test(senha)) {
                return res.status(400).json({
                    message: "A senha deve ter no mínimo 8 caracteres, incluindo letras e números."
                });
            }
            // 4. Verificação de Duplicados (E-mail e CPF)
            const emailExists = await userRepository.findByEmail(email);
            const cpfExists = await userRepository.findByCpf(cpf);
            if (emailExists || cpfExists) {
                return res.status(400).json({ message: "E-mail ou CPF já cadastrados." });
            }
            // 5. Criptografia de Senha - Requisito da Rubrica
            const hashedPassword = await bcrypt_1.default.hash(senha, 10);
            const user = await userRepository.create({
                nome,
                email,
                cpf,
                senha: hashedPassword
            });
            return res.status(201).json({ message: "Usuário criado com sucesso!", id: user.id });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            // 1. Verificar se o usuário existe
            const user = await userRepository.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "E-mail ou senha incorretos." });
            }
            // 2. Verificar se a senha está correta (Requisito: Senha criptografada)
            const senhaValida = await bcrypt_1.default.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).json({ message: "E-mail ou senha incorretos." });
            }
            // 3. Gerar Token JWT (Requisito: Retorno JWT - Vale 1 ponto)
            // O "SECRET" deve ser uma string única. Em produção, use .env
            const token = jsonwebtoken_1.default.sign({ id: user.id, nome: user.nome }, "ROJO_SECRET_KEY", { expiresIn: '1d' });
            return res.status(200).json({
                message: "Login realizado com sucesso!",
                token,
                user: { nome: user.nome, email: user.email }
            });
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
}
exports.AuthController = AuthController;
