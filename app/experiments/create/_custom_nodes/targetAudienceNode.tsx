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
import { generateMarketingChannelNode, deleteNode, updateNode } from "@/lib/store/features/newExperiment/newExperimentSlice";

const handleStyle = { height: 10, width: 10 };

function targetAudienceNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt);
    }, []);

    const [alias, setAlias] = useState(data?.alias ? data.alias : '')
    const [description, setDescription] = useState(data?.description ? data.description : '')

    const nodeId = useNodeId();
    const dispatch = useAppDispatch();

    const handleGenerateChannels = () => {
        console.log(nodeId, 'nodeID');
        dispatch(generateMarketingChannelNode({ sourceNodeId: nodeId }));
    }

    const handleDeleteNode = () => {
        dispatch(deleteNode({ sourceNodeId: nodeId }))
    }

    const handleUpdateNode = (field, value) => {
        dispatch(updateNode({ field: field, value: value, nodeId: nodeId }))
    }

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
                    <Label htmlFor="hypothesis-heading" className='text-lg'>Target Audience</Label>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <Label htmlFor='hypothesis-alias'>Alias</Label>
                    <Input
                        id="hypothesis-alias"
                        type="text"
                        defaultValue={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        onBlur={(e) => handleUpdateNode('alias', e.target.value)}
                    />
                    <Label htmlFor='hypothesis-description'>Description</Label>
                    <Textarea
                        id="hypothesis-description"
                        placeholder="Enter your hypothesis"
                        className="h-fit text-xs"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={(e) => handleUpdateNode('description', e.target.value)}
                    />
                </CardContent>
                <CardFooter className='flex flex-row gap-4'>
                    <Button variant="outline" size="sm" className="mt-4 h-12 w-1/2 font-normal" onClick={handleDeleteNode}>
                        Delete node
                    </Button>
                    <Button variant="default" size="sm" className="mt-4 h-12 w-1/2 font-normal" onClick={handleGenerateChannels}>
                        Generate Channels
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

export default targetAudienceNode;