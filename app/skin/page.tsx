"use client"

import { useState } from "react"
import { SkinHeroSection } from "@/components/skin/hero-section"
import { SkinInfoSection } from "@/components/skin/info-section"
import { SkinCameraModal } from "@/components/skin/camera-modal"
import { SkinScanLoader } from "@/components/skin/scan-loader"
import { SkinResultsView } from "@/components/skin/results-view"
import type { SkinFormData } from "@/components/skin/skin-types"

type AppState = "landing" | "camera" | "scanning" | "results"

export default function SkinPage() {
  const [appState, setAppState] = useState<AppState>("landing")
  const [formData, setFormData] = useState<SkinFormData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    problem: "",
  })
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const handleStartScanFromHero = (data: SkinFormData) => {
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
    return <SkinResultsView formData={formData} capturedImage={capturedImage} onBack={handleBackToHome} />
  }

  return (
    <main className="skin-experience min-h-screen bg-background">
      <SkinHeroSection onStartScan={handleStartScanFromHero} />
      <SkinInfoSection onStartScan={handleStartScan} />

      <SkinCameraModal
        open={appState === "camera"}
        onOpenChange={(open) => !open && setAppState("landing")}
        onCapture={handleCapture}
      />

      <SkinScanLoader
        open={appState === "scanning"}
        onOpenChange={() => {}}
        capturedImage={capturedImage}
        onComplete={handleScanComplete}
      />
    </main>
  )
}
