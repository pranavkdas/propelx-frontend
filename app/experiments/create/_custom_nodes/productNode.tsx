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
import {
    generateThreeHypothesisNodes, isHypothesisListLoading
} from "@/lib/store/features/newExperiment/newExperimentSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";

const handleStyle = { height: 10, width: 10 };

function productNode({ data }) {

    const [hypothesisFeedback, setHypothesisFeedback] = useState("")
    const dispatch = useAppDispatch()
    const loading = useAppSelector(isHypothesisListLoading)

    const onChange = useCallback((evt) => {
        console.log(evt);
    }, []);

    const onClickGenerateHypothesis = () => {
        console.log(dispatch(generateThreeHypothesisNodes(hypothesisFeedback)))
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
                    <Label htmlFor="product-heading">Product</Label>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <Label htmlFor='product-name'>Product name</Label>
                    <Input
                        id="product-name"
                        type="text"
                        value={data?.productName}
                    // disabled={true}
                    />
                </CardContent>
                <CardFooter className='flex flex-row gap-4'>
                    <div className='flex flex-col gap-4'>
                        <Label htmlFor='hypothesis-feedback'>Hypothesis Feedback</Label>
                        <Textarea
                            id="hypothesis-feedback"
                            placeholder="Enter your hypothesis"
                            className="h-12 text-xs"
                            value={hypothesisFeedback}
                            onChange={(event) => setHypothesisFeedback(event.target.value)}
                        />
                    </div>
                    <Button variant="default" size="sm" className="mt-4 h-12" onClick={onClickGenerateHypothesis}>
                        {loading ? <span className="group inline-flex items-center">
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