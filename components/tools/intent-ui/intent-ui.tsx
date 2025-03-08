"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useThreadId } from "@/app/MyRuntimeProvide";

type IntentSelectionResult = {
  selected_intent?: "experimentation" | "analysis";
  cancelled?: boolean;
  error?: string;
};

export const get_interaction_intent = makeAssistantToolUI<Record<string, never>, string>({
  toolName: "get_interaction_intent",
  render: function IntentSelectionUI({ args, result, addResult }) {
    const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
    const threadId = useThreadId(); // ✅ Get thread ID inside the component

    // Parse existing result if any
    let resultObj: IntentSelectionResult = {};
    try {
      resultObj = result ? JSON.parse(result) : {};
    } catch (e) {
      resultObj = { error: result! };
    }

    const handleSelection = async (intent: "experimentation" | "analysis", threadId?: string) => {
      if (!threadId) {
        console.error("❌ No thread ID available, cannot send resume message.");
        return;
      }

      setSelectedIntent(intent);
      console.log("🔍 Starting handleSelection with intent:", intent);

      // Send tool response
      const toolResponse = JSON.stringify({ selected_intent: intent });
      console.log("📤 Sending tool response:", toolResponse);
      addResult(toolResponse);

      // // Wait for tool response to be processed
      // await new Promise((resolve) => setTimeout(resolve, 500));

      // console.log("✅ Tool response sent. Now sending resume to thread:", threadId);

      // try {
      //   await fetch(`api/threads/${threadId}/runs/stream`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //        "intent": intent 
      //     }),
      //   });

      //   console.log("✅ Selection handled successfully via API route" + JSON.stringify({
      //     "intent": intent 
      //  }));
      // } catch (error) {
      //   console.error("❌ Error in handleSelection:", error);
      // }
    };

    return (
      <div className="mb-4 flex flex-col items-center gap-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Select Interaction Type</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              onClick={() => handleSelection("experimentation", threadId)}
              variant={selectedIntent === "experimentation" ? "default" : "outline"}
              className="w-full"
              disabled={!!resultObj.selected_intent}
            >
              Experimentation
            </Button>
            <Button
              onClick={() => handleSelection("analysis", threadId)}
              variant={selectedIntent === "analysis" ? "default" : "outline"}
              className="w-full"
              disabled={!!resultObj.selected_intent}
            >
              Analysis
            </Button>
            {resultObj.selected_intent && (
              <div className="text-sm text-green-600">
                Selection confirmed: {resultObj.selected_intent}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  },
});
