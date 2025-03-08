"use client";
import React from 'react';
import { useEdgeRuntime } from "@assistant-ui/react";
import { Thread } from "@assistant-ui/react-ui";
import { get_interaction_intent } from '@/components/tools/intent-ui/intent-ui';
import { useLangGraphRuntime } from '@assistant-ui/react-langgraph';
import { MyRuntimeProvider } from '../MyRuntimeProvide';
import AssistantSidebar from '@/components/assistant-ui/assistant-sidebar';
import SidebarLayout from '@/components/ui/sidebarlayout';

const MyApp = () => {

  return (
    <SidebarLayout>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-3 text-2xl backdrop-blur-lg pl-8">
          <span>Analysis</span>
        </div>

        <div className="h-dvh">
          <MyRuntimeProvider>
            <AssistantSidebar>

            </AssistantSidebar>
          </MyRuntimeProvider>

        </div>
      </div>
    </SidebarLayout>
  );
};

export default MyApp;