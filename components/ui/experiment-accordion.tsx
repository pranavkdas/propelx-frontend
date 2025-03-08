"use client"

import { format } from "date-fns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, BarChart3, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Hypothesis {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  keyMetric: string;
  performance: number;
  roi: number;
  budget: number;
  spent: number;
  active: boolean;
}

interface Experiment {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  keyMetric: string;
  performance: number;
  roi: number;
  budget: number;
  spent: number;
  active: boolean;
  hypotheses: Hypothesis[];
}

const getPerformanceStatus = (performance: number) => {
  if (performance >= 10) return { label: "High", color: "bg-green-500" };
  if (performance >= 5) return { label: "Medium", color: "bg-amber-500" };
  return { label: "Low", color: "bg-red-500" };
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <AccordionItem key={experiment.id} value={experiment.id} className="border rounded-lg shadow-sm overflow-hidden">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-4 text-left">
          <div className="flex-1 flex items-center gap-3">
            <Switch
              checked={experiment.active}
              // No-op: the onCheckedChange is retained to keep the interactive UI
              onCheckedChange={() => { }}
              onClick={(e) => e.stopPropagation()}
              className="data-[state=checked]:bg-primary"
            />
            <div>
              <h3 className="text-xl font-semibold">{experiment.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(experiment.startDate, "MMM d, yyyy")} - {format(experiment.endDate, "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center md:items-end">
              <span className="text-sm text-muted-foreground">Key Metric</span>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="font-medium">{experiment.keyMetric}</span>
                <Badge className={`${getPerformanceStatus(experiment.performance).color} text-white`}>
                  {experiment.performance}%
                </Badge>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <span className="text-sm text-muted-foreground">ROI</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="font-medium">{experiment.roi}x</span>
              </div>
            </div>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-6 pb-6">
        <div className="mt-2 mb-4">
          <h4 className="text-lg font-medium mb-2">Budget Utilization</h4>
          <div className="flex items-center gap-4">
            <Progress value={(experiment.spent / experiment.budget) * 100} className="h-2 flex-1" />
            <span className="text-sm font-medium">
              {Math.round((experiment.spent / experiment.budget) * 100)}%
            </span>
          </div>
        </div>

        <h4 className="text-lg font-medium mb-4">Hypotheses</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiment.hypotheses.map((hypothesis) => (
            <Card key={hypothesis.id} className="border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{hypothesis.name}</CardTitle>
                  <Switch
                    checked={hypothesis.active}
                    // No-op for hypothesis toggle
                    onCheckedChange={() => { }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Key Metric: {hypothesis.keyMetric}</p>
                <p className="text-sm">Performance: {hypothesis.performance}%</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
