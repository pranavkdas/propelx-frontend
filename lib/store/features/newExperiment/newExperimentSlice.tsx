import { createAppSlice } from "@/lib/store/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    type Node,
    type Edge,
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { generateInitialHypotheses, generateTargetAudienceForHypothesis, generateSummaryForBranch, generateSummaryForAllBranches } from '@/lib/store/features/newExperiment/newExperimentAPI'

import { NewExperimentState, SourceNodeId, initialState, CurrentExperimentState, edgeType } from '@/lib/store/features/newExperiment/newExperimentConstants'

// Given the following information, generate 3 hypothesis strictly in the given format.

// If you are not using async thunks you can use the standalone `createSlice`.
export const newExperimentSlice = createAppSlice({
    name: "newExperiment",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: (create) => ({
        addNewExperiment: create.reducer(
            (state, action: PayloadAction<NewExperimentState>) => {
                state.experimentName = action.payload.experimentName;
                state.productName = action.payload.productName;
                state.productDescription = action.payload.productDescription;
                state.marketingObjective = action.payload.marketingObjective;
            },
        ),
        setProductNode: create.reducer(
            (state) => {
                state.nodes.push(
                    {
                        id: 'product_node',
                        type: 'productNode',
                        data: { productName: state.productName },
                        position: { x: 250, y: 25 },
                    },
                )
            }
        ),
        generateMarketingChannelNode: create.reducer(
            (state, action: PayloadAction<SourceNodeId>) => {
                const marketing_channel_nodeId = uuidv4();
                const marketing_channel_edgeId = uuidv4();
                state.nodes.push(...[
                    {
                        id: marketing_channel_nodeId,
                        type: 'marketingChannelNode',
                        data: { marketingChannel: '' },
                        position: { x: 250, y: 25 },
                    }
                ]
                );
                state.edges.push(...[
                    {
                        id: marketing_channel_edgeId,
                        source: action.payload.sourceNodeId,
                        target: marketing_channel_nodeId,
                        type: edgeType,
                        animated: true,
                    }])
            }
        ),
        generateThreeHypothesisNodes: create.asyncThunk(
            // async (id: string, thunkApi) => { if you have things to pass to the function
            async (hypothesisFeedback, thunkAPI) => {
                const state = thunkAPI.getState();
                const hehe = await generateInitialHypotheses(state.productName, state.productDescription, state.marketingObjective, hypothesisFeedback)
                return hehe
            },
            {
                pending: (state) => {
                    state.hypothesisListLoading = true
                },
                rejected: (state, action) => {
                    // state.error = action.payload ?? action.error
                    state.error = action.error
                },
                fulfilled: (state, action) => {
                    state.data.hypothesis_list = action.payload
                    state.data.hypothesis_list.forEach((hypothesisObject, index) => {
                        state.nodes.push(...[
                            {
                                id: `hypothesis_node_${index}`,
                                type: 'hypothesisNode',
                                data: { hypothesis: hypothesisObject.hypothesis, alias: hypothesisObject.hypothesisAlias, rationale: hypothesisObject.rationale, estimatedImpact: hypothesisObject.estimatedImpact.confidence, estimatedEffort: hypothesisObject.estimatedImpact.effort },
                                position: { x: 250, y: 25 },
                            },
                        ]
                        );
                        state.edges.push(...[
                            {
                                id: `hypothesis_product_edge_${index}`,
                                source: 'product_node',
                                target: `hypothesis_node_${index}`,
                                type: edgeType,
                                animated: true,
                            }
                        ]
                        )
                    })
                },
                settled: (state, action) => {
                    state.hypothesisListLoading = false
                },
                // options: {
                //     idGenerator: uuid,
                // },
            }
        ),
        generateTargetAudienceNode: create.asyncThunk(
            // async (id: string, thunkApi) => { if you have things to pass to the function
            async (data, thunkAPI) => {
                // Generate IDs here
                const target_audience_nodeId = uuidv4();
                const target_audience_edgeId = uuidv4();

                const state = thunkAPI.getState();
                const hypothesisObject = state.newExperiment.nodes.find((hypothesis) => {
                    return hypothesis.id === data.sourceNodeId
                })

                const targetAudience = await generateTargetAudienceForHypothesis(state.newExperiment.productName, state.newExperiment.productDescription, state.newExperiment.marketingObjective, hypothesisObject.data)
                return { 'sourceNodeId': data.sourceNodeId, 'target_audience_nodeId': target_audience_nodeId, 'target_audience_edgeId': target_audience_edgeId, ...targetAudience }
            },
            {
                pending: (state) => {
                    state.targetAudienceLoading = true
                },
                rejected: (state, action) => {
                    state.error = action.error
                },
                fulfilled: (state, action) => {
                    state.data.target_audience_list = action.payload
                    state.nodes.push(...[
                        {
                            id: action.payload.target_audience_nodeId,
                            type: 'targetAudienceNode',
                            data: { alias: action.payload.targetAudienceAlias, description: action.payload.targetAudienceDescription },
                            position: { x: 250, y: 25 },
                        }
                    ]
                    );
                    state.edges.push(...[
                        {
                            id: action.payload.target_audience_edgeId,
                            source: action.payload.sourceNodeId,
                            target: action.payload.target_audience_nodeId,
                            type: edgeType,
                            animated: true,
                        }])
                },
                settled: (state, action) => {
                    state.targetAudienceLoading = false
                },
            }
        ),
        connectEdges: create.reducer(
            (state, action: PayloadAction<any>) => {
                const edgeId = uuidv4();
                // HANDLE THE CASE WHEN ONE OF THE NODES IS FREE AND OTHER IS CONNECTED. ALSO WHEN BOTH NODES ARE FREE.
                state.edges.push(...[
                    {
                        id: edgeId,
                        source: action.payload.sourceNodeId,
                        target: action.payload.targetNodeId,
                        type: edgeType,
                        animated: true,
                    }])
            }
        ),
        onDragNDropNode: create.reducer(
            (state, action: PayloadAction<any>) => {
                const nodeId = uuidv4();
                state.freeNodes.push(...[
                    {
                        id: nodeId,
                        type: action.payload.nodeType,
                        data: { hypothesis: '', alias: '', rationale: '', estimatedImpact: '', estimatedEffort: '' },
                        position: action.payload.position,
                    },
                ]
                );
            }
        ),
        generateSummaryOfTreeBranch: create.asyncThunk(
            // async (id: string, thunkApi) => { if you have things to pass to the function
            async (data, thunkAPI) => {
                // Generate IDs here
                const state = thunkAPI.getState()
                const nodeIdDict = state.newExperiment.nodes.reduce((nodeIdDict, node) => { nodeIdDict[node.id] = node; return nodeIdDict }, {})
                const edgeTargetIdSourceIdDict = state.newExperiment.edges.reduce((edgeTargetIdSourceIdDict, edge) => { edgeTargetIdSourceIdDict[edge.target] = edge.source; return edgeTargetIdSourceIdDict }, {})
                let sourceNodeId = data.sourceNodeId
                let summaryDataDict = []

                const lastNode = nodeIdDict[sourceNodeId]

                summaryDataDict.push({ [lastNode.type]: lastNode.data })

                while (true) {
                    const newSourceNodeId = edgeTargetIdSourceIdDict[sourceNodeId] ?? null;
                    if (!newSourceNodeId) break;
                    const sourceNode = nodeIdDict[newSourceNodeId] ?? null;
                    if (!sourceNode) break;
                    const nodeType = sourceNode.type
                    summaryDataDict.unshift({ [nodeType]: sourceNode.data })
                    sourceNodeId = newSourceNodeId;
                }

                let summaryData = ''
                summaryDataDict.forEach((item) => { summaryData += JSON.stringify(item) })


                const summary = await generateSummaryForBranch(summaryData)
                return summary
            },
            {
                pending: (state) => {
                    state.marketingSummaryOfBranchLoading = true
                },
                rejected: (state, action) => {
                    state.error = action.error
                },
                fulfilled: (state, action) => {
                    state.data.summary = action.payload
                },
                settled: (state, action) => {
                    state.marketingSummaryOfBranchLoading = false
                },
            }
        ),
        deleteSummary: create.reducer(
            (state) => {
                state.data.summary = null
            }
        ),
        setMarketingChannelForNode: create.reducer(
            (state, action: PayloadAction<any>) => {
                let sourceNodeId = action.payload.sourceNodeId
                let marketingChannel = action.payload.marketingChannel
                state.nodes.forEach((item) => { if (item.id === sourceNodeId) { item.data.marketingChannel = marketingChannel } })
            }
        ),
        generateSummaryOfAllBranches: create.asyncThunk(
            // async (id: string, thunkApi) => { if you have things to pass to the function
            async (data, thunkAPI) => {
                // Generate IDs here
                const state = thunkAPI.getState()
                const nodeIdDict = state.newExperiment.nodes.reduce((nodeIdDict, node) => { nodeIdDict[node.id] = node; return nodeIdDict }, {})
                const edgeTargetIdSourceIdDict = state.newExperiment.edges.reduce((edgeTargetIdSourceIdDict, edge) => { edgeTargetIdSourceIdDict[edge.target] = edge.source; return edgeTargetIdSourceIdDict }, {})
                let sourceNodeIdList = state.newExperiment.nodes.filter((node) => node.type == 'marketingChannelNode')
                let finalDetails = ''
                sourceNodeIdList.forEach((node) => {
                    let summaryDataDict = []
                    let sourceNodeId = node.id

                    const lastNode = nodeIdDict[sourceNodeId]

                    summaryDataDict.push({ [lastNode.type]: lastNode.data })

                    while (true) {
                        const newSourceNodeId = edgeTargetIdSourceIdDict[sourceNodeId] ?? null;
                        if (!newSourceNodeId) break;
                        const sourceNode = nodeIdDict[newSourceNodeId] ?? null;
                        if (!sourceNode) break;
                        const nodeType = sourceNode.type
                        summaryDataDict.unshift({ [nodeType]: sourceNode.data })
                        sourceNodeId = newSourceNodeId;
                    }

                    let summaryData = ''
                    summaryDataDict.forEach((item) => { summaryData += JSON.stringify(item) })

                    finalDetails = finalDetails + summaryData + '\n\n'
                })

                const summary = await generateSummaryForAllBranches(finalDetails)
                // return summary
                return summary
            },
            {
                pending: (state) => {
                    state.marketingSummaryOfBranchLoading = true
                },
                rejected: (state, action) => {
                    state.error = action.error
                },
                fulfilled: (state, action) => {
                    state.data.allStrategySummary = action.payload
                },
                settled: (state, action) => {
                    state.marketingSummaryOfBranchLoading = false
                },
            }
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        getNewExperimentName: (state: CurrentExperimentState) => { // not really required
            const { experimentName, productName } = state;
            return { 'experimentName': experimentName, 'productName': productName }
        },
        getNodesOfExperiment: (state: CurrentExperimentState) => state.nodes,
        getFreeNodesOfExperiment: (state: CurrentExperimentState) => state.freeNodes,
        getEdgesOfExperiment: (state: CurrentExperimentState) => state.edges,
        isHypothesisListLoading: (state: CurrentExperimentState) => state.hypothesisListLoading,
        isTargetAudienceLoading: (state: CurrentExperimentState) => state.targetAudienceLoading,
        isMarketingSummaryOfBranchLoading: (state: CurrentExperimentState) => state.marketingSummaryOfBranchLoading,
        getSummaryOfBranch: (state: CurrentExperimentState) => state.data.summary,
        getAllStrategySummary: (state: CurrentExperimentState) => state.data.allStrategySummary,
        getAllBranches: (state: CurrentExperimentState) => state.nodes.filter((node) => node.type == 'marketingChannelNode')
    }
});

// Action creators are generated for each case reducer function.
export const { addNewExperiment, setProductNode, generateThreeHypothesisNodes, generateTargetAudienceNode, generateMarketingChannelNode, connectEdges, onDragNDropNode, generateSummaryOfTreeBranch, deleteSummary, generateSummaryOfAllBranches, setMarketingChannelForNode } =
    newExperimentSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getNewExperimentName, getNodesOfExperiment, getEdgesOfExperiment, isHypothesisListLoading, isTargetAudienceLoading, getFreeNodesOfExperiment, isMarketingSummaryOfBranchLoading, getSummaryOfBranch, getAllStrategySummary, getAllBranches } = newExperimentSlice.selectors;
