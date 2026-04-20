"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface SkinScanLoaderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  capturedImage: string | null
  onComplete: () => void
}

export function SkinScanLoader({ open, onOpenChange, capturedImage, onComplete }: SkinScanLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [analysisText, setAnalysisText] = useState("Initializing scan...")

  useEffect(() => {
    if (!open) {
      setProgress(0)
      setIsComplete(false)
      setAnalysisText("Initializing scan...")
      return
    }

    const texts = [
      "Initializing scan...",
      "Detecting facial features...",
      "Analyzing skin texture...",
      "Processing AI algorithms...",
      "Generating personalized results...",
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 2 + 0.5
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setAnalysisText("Analysis complete!")
          return 100
        }

        const textIndex = Math.min(Math.floor(newProgress / 25), texts.length - 1)
        setAnalysisText(texts[textIndex])
        return newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="border-primary/20 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <div className="flex flex-col items-center p-6">
          <DialogTitle className="mb-6 text-2xl font-bold text-foreground">AI Skin Analysis</DialogTitle>
          <DialogDescription className="sr-only">
            AI is analyzing your skin. Please wait while we process your image.
          </DialogDescription>

          <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-primary/40 shadow-[0_0_40px_rgba(221,185,90,0.3)]">
            {capturedImage && <img src={capturedImage} alt="Captured face" className="h-full w-full object-cover" />}

            {!isComplete && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                <div className="h-full w-full animate-pulse bg-gradient-to-b from-primary/20 via-transparent to-primary/20" />
                <div className="absolute inset-x-0 top-0 h-full overflow-hidden">
                  <div className="animate-scan-slow absolute left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(221,185,90,0.8)]" />
                </div>
              </div>
            )}

            {isComplete && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_0_30px_rgba(221,185,90,0.6)]">
                  <svg className="h-8 w-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{analysisText}</span>
              <span className="font-mono text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-muted" />
          </div>

          {isComplete && (
            <Button
              onClick={onComplete}
              className="mt-8 bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(221,185,90,0.5)]"
            >
              See Your Results
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
