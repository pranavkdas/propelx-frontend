"use client"
import { useCallback, useRef, useEffect } from 'react';
import {
    ReactFlow, ReactFlowProvider, useReactFlow, Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { DnDProvider, useDnD } from './DnDContext';
import styles from './experiment.module.css'
import Sidebar from './Sidebar';

import hypothesisNode from './_custom_nodes/hypothesisNode';
import productNode from './_custom_nodes/productNode';
import targetAudienceNode from './_custom_nodes/targetAudienceNode'
import marketingChannelNode from './_custom_nodes/marketingChannelNode'
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import ConnectionLine from './_custom_nodes/ConnectionLine';
import { getNodesOfExperiment, getEdgesOfExperiment, setProductNode } from "@/lib/store/features/newExperiment/newExperimentSlice";
import getLayoutedElements from './dagreGraphHelper'

const edgeOptions = {
    animated: true,
    style: {
        stroke: 'black',
    },
};

const nodeTypes = { hypothesisNode: hypothesisNode, productNode: productNode, targetAudienceNode: targetAudienceNode, marketingChannelNode: marketingChannelNode };

let nodeId = 0;

function Flow() {
    const { screenToFlowPosition, setViewport } = useReactFlow();

    const reactFlowWrapper = useRef(null);
    const defaultNodes = useAppSelector(getNodesOfExperiment)
    const defaultEdges = useAppSelector(getEdgesOfExperiment)
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
    const [type, _, data, __] = useDnD();

    //temp
    const dispatch = useAppDispatch();

    const getId = () => `dndnode_${nodeId++}`;

    const onConnect = useCallback(
        // add     type: 'smoothstep', in edges
        (params) => { console.log('params', params); setEdges((eds) => addEdge(params, eds)); },
        [],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    useEffect(() => {
        console.log("Default Nodes:", defaultNodes);
        console.log("Default Edges:", defaultEdges);

        if (defaultNodes.length === 0) {
            console.log('inside')
            dispatch(setProductNode());
        }

        const { nodes, edges } = getLayoutedElements(
            defaultNodes,
            defaultEdges,
            'LR'
        );

        setNodes(nodes)
        setEdges(edges)

        // setViewport({ x: 250, y: 25, zoom: 0.5 }, { duration: 200 });
        setViewport({ x: 250, y: 25, zoom: 0.5 });

    }, [defaultNodes, defaultEdges])

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            // console.log(event.dataTransfer.getData(
            //     'application/reactflow'
            // ))
            // console.log('insideDrop', type, data)
            // check if the dropped element is valid
            if (!type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: data,
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ minZoom: 0.1, duration: 800 }}
            connectionLineComponent={ConnectionLine}
        >

            <Controls position="top-left" />
            <MiniMap
                position="bottom-left"
                className="!bg-background"
                zoomable
                pannable
            />
            <Background
                //@ts-ignore
                variant="dots"
                gap={12}
                size={1}
                style={{ backgroundColor: '#F5F5F5' }}
            // #F5FFFA - mint cream
            />
        </ReactFlow >
    );
}

export default function () {
    const reactFlowWrapper = useRef(null);
    return (
        <div className={styles.dndflow} >
            <ResizablePanelGroup direction="horizontal"
                className="border rounded-lg h-full">
                <ResizablePanel
                    defaultSize={25}
                    className="h-full relative"
                >
                    <div className={styles.reactflow_wrapper} ref={reactFlowWrapper}>
                        <Flow />
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                    defaultSize={10}
                    className="p-4 border-l h-full relative"
                >
                    <Sidebar />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div >
    );
}
