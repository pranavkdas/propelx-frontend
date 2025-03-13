import React from 'react';
import { useState, useEffect } from "react";
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { generateSummaryOfAllBranches, isMarketingSummaryOfBranchLoading, getAllStrategySummary, deleteSummary, getAllBranches } from "@/lib/store/features/newExperiment/newExperimentSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { Copy, Check, Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import moment from 'moment';

export default () => {
    const [_, setType, __, setData] = useDnD();

    const onDragStart = (event, nodeType) => {
        console.log('onDragState', nodeType)
        setType(nodeType);
        event.dataTransfer.setData('application/reactflow', nodeType)
        setData({ 'hypothesis': 'jjg' });
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="h-full flex flex-col gap-4 p-4">
            {
                Object.entries(EditorCanvasDefaultCardTypes)
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
                    ))
            }
        </aside >
    );
};