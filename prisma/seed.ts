import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create 5 marketing experiments
  for (let i = 0; i < 5; i++) {
    const experiment = await prisma.marketingExperiment.create({
      data: {
        hypothesisId: faker.string.uuid(),
        hypothesis: faker.lorem.sentence(),
        hypothesisAlias: `hypothesisalias_${i + 1}`,
        rationale: faker.lorem.paragraph(),
        targetAudienceDescription: faker.lorem.sentence(),
        targetAudienceAlias: faker.word.noun(),
        confidenceScore: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        effortLevel: faker.helpers.arrayElement(["Low", "Medium", "High"]),
        startDate: faker.date.recent({ days: 30 }),
        endDate: faker.date.future(),
        channels: ["META", "GOOGLE"], // Both channels
      },
    });

    // Create time series metrics for the last 10 days
    for (let j = 0; j < 10; j++) {
      for (const channel of ["META", "GOOGLE"]) {
        await prisma.marketingMetrics.create({
          data: {
            experimentId: experiment.id,
            channel: channel as "META" | "GOOGLE",
            date: faker.date.recent({ days: 10 }),
            clicks: faker.number.int({ min: 10, max: 500 }),
            impressions: faker.number.int({ min: 1000, max: 10000 }),
            roi: faker.number.float({ min: 0.5, max: 5.0, precision: 0.01 }),
            cpc: faker.number.float({ min: 0.1, max: 5.0, precision: 0.01 }),
            cost: faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
            conversions: faker.number.int({ min: 1, max: 50 }),
          },
        });
      }
    }
  }

  console.log("Seeding complete! ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
