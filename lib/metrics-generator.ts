import { MarketingHypothesis } from "./types";

export class MetricsGenerator {
    private static readonly AVERAGE_CONVERSION_VALUE = 50;
  
    static generateDailyMetrics(): DailyMetrics {
      return {
        clicks: Math.floor(Math.random() * 1000) + 100,
        impressions: Math.floor(Math.random() * 10000) + 1000,
        cost: Math.floor(Math.random() * 1000) + 100,
        conversions: Math.floor(Math.random() * 100) + 10,
      };
    }
  
    static calculateROI(metrics: { cost: number; conversions: number }): number {
      const revenue = metrics.conversions * this.AVERAGE_CONVERSION_VALUE;
      return ((revenue - metrics.cost) / metrics.cost) * 100;
    }
  
    static calculateCPC(metrics: { clicks: number; cost: number }): number {
      return metrics.cost / metrics.clicks;
    }
  }