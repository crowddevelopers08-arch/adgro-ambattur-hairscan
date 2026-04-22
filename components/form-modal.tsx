"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type FormData = {
  name: string
  phone: string
  email: string
  location: string
  problem: "hair-fall" | "crown-thinning" | "frontal-hair-loss" | "dandruff-scalp-issues" | "low-hair-density" | ""
}

interface FormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FormData) => void
}

export function FormModal({ open, onOpenChange, onSubmit }: FormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    problem: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Area is required"
    }

    if (!formData.problem) {
      newErrors.problem = "Please select a problem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
      setFormData({ name: "", phone: "", email: "", location: "", problem: "" })
      setErrors({})
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-primary/20 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-foreground">
            Start Your Hair Analysis
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Enter your details to begin the AI-powered scan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-foreground">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary"
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location" className="text-foreground">
              Area
            </Label>
            <Input
              id="location"
              placeholder="Enter your area"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary"
            />
            {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="problem" className="text-foreground">
              Select Your Concerns
            </Label>
            <Select
              value={formData.problem}
              onValueChange={(value: "hair-fall" | "crown-thinning" | "frontal-hair-loss" | "dandruff-scalp-issues" | "low-hair-density") =>
                setFormData({ ...formData, problem: value })
              }
            >
              <SelectTrigger className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Choose a hair concern" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card">
                <SelectItem value="hair-fall">Hair Fall</SelectItem>
                <SelectItem value="crown-thinning">Crown Thinning</SelectItem>
                <SelectItem value="frontal-hair-loss">Frontal Hair Loss</SelectItem>
                <SelectItem value="dandruff-scalp-issues">Dandruff / Scalp Issues</SelectItem>
                <SelectItem value="low-hair-density">Low Hair Density</SelectItem>
              </SelectContent>
            </Select>
            {errors.problem && <p className="text-sm text-destructive">{errors.problem}</p>}
          </div>

          <Button
            type="submit"
            className="mt-2 w-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(234,36,36,0.3)]"
          >
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
