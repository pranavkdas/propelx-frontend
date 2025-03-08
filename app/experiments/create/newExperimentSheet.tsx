import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import {
    addNewExperiment, setProductNode
} from "@/lib/store/features/newExperiment/newExperimentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const NewExperimentSheet: React.FC = ({ open, setOpen }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [experimentName, setExperimentName] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [marketingObjective, setMarketingObjective] = useState(null);

    const handleCreateNewExperimentSubmit = () => {
        dispatch(addNewExperiment({
            experimentName: experimentName,
            productName: productName,
            productDescription: productDescription,
            marketingObjective: marketingObjective,
        }))
        dispatch(setProductNode())

        router.push('/experiments/create')
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="default" size="sm">
                    New Experiment
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px]">
                <SheetHeader>
                    <SheetTitle>Create a New Experiment</SheetTitle>
                    <SheetDescription>
                        Fill out the details for your new experiment.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 p-4">
                    <div>
                        <Label htmlFor="experiment-name">Experiment Name</Label>
                        <Input
                            id="experiment-name"
                            type="text"
                            placeholder="Enter experiment name"
                            onChange={(e) => setExperimentName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="product-name">Product Name</Label>
                        <Input
                            id="product-name"
                            type="text"
                            placeholder="Enter product name"
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="product-description">Product Description</Label>
                        <Textarea
                            id="product-description"
                            placeholder="Enter product description"
                            className="h-24"
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Marketing Objective</Label>
                        <Select onValueChange={setMarketingObjective}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Objective" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="awareness">Awareness</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter className="flex gap-2 p-4">
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button variant="default" onClick={handleCreateNewExperimentSubmit}>Create</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default NewExperimentSheet;
