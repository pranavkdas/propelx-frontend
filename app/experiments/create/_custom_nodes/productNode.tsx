import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
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
import {
    generateThreeHypothesisNodes, isHypothesisListLoading, updateNode
} from "@/lib/store/features/newExperiment/newExperimentSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";
import { useNodeId } from '@xyflow/react';

const handleStyle = { height: 10, width: 10 };

function productNode({ data }) {

    const [productName, setProductName] = useState(data?.productName ? data.productName : '')
    const [hypothesisFeedback, setHypothesisFeedback] = useState(data?.hypothesisFeedback ? data.hypothesisFeedback : '')
    const dispatch = useAppDispatch()
    const loading = useAppSelector(isHypothesisListLoading)
    const nodeId = useNodeId();

    const onChange = useCallback((evt) => {
        console.log(evt);
    }, []);

    const onClickGenerateHypothesis = () => {
        console.log(dispatch(generateThreeHypothesisNodes(hypothesisFeedback)))
    }

    const handleUpdateNode = (field, value) => {
        dispatch(updateNode({ field: field, value: value, nodeId: nodeId }))
    }

    return (
        <div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={true}
                style={handleStyle}
            />
            <Card className='text-xs flex flex-col gap-4'>
                <CardHeader>
                    <Label htmlFor="product-heading" className='text-lg'>Product</Label>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <Label htmlFor='product-name'>Product name</Label>
                    <Input
                        id="product-name"
                        type="text"
                        defaultValue={productName}
                        onChange={(event) => setProductName(event.target.value)}
                        onBlur={(e) => handleUpdateNode('productName', e.target.value)}
                    />
                </CardContent>
                <CardFooter className='flex flex-row gap-4'>
                    <div className='flex flex-col gap-4'>
                        <Label htmlFor='hypothesis-feedback'>Generate with feedback</Label>
                        <Textarea
                            id="hypothesis-feedback"
                            placeholder="Enter your feedback"
                            className="h-12 text-xs"
                            value={data}
                            onChange={(event) => setHypothesisFeedback(event.target.value)}
                            onBlur={(e) => handleUpdateNode('hypothesisFeedback', e.target.value)}
                        />
                    </div>
                    <Button variant="default" size="sm" className="mt-4 h-12" onClick={onClickGenerateHypothesis}>
                        {loading ? <span className="group inline-flex items-center font-normal">
                            <ClipLoader color={"#ffffff"} size={15} className="mr-2" />
                            Generating hypothesis
                        </span> :
                            <span className="group inline-flex items-center font-normal"> Generate hypothesis</span>

                        }
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default productNode;