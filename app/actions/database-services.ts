import { PrismaClient } from '@prisma/client';
import { addDays } from 'date-fns';
import { MarketingHypothesis, MarketingChannel } from '@/lib/types';
import { MetricsGenerator } from '@/lib/metrics-generator';

export class MarketingExperimentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async clearPreviousExperiments(): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.marketingMetrics.deleteMany({}),
      this.prisma.marketingExperiment.deleteMany({}),
    ]);
  }

  async createExperiment(hypothesis: MarketingHypothesis): Promise<void> {
    const experiment = await this.prisma.marketingExperiment.create({
      data: {
        hypothesisId: hypothesis.id,
        hypothesis: hypothesis.hypothesis,
        rationale: hypothesis.rationale,
        targetAudienceDescription: hypothesis.targetAudience.description,
        targetAudienceAlias: hypothesis.targetAudience.alias,
        confidenceScore: hypothesis.estimatedImpact.confidence,
        effortLevel: hypothesis.estimatedImpact.effort,
        startDate: new Date(),
        endDate: addDays(new Date(), 14),
      },
    });

    await this.generateMetricsForExperiment(experiment.id, hypothesis.channels);
  }

  private async generateMetricsForExperiment(
    experimentId: string,
    channels: MarketingChannel[]
  ): Promise<void> {
    const metricsPromises = channels.flatMap(channel =>
      Array.from({ length: 14 }, (_, day) => {
        const date = addDays(new Date(), day);
        const metrics = MetricsGenerator.generateDailyMetrics();
        const roi = MetricsGenerator.calculateROI(metrics);
        const cpc = MetricsGenerator.calculateCPC(metrics);

        return this.prisma.marketingMetrics.create({
          data: {
            experimentId,
            channel,
            date,
            clicks: metrics.clicks,
            impressions: metrics.impressions,
            roi,
            cpc,
            cost: metrics.cost,
            conversions: metrics.conversions,
          },
        });
      })
    );

    await Promise.all(metricsPromises);
  }
}