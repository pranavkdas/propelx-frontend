"use client";

import React, { useState } from 'react';
import { ReactFlow, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MarketingHypothesis, LabelOfNodeProps, LabelOfCopyOrUploadProps, nodeColors } from '@/app/data';
import dagre from '@dagrejs/dagre';
import { Copy, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { generateSummary } from '@/app/actions/openai_function';
import { AnimatedSubscribeButton } from './magicui/animated-subscribe-button';


const GraphComponent: React.FC = ({ marketingHypothesesData }: MarketingHypothesis[]) => {
    const getLabelOfNode = ({ heading, data, params }: LabelOfNodeProps) => {

        function capitalizeFirstLetter(test_string: String) {
            return test_string.charAt(0).toUpperCase() + test_string.slice(1)
        }

        if (data) {

            if (heading == 'hypothesis') {
                return (
                    <div>
                        <div className="font-bold">Hypothesis</div>
                        <hr className="h-px mt-1 mb-2 bg-black border-0 dark:bg-gray-700"></hr>
                        <p><span className='font-bold'>Hypothesis:</span>  {data['hypothesis']}</p>
                        <p><span className='font-bold'>Estimated confidence:</span>  {data['estimatedImpact']['confidence']}</p>
                        <p><span className='font-bold'>Estimated effort:</span>  {data['estimatedImpact']['effort']}</p>
                    </div>
                );
            }
            else if (heading == 'rationale') {
                return (
                    <div >
                        <div className="font-bold">Rationale</div>
                        <hr className="h-px mt-1 mb-2 bg-black border-0 dark:bg-gray-700"></hr>
                        <p>{data['rationale']}</p>
                    </div >
                );
            }
            else if (heading == 'channels') {
                let position = params['position'];
                return (
                    <div>
                        <div className="font-bold">Channel</div>
                        <hr className="h-px mt-1 mb-2 bg-black border-0 dark:bg-gray-700"></hr>
                        <p>{capitalizeFirstLetter(data['channels'].at(position))}</p>
                    </div>
                );
            }
            else if (heading == 'targetAudience') {
                return (
                    <div>
                        <div className="font-bold">Target Audience</div>
                        <hr className="h-px mt-1 mb-2 bg-black border-0 dark:bg-gray-700"></hr>
                        <p> <span className='font-bold'> Alias:</span> {data['targetAudience']['alias']}</p>
                        <p> <span className='font-bold'>Description:</span> {data['targetAudience']['description']}</p>
                    </div>
                );
            };
        };
        return
    };

    const getLabelOfCopyOrUpload = ({ data }: LabelOfCopyOrUploadProps) => {

        const [open, setOpen] = useState(false);
        const [openUploadDialog, setOpenUploadDialog] = useState(false);

        const [copyText, setCopyText] = useState("");
        const [fileName, setUploadedFileName] = useState("")
        const { toast } = useToast()

        const onCopyClick = async () => {
            let response = await generateSummary('pranav: super')
            if (response) {
                setCopyText(response)
                setOpen(true)
            }
        }

        const onCopyToClipBoardClick = async () => {
            await navigator.clipboard.writeText(copyText);
        }

        function delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }


        const onChoosingFile = () => {
            let imageUpload = document.getElementById("imageUpload");
            let imageFileName = imageUpload?.files[0]?.name;
            if (imageFileName) { setUploadedFileName(imageFileName); }
        }

        const onClickUpload = async () => {
            await delay(3000);
            setUploadedFileName('');
            setOpenUploadDialog(false);
            toast({
                title: "File Uploaded successfully",
                description: "Friday, February 10, 2023 at 5:57 PM",
                action: (
                    <ToastAction altText="File Uploaded successfully">Undo</ToastAction>
                ),
            })

        }


        return (<div>
            <div className="font-bold">Actions</div>
            <hr className="h-px mt-1 mb-2 bg-black border-0 dark:bg-gray-700"></hr>
            <Dialog open={open} onOpenChange={setOpen}>
                <Button className="text-xs my-2 px-2 py-1" onClick={onCopyClick}>
                    <Copy /> Copy
                </Button>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Copy message</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Text to copy
                            </Label>
                            <Textarea placeholder={copyText} className='h-48' />
                        </div>
                    </div>
                    <DialogFooter className="md:justify-start">
                        <AnimatedSubscribeButton type="submit" className="text-sm" onClick={onCopyToClipBoardClick}>
                            <span className="group inline-flex items-center font-normal">
                                <Copy className="size-4 mr-1" />Copy
                            </span>
                            <span className="group inline-flex items-center">
                                <Check className="mr-2 size-4" />
                                Copied
                            </span>
                        </AnimatedSubscribeButton>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="bg-gray-100">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
                <DialogTrigger asChild>
                    <Button className="text-xs my-2 px-2 py-1">
                        <Upload /> Upload Image
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Upload image</DialogTitle>
                        <DialogDescription>
                            Supported file formats: .jpg, jpeg, png
                        </DialogDescription>
                    </DialogHeader>
                    <div className="pb-4 pt-2">
                        <div className="relative h-64 w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                            <Input
                                type="file"
                                id="imageUpload"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={onChoosingFile}
                                accept="image/*"
                            />
                            <Label htmlFor="imageUpload" className="flex flex-col items-center justify-center space-y-2">
                                < svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span id="fileName" className="text-gray-500 text-center">
                                    {fileName ? fileName : 'Choose a file'}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    {fileName ? '' : 'or drag and drop'}
                                </span>
                            </Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <AnimatedSubscribeButton type="submit" className="text-sm" onClick={onClickUpload}>
                            <span className="group inline-flex items-center font-normal">
                                Submit
                            </span>
                            <span className="group inline-flex items-center">
                                <ClipLoader color={"#ffffff"} size={20} className="mr-2" />
                                Submitting..
                            </span>
                        </AnimatedSubscribeButton>
                        {/* <Button type="submit" onClick={onClickUpload}>Submit</Button> */}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
        )
    }

    const getInitialNodesAndEdges = ({ data_list }: MarketingHypothesis[]) => {
        let headings_list = ['hypothesis', 'rationale', 'channels', 'targetAudience'];
        let nodes = [];
        let edges = [];
        let position = { 'x': 0, 'y': 0 }
        const edgeType = 'simplebezier';
        if (data_list) {
            nodes.push({ id: 'base', position: { x: 0, y: 0 }, data: { label: <div className='font-bold'>Product</div> }, style: { backgroundColor: nodeColors['base'] } });
        }
        for (let i = 0; i < data_list.length; i++) {
            let data = data_list[i];
            for (let j = 0; j < headings_list.length; j++) {
                let heading = headings_list[j];
                if (heading == 'hypothesis' || heading == 'rationale') {
                    if (heading == 'hypothesis') {
                        edges.push({ id: 'e' + data['id'] + heading, source: 'base', target: data['id'] + heading, type: edgeType, animated: true })
                    }
                    else {
                        edges.push({ id: 'e' + data['id'] + heading, source: data['id'] + 'hypothesis', target: data['id'] + heading, type: edgeType, animated: true })
                    }
                    nodes.push({
                        id: data['id'] + heading, position: position, data: { label: getLabelOfNode({ heading: heading, data: data }) }, width: 200, height: 'fit-content', style: { backgroundColor: nodeColors[heading] }
                    });
                }
                else if (heading == 'channels' || heading == 'targetAudience') {
                    if (heading == 'channels') {
                        for (let l = 0; l < data[heading].length; l++) {
                            nodes.push({ id: data['id'] + heading + l, position: position, data: { label: getLabelOfNode({ heading: heading, data: data, params: { 'position': l } }) }, style: { backgroundColor: nodeColors[heading] } });
                            edges.push({ id: 'e' + data['id'] + heading + l, source: data['id'] + 'rationale', target: data['id'] + heading + l, type: edgeType, animated: true })
                            nodes.push({ id: data['id'] + 'targetAudience' + l, position, data: { label: getLabelOfNode({ heading: 'targetAudience', data: data }) }, style: { backgroundColor: nodeColors['targetAudience'] } });
                            edges.push({ id: 'e' + data['id'] + 'targetAudience' + l, source: data['id'] + heading + l, target: data['id'] + 'targetAudience' + l, type: edgeType, animated: true })
                            nodes.push({ id: data['id'] + 'copyEverythingOrUpload' + l, position: position, data: { label: getLabelOfCopyOrUpload({ data }) }, style: { backgroundColor: nodeColors['copyEverythingOrUpload'] } });
                            edges.push({ id: 'e' + data['id'] + 'copyEverythingOrUpload' + l, source: data['id'] + 'targetAudience' + l, target: data['id'] + 'copyEverythingOrUpload' + l, type: edgeType, animated: true })
                        }
                    }
                }
            }
        }
        return [nodes, edges];
    };

    const [initialNodes, initialEdges] = getInitialNodesAndEdges({ data_list: marketingHypothesesData });

    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 250;
    const nodeHeight = 150;

    const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        const newNodes = nodes.map((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            const newNode = {
                ...node,
                targetPosition: isHorizontal ? 'left' : 'top',
                sourcePosition: isHorizontal ? 'right' : 'bottom',
                // We are shifting the dagre node position (anchor=center center) to the top left
                // so it matches the React Flow node anchor point (top left).
                position: {
                    x: nodeWithPosition.x - nodeWidth / 2,
                    y: nodeWithPosition.y - nodeHeight / 2,
                },
            };

            return newNode;
        });

        return { nodes: newNodes, edges };
    };

    const { nodes, edges } = getLayoutedElements(
        initialNodes,
        initialEdges,
        'LR'
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges} />
        </div>
    );
};

export default GraphComponent;
