"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { makeAssistantToolUI } from "@assistant-ui/react"
import { useThreadId } from "@/app/MyRuntimeProvide"

type ProductInputResult = {
  product_description?: string;
  cancelled?: boolean;
  error?: string;
}

export const get_product_input = makeAssistantToolUI<{ objective: string }, string>({
  toolName: "get_product_input",
  render: function ProductInputUI({ args, result, addResult }) {
    const [inputValue, setInputValue] = useState("")
    const threadId = useThreadId()
    
    // Parse existing result if any
    let resultObj: ProductInputResult = {}
    try {
      resultObj = result ? JSON.parse(result) : {}
    } catch (e) {
      resultObj = { error: result! }
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      
      if (!threadId) {
        console.error("❌ No thread ID available, cannot send input message.")
        return
      }

      // Send tool response
      const toolResponse = JSON.stringify({ product_description: inputValue })
      console.log("📤 Sending tool response:", toolResponse)
      addResult(toolResponse)
      
      // Reset the input field after submission
      setInputValue("")
    }

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Marketing Objective: {args.objective}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Input
              type="text"
              placeholder="Enter your response"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full"
              disabled={!!resultObj.product_description}
            />
            {resultObj.product_description && (
              <div className="text-sm text-green-600 mt-2">
                Input confirmed: {resultObj.product_description}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!!resultObj.product_description}
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    )
  }
})