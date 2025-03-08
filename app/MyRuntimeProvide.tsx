"use client"

import { createContext, useContext, useRef } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useLangGraphRuntime } from "@assistant-ui/react-langgraph";
import { createThread, sendMessage } from "@/lib/chatApi";

// Create Context to store thread ID
const ThreadContext = createContext<{ threadId?: string } | null>(null);

export function MyRuntimeProvider({ children }: { children: React.ReactNode }) {
  const threadIdRef = useRef<string | undefined>();

  const runtime = useLangGraphRuntime({
    threadId: threadIdRef.current,
    stream: async (messages) => {
      if (!threadIdRef.current) {
        const { thread_id } = await createThread();
        threadIdRef.current = thread_id;
      }
      const threadId = threadIdRef.current;
      return sendMessage({
        threadId,
        messages,
      });
    },
  });

  return (
    <ThreadContext.Provider value={{ threadId: threadIdRef.current }}>
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    </ThreadContext.Provider>
  );
}

// Hook to access the correct thread ID
export function useThreadId() {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error("useThreadId must be used within MyRuntimeProvider");
  }
  return context.threadId;
}
