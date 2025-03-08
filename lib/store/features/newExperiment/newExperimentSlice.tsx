import { createAppSlice } from "@/lib/store/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    type Node,
    type Edge,
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { generateInitialHypotheses, generateTargetAudienceForHypothesis } from '@/lib/store/features/newExperiment/newExperimentAPI'

import { NewExperimentState, SourceNodeId, initialState, CurrentExperimentState } from '@/lib/store/features/newExperiment/newExperimentConstants'

const edgeType = 'simplebezier';

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
                        data: { hypothesis: 'super hypothesis' },
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
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        getNewExperimentName: (state: CurrentExperimentState) => { // not really required
            const { experimentName, productName } = state;
            return { 'experimentName': experimentName, 'productName': productName }
        },
        getNodesOfExperiment: (state: CurrentExperimentState) => state.nodes,
        getEdgesOfExperiment: (state: CurrentExperimentState) => state.edges,
        isHypothesisListLoading: (state: CurrentExperimentState) => state.hypothesisListLoading,
        isTargetAudienceLoading: (state: CurrentExperimentState) => state.targetAudienceLoading,
    }
});

// Action creators are generated for each case reducer function.
export const { addNewExperiment, setProductNode, generateThreeHypothesisNodes, generateTargetAudienceNode, generateMarketingChannelNode } =
    newExperimentSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getNewExperimentName, getNodesOfExperiment, getEdgesOfExperiment, isHypothesisListLoading, isTargetAudienceLoading } = newExperimentSlice.selectors;
