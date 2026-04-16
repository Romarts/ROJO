import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
    async create(data: any) {
        return await prisma.user.create({ data });
    }

    async findByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    }

    async findByCpf(cpf: string) {
        return await prisma.user.findUnique({ where: { cpf } });
    }
}