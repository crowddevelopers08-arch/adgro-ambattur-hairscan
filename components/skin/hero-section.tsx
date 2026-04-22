"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Scan, Sparkles } from "lucide-react"
import type { SkinFormData, SkinProblem } from "./skin-types"

interface SkinHeroSectionProps {
  onStartScan: (data: SkinFormData) => void
}

export function SkinHeroSection({ onStartScan }: SkinHeroSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [problem, setProblem] = useState<SkinProblem>("")
  const [error, setError] = useState("")

  const validate = () => {
    if (!problem) {
      setError("Please select a concern")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    onStartScan({
      name: "",
      phone: "",
      email: "",
      location: "",
      problem,
    })
    setShowForm(false)
  }

  return (
    <section className="skin-hero-bg relative flex flex-col items-center justify-center overflow-hidden bg-background px-4 py-8 sm:py-10 md:py-15">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(221,185,90,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(221,185,90,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(221,185,90,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(221,185,90,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-[linear-gradient(180deg,rgba(221,185,90,0.1),transparent)]" />
        <div className="absolute left-0 top-1/3 h-40 w-full" />
        <div className="absolute left-1/2 top-[42%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute left-1/2 top-24 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[90px]" />
        <div className="animate-float absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-primary/14" />
        <div className="animate-float-delayed absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-primary/14 " />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <div className="relative mb-5 sm:mb-8">
          <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
          <div className="relative rounded-2xl border border-primary/20 bg-[#080b12]/80 px-4 py-2.5 sm:px-6 sm:py-3 backdrop-blur-sm shadow-[0_0_30px_rgba(221,185,90,0.12)]">
            <img src="/logo-1.png" alt="Bonitaa HQ" className="h-14 w-auto object-contain sm:h-16 md:h-20 lg:h-24" />
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
          <Sparkles className="h-4 w-4" />
          <span>Advanced Skin Analysis</span>
        </div>

        <h1 className="mb-3 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
          Bonitaa HQ - The Clinic That{" "}
          <span className="bg-gradient-to-r from-primary to-yellow-200 bg-clip-text text-transparent">
            Understands Indian Skin Problems
          </span>
        </h1>

        <p className="mb-6 max-w-xl px-2 text-pretty text-base leading-7 text-muted-foreground sm:mb-10 sm:px-0 sm:text-lg md:text-xl">
          Advanced skin analysis, expert-guided treatments, and personalised solutions designed for Indian skin. Trusted by thousands across Tamil Nadu.
        </p>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="group relative flex w-full items-center justify-center gap-3 bg-primary px-6 py-5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(221,185,90,0.5)] sm:w-auto sm:px-8 sm:py-7 sm:text-lg"
          >
            <Scan className="h-5 w-5 transition-transform group-hover:scale-110" />
            Scan Scan Scan
            <div className="absolute inset-0 -z-10 animate-pulse rounded-lg bg-primary/30 blur-xl" />
          </Button>

          <Button
            asChild
            type="button"
            size="lg"
            variant="outline"
            className="group flex w-full items-center justify-center gap-3 border-primary/40 bg-background/70 px-6 py-5 text-base font-semibold text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_30px_rgba(221,185,90,0.2)] sm:w-auto sm:px-8 sm:py-7 sm:text-lg"
          >
            <a href="tel:+917409256789">
              <Phone className="h-5 w-5 transition-transform group-hover:scale-110" />
              +91 7409256789
            </a>
          </Button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="border-primary/20 bg-card/95 backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-foreground">
              Start Your Skin Analysis
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Select your concern to continue to camera scan
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="skin-hero-problem" className="text-foreground">
                Select Your Concern
              </Label>
              <Select value={problem} onValueChange={(value: SkinProblem) => setProblem(value)}>
                <SelectTrigger
                  id="skin-hero-problem"
                  className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary"
                >
                  <SelectValue placeholder="Choose a skin concern" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card">
                  <SelectItem value="acne">Acne</SelectItem>
                  <SelectItem value="pigmentation">Pigmentation</SelectItem>
                  <SelectItem value="dullness">Dullness</SelectItem>
                  <SelectItem value="tanning">Tanning</SelectItem>
                  <SelectItem value="uneven-skin-tone">Uneven Skin Tone</SelectItem>
                  <SelectItem value="open-pores">Open Pores</SelectItem>
                </SelectContent>
              </Select>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button
              type="submit"
              className="mt-2 w-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(221,185,90,0.4)]"
            >
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
