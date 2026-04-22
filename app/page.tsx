"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { InfoSection } from "@/components/info-section"
import type { FormData } from "@/components/form-modal"
import { CameraModal } from "@/components/camera-modal"
import { ScanLoader } from "@/components/scan-loader"

const ResultsView = dynamic(
  () => import("@/components/results-view").then((m) => m.ResultsView),
  { ssr: false }
)

type AppState = "landing" | "camera" | "scanning" | "results"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    problem: "",
  })
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const handleStartScanFromHero = (data: FormData) => {
    setFormData(data)
    setAppState("camera")
  }

  const handleStartScan = () => {
    setAppState("camera")
  }

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData)
    setAppState("scanning")
  }

  const handleScanComplete = () => {
    setAppState("results")
  }

  const handleBackToHome = () => {
    setAppState("landing")
    setFormData({ name: "", phone: "", email: "", location: "", problem: "" })
    setCapturedImage(null)
  }

  if (appState === "results") {
    return <ResultsView formData={formData} capturedImage={capturedImage} onBack={handleBackToHome} />
  }

  return (
    <main className="hair-experience min-h-screen bg-background">
      <HeroSection onStartScan={handleStartScanFromHero} />
      <InfoSection onStartScan={handleStartScan} />

      <CameraModal
        open={appState === "camera"}
        onOpenChange={(open) => !open && setAppState("landing")}
        onCapture={handleCapture}
      />

      <ScanLoader
        open={appState === "scanning"}
        onOpenChange={() => {}}
        capturedImage={capturedImage}
        onComplete={handleScanComplete}
      />
    </main>
  )
}
