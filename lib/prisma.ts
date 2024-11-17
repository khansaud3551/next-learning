import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  console.log(
    "Production environment detected. Creating a new PrismaClient instance."
  );
} else {
  if (!global.prisma) {
    console.log(
      "Development environment detected and kno global PrismaClient instance found. Creating a new PrismaClient instance."
    );
    global.prisma = new PrismaClient();
  }
  console.log(
    "Development environment detectsed and existing global PrismaClient instance found. Reusing the PrismaClient instance."
  );
  prisma = global.prisma;
}

export default prisma;
