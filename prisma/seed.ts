import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "../lib/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@pegacupom.com",
    },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@pegacupom.com",
      password,
      role: UserRole.ADMIN,
    },
  });

  console.log("✅ Usuário administrador criado.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
