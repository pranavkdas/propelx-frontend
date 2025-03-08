import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2Icon, SparklesIcon } from "lucide-react";

const ExperimentCard = ({ experiment, toggleExperimentDetails, selectedExperiment, handleApplyInsights }) => {
  return (
    <motion.div
      key={experiment.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="text-lg">{experiment.title}</span>
            <div className={`w-3 h-3 rounded-full ${
              experiment.status === 'positive' ? 'bg-green-500' :
              experiment.status === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
          </CardTitle>
          <p className="text-sm text-muted-foreground">{experiment.dateRange}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Budget Utilization:</h3>
            <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${(experiment.budgetSpent / experiment.totalBudget) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-1">
              {experiment.budgetSpent.toLocaleString()} / {experiment.totalBudget.toLocaleString()} spent
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="flex-1 mr-2 rounded-full" onClick={() => toggleExperimentDetails(experiment)}>
            <BarChart2Icon className="w-4 h-4 mr-2" />
            View in Detail
          </Button>
          <Button className="flex-1 ml-2 rounded-full" onClick={handleApplyInsights}>
            <SparklesIcon className="w-4 h-4 mr-2" />
            Insights ✨
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ExperimentCard;

