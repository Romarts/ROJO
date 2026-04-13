import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

export class UserController {
  
  // Função de Cadastro (Respeitando as 10 linhas)
  async register(req: Request, res: Response) {
    try {
      const { nome, email, cpf, senha } = req.body;
      const senhaHash = await bcrypt.hash(senha, 10);

      const user = await prisma.user.create({
        data: { nome, email, cpf, senha: senhaHash }
      });

      return res.status(201).json({ mensagem: "Usuário criado com sucesso!", id: user.id });
    } catch (error) {
      return res.status(400).json({ mensagem: "E-mail ou CPF já cadastrados." });
    }
  }

  // Função de Login
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && await bcrypt.compare(senha, user.senha)) {
      // Aqui depois geramos o JWT
      return res.json({ mensagem: "Logado!", user: { nome: user.nome, email: user.email } });
    }

    return res.status(401).json({ mensagem: "Credenciais inválidas." });
  }
}