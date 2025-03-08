'use server'

import { MetricsGenerator } from '@/lib/metrics-generator'
import { prisma } from '@/lib/prisma'
import { MarketingChannel, MarketingHypothesis } from '@/lib/types'
import { addDays } from 'date-fns'

export async function createExperiment(selectedHypotheses: MarketingHypothesis[]) {
  try {
    // Clear previous data
    console.log("deleting old entries");
    await prisma.$transaction([
      prisma.marketingMetrics.deleteMany({}),
      prisma.marketingExperiment.deleteMany({}),
    ])

    // Create new experiments and metrics
    for (const hypothesis of selectedHypotheses) {
      if (!selectedHypotheses || selectedHypotheses.length === 0) {
        throw new Error("No hypotheses selected for the experiment.");
      }
      console.log("Processing hypothesis:", hypothesis);

     
      // Ensure you include channels in the experiment creation
      const experiment = await prisma.marketingExperiment.create({
        data: {
          hypothesisId: hypothesis.id,
          hypothesis: hypothesis.hypothesis,
          hypothesisAlias: hypothesis.hypothesisAlias,
          rationale: hypothesis.rationale,
          targetAudienceDescription: hypothesis.targetAudience.description,
          targetAudienceAlias: hypothesis.targetAudience.alias,
          confidenceScore: hypothesis.estimatedImpact.confidence,
          effortLevel: hypothesis.estimatedImpact.effort,
          startDate: new Date(),
          endDate: addDays(new Date(), 14),
          channels: hypothesis.channels.map((channel) => channel.toUpperCase() as MarketingChannel), // ✅ Corrected
        },
      });
      
      // Generate metrics for each channel
      if (!hypothesis.channels || hypothesis.channels.length === 0) {
        throw new Error(`Hypothesis ${hypothesis.id} has no assigned channels.`);
      }
      
      // For each channel, convert to uppercase:
for (const channel of hypothesis.channels.map((ch) => ch.toUpperCase())) {
  const metricsPromises = Array.from({ length: 14 }, (_, day) => {
    const date = addDays(new Date(), day);
    let metrics = MetricsGenerator.generateDailyMetrics();
    if (!metrics) {
      console.warn(`MetricsGenerator returned null for hypothesis ${hypothesis.id} on day ${day}. Using default values.`);
      metrics = { clicks: 0, impressions: 0, cost: 0, conversions: 0 };
    }
    const roi = MetricsGenerator.calculateROI(metrics);
    const cpc = MetricsGenerator.calculateCPC(metrics);

    return prisma.marketingMetrics.create({
      data: {
        experimentId: experiment.id,
        channel: channel.toUpperCase() as MarketingChannel, // ✅ Convert & cast
        date,
        clicks: metrics.clicks,
        impressions: metrics.impressions,
        roi,
        cpc,
        cost: metrics.cost,
        conversions: metrics.conversions,
      },
    });
    
  });

  await Promise.all(metricsPromises);
}

    }

    return { success: true }
  } catch (error) {
    console.error('Error in createExperiment:', error)
    return { success: false, error: 'Failed to create experiment' }
  }
}
