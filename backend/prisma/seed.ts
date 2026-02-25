import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.liveSessionParticipant.deleteMany(),
    prisma.liveSession.deleteMany(),
    prisma.billSettlement.deleteMany(),
    prisma.billPayment.deleteMany(),
    prisma.itemConsumer.deleteMany(),
    prisma.item.deleteMany(),
    prisma.billParticipant.deleteMany(),
    prisma.bill.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const user = await prisma.user.create({
    data: {
      name: "Matheus Sousa",
      email: "matheus@example.com",
      passwordHash: "hash_demo",
    },
  });

  const contact1 = await prisma.contact.create({
    data: {
      userId: user.id,
      name: "Ana Lima",
      phone: "+55 11 99999-0000",
    },
  });

  const contact2 = await prisma.contact.create({
    data: {
      userId: user.id,
      name: "Bruno Alves",
    },
  });

  const bill = await prisma.bill.create({
    data: {
      createdById: user.id,
      placeName: "Bar do Zeca",
      date: new Date(),
      totalWithoutFees: new Prisma.Decimal("120.00"),
      totalWithFees: new Prisma.Decimal("138.00"),
      serviceFeePercent: new Prisma.Decimal("10.00"),
      tipPercent: new Prisma.Decimal("5.00"),
      extraFeeValue: new Prisma.Decimal("0.00"),
    },
  });

  const participantUser = await prisma.billParticipant.create({
    data: {
      billId: bill.id,
      userId: user.id,
      displayName: "Matheus",
    },
  });

  const participantContact1 = await prisma.billParticipant.create({
    data: {
      billId: bill.id,
      contactId: contact1.id,
      displayName: "Ana",
    },
  });

  const participantContact2 = await prisma.billParticipant.create({
    data: {
      billId: bill.id,
      contactId: contact2.id,
      displayName: "Bruno",
    },
  });

  const item1 = await prisma.item.create({
    data: {
      billId: bill.id,
      name: "Cerveja",
      price: new Prisma.Decimal("12.00"),
      quantity: 4,
    },
  });

  const item2 = await prisma.item.create({
    data: {
      billId: bill.id,
      name: "Porção",
      price: new Prisma.Decimal("60.00"),
      quantity: 1,
    },
  });

  await prisma.itemConsumer.createMany({
    data: [
      { itemId: item1.id, participantId: participantUser.id },
      { itemId: item1.id, participantId: participantContact1.id },
      { itemId: item1.id, participantId: participantContact2.id },
      { itemId: item2.id, participantId: participantUser.id },
      { itemId: item2.id, participantId: participantContact1.id },
    ],
  });

  await prisma.billPayment.create({
    data: {
      billId: bill.id,
      participantId: participantUser.id,
      paidValue: new Prisma.Decimal("138.00"),
    },
  });

  await prisma.billSettlement.createMany({
    data: [
      {
        billId: bill.id,
        participantId: participantUser.id,
        amountDue: new Prisma.Decimal("-46.00"),
      },
      {
        billId: bill.id,
        participantId: participantContact1.id,
        amountDue: new Prisma.Decimal("23.00"),
      },
      {
        billId: bill.id,
        participantId: participantContact2.id,
        amountDue: new Prisma.Decimal("23.00"),
      },
    ],
  });

  const liveSession = await prisma.liveSession.create({
    data: {
      billId: bill.id,
      sessionCode: "ZECA123",
      isActive: true,
    },
  });

  await prisma.liveSessionParticipant.createMany({
    data: [
      { sessionId: liveSession.id, userId: user.id },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed completed");
  })
  .catch((err) => {
    console.error("Seed failed", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
