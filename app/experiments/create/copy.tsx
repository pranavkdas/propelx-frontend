"use client"
import { useCallback, useRef } from 'react';
import {
    ReactFlow, ReactFlowProvider, useReactFlow, Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { DnDProvider, useDnD } from './DnDContext';

const edgeOptions = {
    animated: true,
    style: {
        stroke: 'black',
    },
};

const defaultEdges = [{ id: 'ea-b', source: 'a', target: 'b' }];
const defaultNodes = [
    {
        id: 'a',
        type: 'input',
        data: { label: 'Node A' },
        position: { x: 250, y: 25 },
    },

    {
        id: 'b',
        data: { label: 'Node B' },
        position: { x: 100, y: 125 },
    },
    {
        id: 'c',
        type: 'output',
        data: { label: 'Node C' },
        position: { x: 250, y: 250 },
    },
];

// const connectionLineStyle = { stroke: 'black' };

let nodeId = 0;

function Flow() {
    const reactFlowInstance = useReactFlow();
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
    const [type] = useDnD();

    const getId = () => `dndnode_${nodeId++}`;

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance.screenToFlowPosition, type],
    );

    return (
        // <div ref={reactFlowWrapper}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
        >
            <Background />
            <Controls />
        </ReactFlow>
        // </div>
    );
}

export default function () {
    const [_, setType] = useDnD();

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <>
            <ResizablePanelGroup direction="horizontal"
                className="border rounded-lg h-full">
                <ResizablePanel
                    defaultSize={25}
                    className="h-full relative"
                >
                    <ReactFlowProvider>
                        <DnDProvider>
                            <Flow />
                        </DnDProvider>
                    </ReactFlowProvider >
                </ResizablePanel>

                <ResizableHandle />
                <ResizablePanel
                    defaultSize={10}
                    className="p-4 border-l h-full relative"
                >
                    <span className="text-lg font-medium">Insights</span>
                    <div draggable="true" className="drag bg-black" onDragStart={(event) => onDragStart(event, 'default')}>
                        Default Node
                    </div>
                </ResizablePanel>

            </ResizablePanelGroup>
        </>
    );
}
