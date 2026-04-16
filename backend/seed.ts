import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criando uma categoria inicial
  const categoria = await prisma.category.upsert({
    where: { nome: 'Masculino' },
    update: {},
    create: { nome: 'Masculino' },
  });

  // Criando um produto vinculado a essa categoria
  await prisma.product.create({
    data: {
      nome: 'Noir Absolu',
      preco: 489.0,
      descricao: 'Perfume importado marcante',
      categoryId: categoria.id,
    },
  });

  console.log('✅ Banco de dados populado!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());