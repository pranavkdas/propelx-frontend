import { NextApiRequest, NextApiResponse } from 'next';
import { MarketingHypothesis } from '@/lib/types';
import { MarketingExperimentService } from '@/app/actions/database-services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const selectedHypotheses = req.body as MarketingHypothesis[];
    const experimentService = new MarketingExperimentService();
    
    await experimentService.clearPreviousExperiments();
    await Promise.all(
      selectedHypotheses.map(hypothesis => 
        experimentService.createExperiment(hypothesis)
      )
    );

    res.status(200).json({ message: 'Experiments created successfully' });
  } catch (error) {
    console.error('Error in experiments API:', error);
    res.status(500).json({ message: 'Failed to create experiments' });
  }
}