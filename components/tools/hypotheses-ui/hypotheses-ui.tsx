"use client"

import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import ClipLoader from "react-spinners/ClipLoader";
import { makeAssistantToolUI } from "@assistant-ui/react"
import { generateInitialHypotheses, generateMoreHypotheses } from "@/app/actions/hypothesisActions";
import { createExperiment } from "@/app/actions/experimentActions";




// Types
type MarketingChannel = "META" | "GOOGLE";
type EffortLevel = "low" | "medium" | "high";

type MarketingHypothesis = {
    id: string;
    hypothesis: string;
    hypothesisAlias: string;
    rationale: string;
    channels: MarketingChannel[];
    targetAudience: {
      description: string;
      alias: string;
    };
    estimatedImpact: {
      confidence: number;
      effort: EffortLevel;
    };
    selected: boolean; // ✅ Add this field to track selection
  };
  
type HypothesesSelectionResult = {
  selected_hypotheses?: MarketingHypothesis[];
  cancelled?: boolean;
  error?: string;
};
// State management
const useHypothesesStore = () => {
    const [hypotheses, setHypotheses] = useState<MarketingHypothesis[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGeneratingMore, setIsGeneratingMore] = useState(false);

    const toggleSelected = (id: string) => {
      setHypotheses((prev) =>
        prev.map((h) => (h.id === id ? { ...h, selected: !h.selected } : h))
      );
    };
    

  
    return {
      hypotheses,
      setHypotheses,
      isLoading,
      setIsLoading,
      isGeneratingMore,
      setIsGeneratingMore,
      toggleSelected,
    };
  };

  
  const toggleChannel = (
    hypothesisId: string,
    channel: "META" | "GOOGLE",
    hypotheses: MarketingHypothesis[],
    setHypotheses: (hypotheses: MarketingHypothesis[]) => void
  ) => {
    const updatedHypotheses = hypotheses.map(hypothesis => {
      if (hypothesis.id === hypothesisId) {
        const updatedChannels = hypothesis.channels.includes(channel)
          ? hypothesis.channels.filter(ch => ch !== channel) // Remove if exists
          : [...hypothesis.channels, channel]; // Add if not exists
  
        return { ...hypothesis, channels: updatedChannels };
      }
      return hypothesis;
    });
  
    setHypotheses(updatedHypotheses);
  };

  
  // Hypothesis editing
  const updateHypothesis = (
    hypothesisId: string,
    key: keyof MarketingHypothesis | "targetAudience.description" | "targetAudience.alias" | "estimatedImpact.confidence" | "estimatedImpact.effort",
    value: any,
    hypotheses: MarketingHypothesis[],
    setHypotheses: (hypotheses: MarketingHypothesis[]) => void
  ) => {
    const updatedHypotheses = hypotheses.map(hypothesis => {
      if (hypothesis.id !== hypothesisId) return hypothesis;
  
      // Handle nested properties dynamically
      if (key.startsWith("targetAudience.")) {
        const subKey = key.split(".")[1] as keyof typeof hypothesis.targetAudience;
        return {
          ...hypothesis,
          targetAudience: { ...hypothesis.targetAudience, [subKey]: value },
        };
      }
  
      if (key.startsWith("estimatedImpact.")) {
        const subKey = key.split(".")[1] as keyof typeof hypothesis.estimatedImpact;
        return {
          ...hypothesis,
          estimatedImpact: { ...hypothesis.estimatedImpact, [subKey]: value },
        };
      }
  
      // Default case for top-level properties
      return { ...hypothesis, [key]: value };
    });
  
    setHypotheses(updatedHypotheses);
  };


  
  
  // Validation
  const validateHypothesis = (hypothesis: MarketingHypothesis): boolean => {
    return (
      hypothesis.hypothesis.trim().length > 0 &&
      hypothesis.rationale.trim().length > 0 &&
      hypothesis.channels.length > 0 &&
      hypothesis.targetAudience.description.trim().length > 0 &&
      hypothesis.targetAudience.alias.trim().split(' ').length <= 2 &&
      hypothesis.estimatedImpact.confidence >= 0 &&
      hypothesis.estimatedImpact.confidence <= 100
    );
  };
  
  
// Component usage example
export const get_marketing_hypotheses = makeAssistantToolUI<
  { objective: string; product: string },
  MarketingHypothesis[]
