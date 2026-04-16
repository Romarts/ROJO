import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criando uma categoria inicial
  const categoria = await prisma.category.upsert({
    where: { nome: 'Masculino' },
    update: {},
    create: { nome: 'Masculino' },
  });

// 1. Criar o Noir Absolu
await prisma.product.create({
  data: {
    nome: 'Noir Absolu',
    preco: 489.0,
    descricao: 'Perfume importado marcante',
    categoryId: categoria.id,
  },
});

// 2. Criar o Rouge Intense
await prisma.product.create({
  data: {
    nome: 'Rouge Intense',
    preco: 529.0,
    descricao: 'Fragrância unissex sofisticada',
    categoryId: categoria.id, 
  },
});

// 3. Criar o Fleur Délicate
await prisma.product.create({
  data: {
    nome: 'Fleur Délicate',
    preco: 399.0,
    descricao: 'Toque floral delicado e feminino',
    categoryId: categoria.id,
  },
});

// 4. Criar o Jardin Secret
await prisma.product.create({
  data: {
    nome: 'Jardin Secret',
    preco: 459.0,
    descricao: 'Fragrância unissex inspirada em jardins',
    categoryId: categoria.id,
  },
});

  console.log('✅ Banco de dados populado!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());