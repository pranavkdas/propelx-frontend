import React from 'react';
import { useState } from "react";
import { useDnD } from './DnDContext';
import styles from './experiment.module.css'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EditorCanvasDefaultCardTypes } from '@/lib/constants'
import { EditorCanvasTypes, EditorNodeType } from '@/lib/types'
import EditorCanvasIconHelper from './editor-canvas-icon-helper'

export default () => {
    const [_, setType, __, setData] = useDnD();
    const [hypothesis, setHypothesis] = useState("")

    console.log(useDnD());

    const onDragStart = (event, nodeType) => {
        console.log('onDragState', nodeType)
        setType(nodeType);
        event.dataTransfer.setData('application/reactflow', nodeType)
        setData({ 'hypothesis': 'jjg' });
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="h-full flex flex-col gap-4 p-4">
            <div className='flex flex-row gap-4'>
                <Button>
                    Save
                </Button>
                <Button>
                    Publish
                </Button>
            </div>
            <Separator className='my-4' />
            {Object.entries(EditorCanvasDefaultCardTypes)
                .map(([cardKey, cardValue]) => (
                    <Card
                        key={cardKey}
                        draggable
                        className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                        onDragStart={(event) =>
                            onDragStart(event, cardKey as EditorCanvasTypes)
                        }
                    >
                        <CardHeader className="flex flex-row items-center gap-4 p-4">
                            <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                            <CardTitle className="text-md">
                                {cardValue.name}
                                <CardDescription>{cardValue.description}</CardDescription>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                ))}
        </aside>
    );
};