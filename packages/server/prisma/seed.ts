import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');

  await prisma.case.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding database...');

  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'hashed_password_here',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'hashed_password_here',
    },
  });

  await prisma.case.create({
    data: {
      title: 'Website Not Loading',
      description: 'Users are reporting that the website is not loading properly.',
      status: 'OPEN',
      createdBy: user1.id,
      assignedTo: user2.id,
    },
  });

  await prisma.case.create({
    data: {
      title: 'Email Notifications Not Working',
      description: 'Email notifications are not being sent to users.',
      status: 'IN_PROGRESS',
      createdBy: user2.id,
      assignedTo: user1.id,
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
