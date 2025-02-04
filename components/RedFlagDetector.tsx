"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2, Flag, Heart, AlertTriangle } from "lucide-react";

const RedFlagDetector = () => {
  const [scenario, setScenario] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyzeScenario = async () => {
    if (!scenario.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error response from API:", error);
        setAnalysis(`Error: ${error.error || "Something went wrong."}`);
        return;
      }

      const data = await res.json();
      setAnalysis(data.analysis || "No response received.");
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis("Oops! Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl border-red-100 dark:border-red-900">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Flag className="h-6 w-6 text-red-500" />
          <CardTitle>Red-Flag Detector</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-pink-500" />
          Share your relationship scenario and let our AI wisdom guide you!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="Example: My date showed up 30 minutes late and didn't apologize... 🤔"
          className="min-h-[150px] resize-none bg-white/50 dark:bg-gray-800/50"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        <Button
          onClick={analyzeScenario}
          disabled={isLoading || !scenario.trim()}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Relationship Vibes...
            </>
          ) : (
            <>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Detect Red Flags
            </>
          )}
        </Button>
        {analysis && (
          <Alert className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800">
            <AlertDescription className="whitespace-pre-line">
              {analysis}
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default RedFlagDetector;
