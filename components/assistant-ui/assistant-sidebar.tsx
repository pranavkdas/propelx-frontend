"use client";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { get_interaction_intent } from "@/components/tools/intent-ui/intent-ui";
import { get_marketing_objective } from "@/components/tools/objective-ui/objective-ui";
import { get_product_input } from "@/components/tools/product-ui/product-ui";
import { get_marketing_hypotheses } from "@/components/tools/hypotheses-ui/hypotheses-ui";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { FC, PropsWithChildren } from "react";
import { Thread } from "@assistant-ui/react-ui";

const AssistantSidebar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel  defaultSize={70}>{children}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel  defaultSize={30}>
        <Thread 
          assistantMessage={{ components: { Text: MarkdownText } }}
          tools={[get_interaction_intent, get_marketing_objective, get_product_input, get_marketing_hypotheses]}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default AssistantSidebar;
