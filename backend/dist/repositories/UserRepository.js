"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async create(data) {
        return await prisma.user.create({ data });
    }
    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }
    async findByCpf(cpf) {
        return await prisma.user.findUnique({ where: { cpf } });
    }
}
exports.UserRepository = UserRepository;
