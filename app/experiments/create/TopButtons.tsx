import React from 'react';
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { Copy, Check, Upload, PanelRightOpen } from "lucide-react"
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

export default ({ rightPanelOpen, setRightPanelOpen }) => {
    const [open, setOpen] = useState(false);
    const [openCreativesUpload, setOpenCreativesUpload] = useState(false);
    const { toast } = useToast()

    const dispatch = useAppDispatch();
    const loading = useAppSelector(isMarketingSummaryOfBranchLoading);
    const summary = useAppSelector(getAllStrategySummary);
    const allBranches = useAppSelector(getAllBranches);
    const [showSummaryLoading, setShowSummaryLoading] = useState(false)

    const [fileName, setUploadedFileName] = useState("")

    const handleGenerateSummary = () => {
        setShowSummaryLoading(true)
        dispatch(generateSummaryOfAllBranches());
    }

    useEffect(() => {
        if (!loading) {
            setShowSummaryLoading(false)
            if (summary) {
                setOpen(true)
            }
            else {
                setOpen(false)
            }
        }
    }, [loading, summary])

    const onCopyToClipBoardClick = async () => {
        await navigator.clipboard.writeText(summary);
    }

    const onChoosingFile = () => {
        let imageUpload = document.getElementById("imageUpload");
        let imageFileName = imageUpload?.files[0]?.name;
        if (imageFileName) { setUploadedFileName(imageFileName); }
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const onClickUpload = async () => {
        await delay(3000);
        setUploadedFileName('');
        setOpenCreativesUpload(false);

        toast({
            title: "File Uploaded successfully",
            description: `${moment().format('dddd, MMMM Do, YYYY, h:mm A')}`,
            action: (
                <ToastAction altText="File Uploaded successfully">Undo</ToastAction>
            ),
        })
    }

    return (
        <div className='flex flex-row gap-4'>
            <Button>
                Save
            </Button>
            <Button>
                Publish
            </Button>
            <Dialog open={open} onOpenChange={() => { if (open) { setOpen(false); dispatch(deleteSummary()); } else { setOpen(true); dispatch(deleteSummary()); } }}>
                <Button onClick={handleGenerateSummary}>
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
            <Dialog open={openCreativesUpload} onOpenChange={setOpenCreativesUpload}>
                <Button onClick={() => setOpenCreativesUpload(true)}>
                    Upload creatives
                </Button>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Upload creatives</DialogTitle>
                    </DialogHeader>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                        {allBranches.length > 0 ? allBranches.map((item, index) => {
                            return <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger>Branch {index + 1}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="relative h-32 w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
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
                                </AccordionContent></AccordionItem>
                        }) : <>No branches detected</>}
                    </Accordion >
                    <DialogFooter className="md:justify-start">
                        <AnimatedSubscribeButton type="submit" className="text-sm" onClick={onClickUpload}>
                            <span className="group inline-flex items-center font-normal">
                                Upload
                            </span>
                            <span className="group inline-flex items-center">
                                <ClipLoader color={"#ffffff"} size={20} className="mr-2" />
                                Uploading..
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
            <Button
                variant="outline"
                size="md"
                className="font-normal px-4"
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
            >
                <PanelRightOpen />
            </Button>
        </div>
    );
};