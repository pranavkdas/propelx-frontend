import { useCallback, useState, useEffect } from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { useNodeId } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { generateTargetAudienceNode, isTargetAudienceLoading } from "@/lib/store/features/newExperiment/newExperimentSlice";
import ClipLoader from "react-spinners/ClipLoader";

const handleStyle = { height: 10, width: 10 };

function hypothesisNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt);
    }, []);
    const [showTargetAudienceLoading, setShowTargetAudienceLoading] = useState(false)

    const nodeId = useNodeId();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(isTargetAudienceLoading)

    const handleGenerateTargetAudience = () => {
        console.log(nodeId, 'nodeID');
        setShowTargetAudienceLoading(true)
        dispatch(generateTargetAudienceNode({ sourceNodeId: nodeId }));
    }

    useEffect(() => {
        if (!loading) {
            setShowTargetAudienceLoading(false)
        }

    }, [loading])

    return (
        <div>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={true}
                style={handleStyle}
            />
            <Card className='text-xs flex flex-col gap-4'>
                <CardHeader>
                    <Label htmlFor="hypothesis-heading">Hypothesis</Label>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <Label htmlFor='hypothesis-alias'>Alias</Label>
                    <Input
                        id="hypothesis-alias"
                        type="text"
                        value={data?.alias}
                        className='h-fit'
                    />
                    <Label htmlFor='hypothesis-description'>Description</Label>
                    <Textarea
                        id="hypothesis-description"
                        placeholder="Enter your hypothesis"
                        className="h-fit text-xs"
                        value={data?.hypothesis}
                    />
                    <div className="flex flex-row gap-4">
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='hypothesis-estimated_impact'>Estimated Impact</Label>
                            <Input
                                id="hypothesis-estimated_impact"
                                type="text"
                                value={data?.estimatedImpact}
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='hypothesis-estimated_confidence'>Estimated Effort</Label>
                            <Input
                                id="hypothesis-estimated_confidence"
                                type="text"
                                value={data?.estimatedEffort}
                            />
                        </div>
                    </div>
                    <Label htmlFor='hypothesis-rationale'>Rationale</Label>
                    <Textarea
                        id="hypothesis-rationale"
                        placeholder="Enter your hypothesis"
                        className="h-fit text-xs"
                        value={data?.rationale}
                    />
                </CardContent>
                <CardFooter className='flex flex-row gap-4'>
                    <Button variant="outline" size="sm" className="mt-4 h-12 w-1/2">
                        Delete node
                    </Button>
                    <Button variant="default" size="sm" className="mt-4 h-12 w-1/2" onClick={handleGenerateTargetAudience}>
                        {loading && showTargetAudienceLoading ? <span className="group inline-flex items-center">
                            <ClipLoader color={"#ffffff"} size={15} className="mr-2" />
                            Generating Target Audience
                        </span> :
                            <span className="group inline-flex items-center font-normal"> Generate Target Audience</span>

                        }
                    </Button>
                </CardFooter>
            </Card>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={true}
                style={handleStyle}
            />
        </div>
    );
}

export default hypothesisNode;