export interface NewHypothesisState {
    hypothesisDescription: string;
    alias: string;
    rationale: string;
    estimatedImpact: number;
    estimatedConfidence: number;
}

export interface NewExperimentState {
    experimentName: string;
    productName: string;
    productDescription: string;
    marketingObjective: "Awareness" | "Sales" | null;
}

export interface CurrentExperimentState extends NewExperimentState {
    nodes: Array<Node>,
    edges: Array<Edge>,
    hypothesisList: Array<NewHypothesisState>,
    data: any
    hypothesisListLoading: boolean,
    targetAudienceLoading: boolean,
    error: any,
}

const initialState: CurrentExperimentState = {
    experimentName: "",
    productName: 'Chandrike',
    productDescription: "Test",
    marketingObjective: "Sales",
    nodes: [],
    edges: [],
    hypothesisList: [],
    data: {},
    hypothesisListLoading: false,
    targetAudienceLoading: false,
    error: null,
};


export interface SourceNodeId {
    sourceNodeId: string;
}



// export const initialState: CurrentExperimentState = {

//     experimentName: '',
//     productName: 'Chandrike',
//     productDescription: 'Test',
//     marketingObjective: 'Sales',
//     nodes: [
//         {
//             id: 'product_node',
//             type: 'productNode',
//             data: {
//                 productName: 'Chandrike'
//             },
//             position: {
//                 x: 250,
//                 y: 25
//             }
//         },
//         {
//             id: 'hypothesis_node_0',
//             type: 'hypothesisNode',
//             data: {
//                 hypothesis: 'Utilizing influencer partnerships on Instagram will increase product awareness by at least 20% among target demographics.',
//                 alias: 'Influencer Collaboration Impact',
//                 rationale: 'Influencer marketing has proven effective in reaching targeted demographics by leveraging the trust and connection that influencers have built with their audience. By collaborating with influencers whose followers match the target audience, it\'s possible to significantly boost product visibility and awareness.',
//                 estimatedImpact: 0.7,
//                 estimatedEffort: 'medium'
//             },
//             position: {
//                 x: 250,
//                 y: 25
//             }
//         },
//         {
//             id: 'hypothesis_node_1',
//             type: 'hypothesisNode',
//             data: {
//                 hypothesis: 'Implementing a Google Ads campaign focused on product-specific keywords will lead to a 15% increase in site traffic and a 10% increase in conversion rate.',
//                 alias: 'Keyword-Focused Google Ads',
//                 rationale: 'Google Ads allows for precise targeting through keyword selection, making it effective for reaching consumers actively searching for similar products. By capitalizing on product-specific keywords, the likelihood of converting engaged searchers into customers is increased.',
//                 estimatedImpact: 0.8,
//                 estimatedEffort: 'medium'
//             },
//             position: {
//                 x: 250,
//                 y: 25
//             }
//         },
//         {
//             id: 'hypothesis_node_2',
//             type: 'hypothesisNode',
//             data: {
//                 hypothesis: 'Launching an engaging video ad campaign on Facebook targeting middle-aged consumers will increase their brand perception and engagement by 25%.',
//                 alias: 'Video Ad Engagement Boost',
//                 rationale: 'Video content is particularly effective on social media for capturing attention and conveying brand messages succinctly. Targeting middle-aged consumers on Facebook can enhance their perception and engagement, leveraging the platform\'s strong placement capabilities and demographic reach.',
//                 estimatedImpact: 0.6,
//                 estimatedEffort: 'high'
//             },
//             position: {
//                 x: 250,
//                 y: 25
//             }
//         },
//         {
//             id: 'a2a2a987-47d6-4334-873b-161b3c913906',
//             type: 'targetAudienceNode',
//             data: {
//                 alias: 'Gen Z and Millennial Tech Enthusiasts',
//                 description: 'This group consists primarily of tech-savvy individuals aged 18-34 who are highly active on social media platforms, especially Instagram. They have a keen interest in new tech products and are influenced by online reviews and recommendations from popular influencers. These individuals are early adopters, enjoy staying updated with the latest tech trends, and often look to social media to discover new and innovative products that align with their digital lifestyles. They value authenticity and transparency from brands and are likely to engage with content that feels relatable and trustworthy.'
//             },
//             position: {
//                 x: 250,
//                 y: 25
//             }
//         },
//         {
//             id: '5f6a94d6-6255-4868-94c0-7cafd2a156c3',
//             type: 'targetAudienceNode',
//             data: {
//                 alias: 'Tech-Savvy Consumers',
//                 description: 'This demographic consists of tech-savvy consumers, primarily ages 25-45, who actively use search engines for discovering new and relevant technology-focused products like Chandrike. They are more likely to respond to targeted Google Ads and exhibit behaviors such as frequent online shopping, comparing products across different platforms, and engaging with tech reviews and forums. They prioritize efficiency, functionality, and user reviews when evaluating tech products, and are likely to convert if they perceive value and relevance in the product offerings highlighted through specific keywords. This audience includes both early adopters seeking the latest tech innovations and informed buyers looking for reliable upgrades. These individuals are typically professionals with disposable income, likely to make purchasing decisions based on strategic and informative advertising. They tend to reside in urban or suburban areas with access to high-speed internet and are familiar with making informed purchasing decisions online.'
//             },
//             position: {
//                 x: 250,
//                 y: 25
//             }
//         },
//         {
//             id: '87ca9016-cddc-45b6-94df-31d9cb4229ab',
//             type: 'targetAudienceNode',
//             data: {
//                 alias: 'Middle-aged Social Media Users',
//                 description: 'The campaign is primarily targeting middle-aged consumers, specifically individuals aged 35-54, who are active users of social media platforms such as Facebook. This demographic often has disposable income and is known to increasingly rely on digital platforms for information and entertainment. They value engaging and captivating content, making video ads a suitable medium for capturing their attention. These consumers are typically looking for products and services that resonate well with their lifestyle and provide value, and are likely to appreciate thoughtful and well-crafted marketing messages. The targeting focuses on those who use Facebook regularly, as this platform is a key channel for reaching and interacting with this age group effectively.'
//             },
//             position: {
//                 x: 250,
//                 y: 25
//             }
//         }
//     ],
//     edges: [
//         {
//             id: 'hypothesis_product_edge_0',
//             source: 'product_node',
//             target: 'hypothesis_node_0',
//             type: 'simplebezier',
//             animated: true
//         },
//         {
//             id: 'hypothesis_product_edge_1',
//             source: 'product_node',
//             target: 'hypothesis_node_1',
//             type: 'simplebezier',
//             animated: true
//         },
//         {
//             id: 'hypothesis_product_edge_2',
//             source: 'product_node',
//             target: 'hypothesis_node_2',
//             type: 'simplebezier',
//             animated: true
//         },
//         {
//             id: '4eac79c8-290b-4063-8722-28587fabc2ec',
//             source: 'hypothesis_node_0',
//             target: 'a2a2a987-47d6-4334-873b-161b3c913906',
//             type: 'simplebezier',
//             animated: true
//         },
//         {
//             id: 'd0d4f10f-255c-4870-8fbf-b403e989dc05',
//             source: 'hypothesis_node_1',
//             target: '5f6a94d6-6255-4868-94c0-7cafd2a156c3',
//             type: 'simplebezier',
//             animated: true
//         },
//         {
//             id: '5731dcca-17ef-44cc-9e97-dda5ea0cc01e',
//             source: 'hypothesis_node_2',
//             target: '87ca9016-cddc-45b6-94df-31d9cb4229ab',
//             type: 'simplebezier',
//             animated: true
//         }
//     ],
//     hypothesisList: [],
//     data: {
//         hypothesis_list: [
//             {
//                 id: 'H1',
//                 hypothesis: 'Utilizing influencer partnerships on Instagram will increase product awareness by at least 20% among target demographics.',
//                 hypothesisAlias: 'Influencer Collaboration Impact',
//                 rationale: 'Influencer marketing has proven effective in reaching targeted demographics by leveraging the trust and connection that influencers have built with their audience. By collaborating with influencers whose followers match the target audience, it\'s possible to significantly boost product visibility and awareness.',
//                 channels: [
//                     'meta'
//                 ],
//                 targetAudience: {
//                     description: 'Socially-active individuals aged 18-34 interested in lifestyle and tech products.',
//                     alias: 'Young Adults & Gen Z'
//                 },
//                 estimatedImpact: {
//                     confidence: 0.7,
//                     effort: 'medium'
//                 },
//                 selected: true
//             },
//             {
//                 id: 'H2',
//                 hypothesis: 'Implementing a Google Ads campaign focused on product-specific keywords will lead to a 15% increase in site traffic and a 10% increase in conversion rate.',
//                 hypothesisAlias: 'Keyword-Focused Google Ads',
//                 rationale: 'Google Ads allows for precise targeting through keyword selection, making it effective for reaching consumers actively searching for similar products. By capitalizing on product-specific keywords, the likelihood of converting engaged searchers into customers is increased.',
//                 channels: [
//                     'google'
//                 ],
//                 targetAudience: {
//                     description: 'Consumers actively searching online for solutions related to [product category].',
//                     alias: 'Solution Seekers'
//                 },
//                 estimatedImpact: {
//                     confidence: 0.8,
//                     effort: 'medium'
//                 },
//                 selected: true
//             },
//             {
//                 id: 'H3',
//                 hypothesis: 'Launching an engaging video ad campaign on Facebook targeting middle-aged consumers will increase their brand perception and engagement by 25%.',
//                 hypothesisAlias: 'Video Ad Engagement Boost',
//                 rationale: 'Video content is particularly effective on social media for capturing attention and conveying brand messages succinctly. Targeting middle-aged consumers on Facebook can enhance their perception and engagement, leveraging the platform\'s strong placement capabilities and demographic reach.',
//                 channels: [
//                     'meta'
//                 ],
//                 targetAudience: {
//                     description: 'Middle-aged consumers interested in family-oriented products and services.',
//                     alias: 'Family Focused Consumers'
//                 },
//                 estimatedImpact: {
//                     confidence: 0.6,
//                     effort: 'high'
//                 },
//                 selected: true
//             }
//         ],
//         target_audience_list: {
//             sourceNodeId: 'hypothesis_node_2',
//             target_audience_nodeId: '87ca9016-cddc-45b6-94df-31d9cb4229ab',
//             target_audience_edgeId: '5731dcca-17ef-44cc-9e97-dda5ea0cc01e',
//             targetAudienceAlias: 'Middle-aged Social Media Users',
//             targetAudienceDescription: 'The campaign is primarily targeting middle-aged consumers, specifically individuals aged 35-54, who are active users of social media platforms such as Facebook. This demographic often has disposable income and is known to increasingly rely on digital platforms for information and entertainment. They value engaging and captivating content, making video ads a suitable medium for capturing their attention. These consumers are typically looking for products and services that resonate well with their lifestyle and provide value, and are likely to appreciate thoughtful and well-crafted marketing messages. The targeting focuses on those who use Facebook regularly, as this platform is a key channel for reaching and interacting with this age group effectively.'
//         }
//     },
//     hypothesisListLoading: false,
//     targetAudienceLoading: false,
//     error: null
// }