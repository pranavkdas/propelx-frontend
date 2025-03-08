"use client";
// app/experiments/page.tsx
import SidebarLayout from "@/components/ui/sidebarlayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ExperimentCard from "@/components/ui/experiment-accordion";
import { Accordion } from "@/components/ui/accordion";
import { useRouter } from 'next/navigation'
import NewExperimentSheet from './create/newExperimentSheet'

// TypeScript interfaces
interface Hypothesis {
  id: string
  name: string
  startDate: Date
  endDate: Date
  keyMetric: string
  performance: number
  roi: number
  budget: number
  spent: number
  active: boolean
}

interface Experiment {
  id: string
  name: string
  startDate: Date
  endDate: Date
  keyMetric: string
  performance: number
  roi: number
  budget: number
  spent: number
  active: boolean
  hypotheses: Hypothesis[]
}


const dummyExperiments: Experiment[] = [
  {
    id: "exp-1",
    name: "Social Media Ad Campaign",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-01"),
    keyMetric: "Conversion Rate",
    performance: 4.2,
    roi: 120,
    budget: 5000,
    spent: 4500,
    active: true,
    hypotheses: [
      {
        id: "hyp-1",
        name: "Video ads outperform static images",
        startDate: new Date("2024-01-05"),
        endDate: new Date("2024-02-15"),
        keyMetric: "Click-through rate (CTR)",
        performance: 3.8,
        roi: 110,
        budget: 2500,
        spent: 2200,
        active: true,
      },
      {
        id: "hyp-2",
        name: "Targeting age 25-34 increases conversions",
        startDate: new Date("2024-01-10"),
        endDate: new Date("2024-02-20"),
        keyMetric: "Conversion Rate",
        performance: 4.5,
        roi: 130,
        budget: 2500,
        spent: 2300,
        active: false,
      },
    ],
  },
  {
    id: "exp-2",
    name: "Email Marketing Campaign",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-04-01"),
    keyMetric: "Open Rate",
    performance: 5.1,
    roi: 140,
    budget: 3000,
    spent: 2800,
    active: true,
    hypotheses: [
      {
        id: "hyp-3",
        name: "Personalized subject lines improve open rates",
        startDate: new Date("2024-02-05"),
        endDate: new Date("2024-03-15"),
        keyMetric: "Open Rate",
        performance: 5.3,
        roi: 145,
        budget: 1500,
        spent: 1400,
        active: true,
      },
      {
        id: "hyp-4",
        name: "Sending emails on Tuesdays increases engagement",
        startDate: new Date("2024-02-10"),
        endDate: new Date("2024-03-20"),
        keyMetric: "Click-through rate (CTR)",
        performance: 4.8,
        roi: 135,
        budget: 1500,
        spent: 1400,
        active: false,
      },
    ],
  },
];



export default function ExperimentsPage() {
  const [open, setOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [filter, setFilter] = useState("Active");
  const [expandedExperiment, setExpandedExperiment] = useState(null);

  const router = useRouter();

  const toggleExperiment = (id: string) => {
    console.log(`Toggled experiment: ${id}`);
  };

  const toggleHypothesis = (expId: string, hypId: string) => {
    console.log(`Toggled hypothesis: ${hypId} in experiment: ${expId}`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-3 text-2xl backdrop-blur-lg  pl-8">
        <span>Experiments</span>
        < NewExperimentSheet open={open} setOpen={setOpen} />
      </div>

      {/* Panels Container */}
      <div className="flex-1">
        <ResizablePanelGroup
          direction="horizontal"
          className="border rounded-lg h-full"
        >
          <ResizablePanel defaultSize={75} className="px-8 py-4 h-full">
            <div className="flex justify-between items-center gap-2 mb-4">
              <div className=" flex items-center justify-between px-0 text-2xl ">
                {filter} Experiments
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRightPanelOpen(true)}
              >
                Open Panel
              </Button>
              <Select onValueChange={setFilter} defaultValue={filter}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Main content goes here */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {dummyExperiments.map((experiment) => (
                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                />
              ))}
            </Accordion>

          </ResizablePanel>
          {rightPanelOpen && (
            <>
              <ResizableHandle />
              <ResizablePanel
                defaultSize={25}
                className="p-4 border-l h-full relative"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setRightPanelOpen(false)}
                >
                  ✕
                </Button>
                <span className="text-lg font-medium">Insights</span>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}