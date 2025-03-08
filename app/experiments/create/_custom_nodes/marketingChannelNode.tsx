import { useCallback, useState } from 'react';
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
import { useAppDispatch } from "@/lib/store/hooks";
import { generateMarketingChannelNode } from "@/lib/store/features/newExperiment/newExperimentSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const handleStyle = { height: 10, width: 10 };

function marketingChannelNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt);
    }, []);

    const nodeId = useNodeId();
    const dispatch = useAppDispatch();

    const handleGenerateSummary = () => {
        console.log(nodeId, 'nodeID');
        // dispatch(generateMarketingChannelNode({ sourceNodeId: nodeId }));
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
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Marketing Channel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="awareness">Google</SelectItem>
                            <SelectItem value="sales">Meta</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className='flex flex-row gap-4'>
                    <Button variant="outline" size="sm" className="mt-4 h-12 w-1/2">
                        Delete node
                    </Button>
                    <Button variant="default" size="sm" className="mt-4 h-12 w-1/2" onClick={handleGenerateSummary}>
                        Generate Summary
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

export default marketingChannelNode;