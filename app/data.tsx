export type MarketingChannel = "META" | "GOOGLE";
export type EffortLevel = "low" | "medium" | "high";
export type MarketingHypothesis = {
  id: string;
  hypothesis: string;
  hypothesisAlias: string;
  rationale: string;
  channels: MarketingChannel[];
  targetAudience: {
    description: string;
    alias: string;
  };
  estimatedImpact: {
    confidence: number;
    effort: EffortLevel;
  };
  selected: boolean;
};

export interface LabelOfNodeProps {
    heading: 'hypothesis' | 'rationale' | 'channels' | 'targetAudience';
    data: MarketingHypothesis;
    params?: {
        position?: number;
        [key: string]: any;
    };
}

export interface LabelOfCopyOrUploadProps {
    data: MarketingHypothesis;
}

export const nodeColors = {
    base: "#E1D5E7", // Light Indigo
    channels: "#D5E8D4", // Light Green
    rationale: "#FFF2CC", // Light Yellow
    hypothesis: "#DAE8FC", // Light Blue
    copyEverythingOrUpload: "#FFE6CC", // Light Pink
    targetAudience: "#F8CECC", // Light Purple
}

const marketingHypothesesData: MarketingHypothesis[] = [
    {
        id: "mh1",
        hypothesis: "Increasing ad spend on Meta will boost engagement by 20%.",
        hypothesisAlias:"1",
        rationale: "Meta's audience targeting features allow for precise reach, especially among younger demographics.",
        channels: ["META", "GOOGLE"],
        targetAudience: {
            description: "Tech-savvy millennials interested in online learning",
            alias: "OnlineLearners"
        },
        estimatedImpact: {
            confidence: 0.8,
            effort: "medium"
        },
        selected: true,

    },
    {
        id: "mh2",
        hypothesis: "Optimizing Google Ads copy will increase click-through rates by 15%.",
        hypothesisAlias:"2",
        rationale: "Clearer CTAs and keyword-aligned headlines perform better on search campaigns.",
        channels: ["GOOGLE"],
        targetAudience: {
            description: "Professionals searching for productivity software",
            alias: "ProductivitySeekers"
        },
        estimatedImpact: {
            confidence: 0.7,
            effort: "low"
        },
        selected: true,
    },
    {
        id: "mh3",
        hypothesis: "Running cross-platform campaigns on both Meta and Google will increase sales by 25%.",
        hypothesisAlias:"3",
        rationale: "A combined strategy ensures brand visibility across social and search channels.",
        channels: ["META", "GOOGLE"],
        targetAudience: {
            description: "Small business owners looking for affordable marketing tools",
            alias: "SMBs"
        },
        estimatedImpact: {
            confidence: 0.9,
            effort: "high"
        },
        selected: true,
    },
];

export default marketingHypothesesData;