>({
  toolName: "get_marketing_hypotheses",
  render: function MarketingHypothesisGenerator({ args, result, addResult }) {
  const {toast} = useToast()
  const [feedback, setFeedback] = useState("");
  const objective=args.objective
  const product = args.product
  const {
    hypotheses,
    setHypotheses,
    isLoading,
    setIsLoading,
    isGeneratingMore,
    setIsGeneratingMore,
    toggleSelected,
  } = useHypothesesStore();


  const handleGenerateInitial = async () => {
    setIsLoading(true);
    const newHypotheses = await generateInitialHypotheses(objective, product) || [];
    setHypotheses(newHypotheses);
    setIsLoading(false);
  };

  const handleGenerateMore = async () => {
    setIsGeneratingMore(true);
    const moreHypotheses = await generateMoreHypotheses(objective, product, feedback, hypotheses) || [];
    setHypotheses([...hypotheses, ...moreHypotheses]);
    setIsGeneratingMore(false);
  };

  const handleSubmit = async (selectedHypotheses: MarketingHypothesis[]) => {
    const toolResponse = JSON.stringify({ "selected_hypotheses": "dummy" });

    console.log("📤 Sending tool response:", toolResponse);
    addResult(toolResponse);

    const result = await createExperiment(selectedHypotheses)
    console.log(result)
    
    
    
    
    try {
      toast({
        title: "Success",
        description: "Experiment created!",
        duration: 3000,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create experiment",
        duration: 3000,
        variant: "destructive",
      });
    }
  };







  useEffect(() => {
    const loadInitialHypotheses = async () => {
      setIsLoading(true);
      try {
        const initialHypotheses = await generateInitialHypotheses(objective, product);
        setHypotheses(initialHypotheses);
      } catch (error) {
        toast({
            title: "Error",
            description: "Failed to generate hypotheses",
            variant: "destructive", // Use "destructive" for error messages
          });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialHypotheses();
  }, [objective, product]);

  

  // ... rest of your component code
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <ClipLoader className="w-6 h-6 animate-spin mb-2" />
        <p className="text-sm font-semibold">Generating initial hypotheses...</p>
      </div>
    )
  }

  return (
    <div className="w-full px-2 py-4">
      <h2 className="text-lg font-bold mb-2">Marketing Hypothesis Generator</h2>
      <p className="text-sm mb-4">
        <strong>Objective:</strong> {objective}
      </p>

      <div className="space-y-4 mb-4">
        {hypotheses.map((hypothesis) => (
          <div key={hypothesis.id} className="bg-white rounded-md shadow-sm p-3 text-sm">
            <Textarea
              value={hypothesis.hypothesis}
              className="mb-2 w-full text-sm"
              placeholder="Hypothesis statement"
              onChange={(e) =>
              updateHypothesis(hypothesis.id, "hypothesis", e.target.value, hypotheses, setHypotheses)
  }
            />
            <Textarea
              value={hypothesis.rationale}
              onChange={(e) =>
                updateHypothesis(hypothesis.id, "rationale", e.target.value, hypotheses, setHypotheses)
              }
              className="mb-2 w-full text-sm"
              placeholder="Rationale"
            />
            <div className="mb-2">
              <p className="font-semibold mb-1">Channels:</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <Checkbox
                    checked={hypothesis.channels.includes("META")}
                    onCheckedChange={() => toggleChannel(hypothesis.id, "META", hypotheses, setHypotheses)}
                  />
                  <span className="ml-2 text-sm">Meta</span>
                </label>
                <label className="flex items-center">
                  <Checkbox
                    checked={hypothesis.channels.includes("GOOGLE")}
                    onCheckedChange={() => toggleChannel(hypothesis.id, "GOOGLE", hypotheses, setHypotheses)}
                  />
                  <span className="ml-2 text-sm">Google</span>
                </label>
              </div>
            </div>
            <div className="mb-2">
              <p className="font-semibold mb-1">Target Audience:</p>
              <Input
                value={hypothesis.targetAudience.description}
                onChange={(e) =>
                    updateHypothesis(hypothesis.id, "targetAudience.description", e.target.value, hypotheses, setHypotheses)
                  }
                className="mb-1 text-sm"
                placeholder="Detailed description"
              />
              <Input
                value={hypothesis.targetAudience.alias}
                onChange={(e) =>
                    updateHypothesis(hypothesis.id, "targetAudience.alias", e.target.value, hypotheses, setHypotheses)
                  }
                className="mb-1 text-sm"
                placeholder="2-word alias"
              />
            </div>
            <div className="mb-2">
              <p className="font-semibold mb-1">Estimated Impact:</p>
              <Input
                type="number"
                min="0"
                max="100"
                value={hypothesis.estimatedImpact.confidence}
                onChange={(e) =>
                    updateHypothesis(hypothesis.id, "estimatedImpact.confidence", Number.parseInt(e.target.value, 10), hypotheses, setHypotheses)
                  }
                className="mb-1 text-sm"
                placeholder="Confidence (0-100)"
              />
              <Select
                value={hypothesis.estimatedImpact.effort}
                onValueChange={(value) =>
                    updateHypothesis(hypothesis.id, "estimatedImpact.effort", value as "Low" | "Medium" | "High", hypotheses, setHypotheses)
                }
              >
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Select effort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center">
              <Checkbox
                checked={hypothesis.selected}
                onCheckedChange={() => toggleSelected(hypothesis.id)}
              />
              <span className="ml-2 text-sm">Select this hypothesis</span>
            </label>

          </div>
        ))}
      </div>

      <div className="flex items-center mb-2">
        <Input
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mr-2 flex-grow text-sm"
          placeholder="Enter feedback for generating more hypotheses"
        />
        <Button
            onClick={async () => {
                setIsGeneratingMore(true); // Start loading state
                try {
                const newHypotheses = await generateMoreHypotheses(objective, product, feedback, hypotheses);
                console.log("Generated Hypotheses:", newHypotheses);
                console.log("Type:", typeof newHypotheses);
                setHypotheses((prev) => [...prev, ...newHypotheses]); // Append new hypotheses
                } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to generate more hypotheses",
                    variant: "destructive",
                });
                } finally {
                setIsGeneratingMore(false); // End loading state
                }
            }}
            disabled={isGeneratingMore}
            size="sm"
            >
            {isGeneratingMore ? (
                <>
                <ClipLoader className="mr-2 h-4 w-4 animate-spin" />
                Generating...
                </>
            ) : (
                "Generate More"
            )}
        </Button>

      </div>

      {isGeneratingMore && (
        <div className="flex items-center justify-center mb-2">
          <ClipLoader className="mr-2 h-4 w-4 animate-spin" />
          <p className="text-sm">Generating additional hypotheses...</p>
        </div>
      )}

      <Button
        onClick={() => handleSubmit(hypotheses.filter((h) => h.selected))}
        disabled={!hypotheses.some((h) => h.selected)} // Disabled if no hypothesis is selected
        className="w-full"
        size="sm"
      >
        Submit Selected
      </Button>


    </div>
  )
}})