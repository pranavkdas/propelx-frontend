"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useThreadId } from "@/app/MyRuntimeProvide";

type ObjectiveSelectionResult = {
  selected_objective?: "awareness" | "sales";
  cancelled?: boolean;
  error?: string;
};

export const get_marketing_objective = makeAssistantToolUI<Record<string, never>, string>({
  toolName: "get_marketing_objective",
  render: function ObjectiveSelectionUI({ args, result, addResult }) {
    const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
    const threadId = useThreadId(); // ✅ Get thread ID inside the component

    // Parse existing result if any
    let resultObj: ObjectiveSelectionResult = {};
    try {
      resultObj = result ? JSON.parse(result) : {};
    } catch (e) {
      resultObj = { error: result! };
    }

    const handleSelection = async (objective: "awareness" | "sales", threadId?: string) => {
      if (!threadId) {
        console.error("❌ No thread ID available, cannot send resume message.");
        return;
      }

      setSelectedObjective(objective);
      console.log("🔍 Starting handleSelection with objective:", objective);

      // Send tool response
      const toolResponse = JSON.stringify({ selected_objective: objective });
      console.log("📤 Sending tool response:", toolResponse);
      addResult(toolResponse);

    };

    return (
      <div className="mb-4 flex flex-col items-center gap-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Select Marketing Objective</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              onClick={() => handleSelection("awareness", threadId)}
              variant={selectedObjective === "awareness" ? "default" : "outline"}
              className="w-full"
              disabled={!!resultObj.selected_objective}
            >
              Awareness
            </Button>
            <Button
              onClick={() => handleSelection("sales", threadId)}
              variant={selectedObjective === "sales" ? "default" : "outline"}
              className="w-full"
              disabled={!!resultObj.selected_objective}
            >
              Sales
            </Button>
            {resultObj.selected_objective && (
              <div className="text-sm text-green-600">
                Objective confirmed: {resultObj.selected_objective}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  },
});
