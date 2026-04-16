"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// MUDANÇA AQUI: Use a mesma chave que você definiu no AuthController.ts
const SECRET_KEY = "ROJO_SECRET_KEY";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }
    const SECRET_KEY = "ROJO_SECRET_KEY"; // Tem que ser igual ao do AuthController
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        // Se cair aqui, é porque a chave é diferente ou o token expirou
        return res.status(401).json({ mensagem: "Token inválido." });
    }
};
exports.authMiddleware = authMiddleware;
