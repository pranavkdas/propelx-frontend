import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from './experiment.module.css'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useNodeId } from '@xyflow/react';
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { generateSummaryOfTreeBranch, isMarketingSummaryOfBranchLoading, getSummaryOfBranch, deleteSummary, setMarketingChannelForNode } from "@/lib/store/features/newExperiment/newExperimentSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ClipLoader from "react-spinners/ClipLoader";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { Copy, Check } from "lucide-react"

const handleStyle = { height: 10, width: 10 };

function marketingChannelNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt);
    }, []);

    const nodeId = useNodeId();
    const [showSummaryLoading, setShowSummaryLoading] = useState(false)
    const [summarySourceNodeId, setSummarySourceNodeId] = useState(null)
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();
    const loading = useAppSelector(isMarketingSummaryOfBranchLoading);
    const summary = useAppSelector(getSummaryOfBranch);

    const handleGenerateSummary = () => {
        setShowSummaryLoading(true)
        setSummarySourceNodeId(nodeId)
        dispatch(generateSummaryOfTreeBranch({ sourceNodeId: nodeId }));
    }

    useEffect(() => {
        if (!loading) {
            setShowSummaryLoading(false)
            if (summary && summarySourceNodeId && summarySourceNodeId === nodeId) {
                setOpen(true)
            }
            else {
                setOpen(false)
                setSummarySourceNodeId(null)
            }
        }
    }, [loading, summary])

    const onCopyToClipBoardClick = async () => {
        await navigator.clipboard.writeText(summary);
    }

    return (
        <div>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={true}
                style={handleStyle}
            />
            <Card className='text-xs flex flex-col gap-2'>
                <CardHeader>
                    <Label htmlFor="hypothesis-heading">Marketing Channel</Label>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={(value) => dispatch(setMarketingChannelForNode({ sourceNodeId: nodeId, marketingChannel: value }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Marketing Channel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="meta">Meta</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className='flex flex-row gap-4'>
                    <Button variant="outline" size="sm" className="mt-4 h-12 w-1/3">
                        Delete node
                    </Button>
                    <Dialog open={open} onOpenChange={() => { if (open) { setOpen(false); dispatch(deleteSummary()); } else { setOpen(true); dispatch(deleteSummary()); } }}>
                        <Button variant="default" size="sm" className="mt-4 h-12 w-2/3" onClick={handleGenerateSummary}>
                            {loading && showSummaryLoading ? <span className="group inline-flex items-center">
                                <ClipLoader color={"#ffffff"} size={15} className="mr-2" />
                                Generating Summary
                            </span> :
                                <span className="group inline-flex items-center font-normal"> Generate Summary</span>
                            }
                        </Button>
                        <DialogContent className="sm:max-w-xl h-[400px]">
                            <DialogHeader>
                                <DialogTitle>Copy message</DialogTitle>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Text to copy
                                    </Label>
                                    <Textarea defaultValue={summary} className='h-[256px]' readOnly={true} />
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
                                    <Button type="button" variant="secondary" className="bg-gray-100" onClick={() => { setOpen(false); dispatch(deleteSummary()); }}>
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </CardFooter>
            </Card>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={true}
                style={handleStyle}
            />
        </div >
    );
}

export default marketingChannelNode;