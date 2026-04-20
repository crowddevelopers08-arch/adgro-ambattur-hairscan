"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Camera, RotateCcw, FlipHorizontal, Scan } from "lucide-react"

interface CameraModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCapture: (imageData: string) => void
}

export function CameraModal({ open, onOpenChange, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const startCamera = useCallback(async (mode: "user" | "environment") => {
    try {
      setError(null)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: 640, height: 480 },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setIsStreaming(true)
        }
      }
    } catch {
      setError("Unable to access camera. Please allow camera permissions.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsStreaming(false)
  }, [])

  useEffect(() => {
    if (open) {
      setCapturedImage(null)
      startCamera(facingMode)
    } else {
      stopCamera()
      setCapturedImage(null)
    }
    return () => stopCamera()
  }, [open])

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        stopCamera()
        setCapturedImage(imageData)
      }
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    startCamera(facingMode)
  }

  const handleFlipCamera = () => {
    const newMode = facingMode === "user" ? "environment" : "user"
    setFacingMode(newMode)
    startCamera(newMode)
  }

  const handleConfirm = () => {
    if (capturedImage) onCapture(capturedImage)
  }

  const RED = "#ea2424"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="border-0 bg-white p-0 sm:max-w-md"
        style={{
          borderRadius: "28px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.16), 0 0 0 1px rgba(234,36,36,0.1)",
          fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
          overflow: "hidden",
          background: "linear-gradient(160deg, #fff 55%, rgba(255,245,245,0.5) 100%)",
        }}
      >
        {/* Top gradient bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${RED}, #f87171, ${RED})`, zIndex: 10 }} />
        {/* Decorative bg rings */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -110, right: -110, width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(234,36,36,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.4, pointerEvents: "none" }} />

        <div style={{ padding: "28px 24px 24px", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "14px",
              background: "rgba(234,36,36,0.08)",
              border: "1px solid rgba(234,36,36,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px",
            }}>
              <Camera style={{ width: 22, height: 22, color: RED }} />
            </div>
            <DialogTitle style={{ fontSize: "1.15rem", fontWeight: 800, color: "#1a1a1a", marginBottom: "4px" }}>
              {capturedImage ? "Confirm Your Photo" : "Position Your Hair"}
            </DialogTitle>
            <DialogDescription style={{ fontSize: "0.82rem", color: "#6b6b6b" }}>
              {capturedImage
                ? "Happy with the photo? Confirm or retake."
                : "Align your hair within the frame for best results"}
            </DialogDescription>
          </div>

          {/* Camera / Preview area */}
          <div style={{
            position: "relative",
            aspectRatio: "1 / 1",
            borderRadius: "20px",
            overflow: "hidden",
            background: "#f5f5f5",
            border: "1.5px solid rgba(234,36,36,0.12)",
            marginBottom: "20px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}>
            {error ? (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                height: "100%", padding: "24px", textAlign: "center", gap: "12px",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(234,36,36,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Camera style={{ width: 22, height: 22, color: RED }} />
                </div>
                <p style={{ fontSize: "0.85rem", color: "#6b6b6b", lineHeight: 1.6 }}>{error}</p>
              </div>
            ) : capturedImage ? (
              <img src={capturedImage} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay playsInline muted
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/* Guide overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    width: "68%", height: "68%", position: "relative",
                    borderRadius: "50%",
                    border: `2.5px solid rgba(234,36,36,0.5)`,
                    boxShadow: `inset 0 0 24px rgba(234,36,36,0.08)`,
                  }}>
                    {/* Corner accents */}
                    <div style={{ position: "absolute", top: -3, left: -3, width: 22, height: 22, borderTop: `3px solid ${RED}`, borderLeft: `3px solid ${RED}`, borderRadius: "50% 0 0 0" }} />
                    <div style={{ position: "absolute", top: -3, right: -3, width: 22, height: 22, borderTop: `3px solid ${RED}`, borderRight: `3px solid ${RED}`, borderRadius: "0 50% 0 0" }} />
                    <div style={{ position: "absolute", bottom: -3, left: -3, width: 22, height: 22, borderBottom: `3px solid ${RED}`, borderLeft: `3px solid ${RED}`, borderRadius: "0 0 0 50%" }} />
                    <div style={{ position: "absolute", bottom: -3, right: -3, width: 22, height: 22, borderBottom: `3px solid ${RED}`, borderRight: `3px solid ${RED}`, borderRadius: "0 0 50% 0" }} />
                  </div>
                </div>

                {/* Scan line */}
                {isStreaming && (
                  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                    <div
                      className="animate-scan"
                      style={{
                        position: "absolute",
                        left: "50%", transform: "translateX(-50%)",
                        width: "68%", height: "2px",
                        background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
                        boxShadow: `0 0 16px ${RED}`,
                        opacity: 0.8,
                      }}
                    />
                  </div>
                )}

                {/* Flip camera */}
                <button
                  onClick={handleFlipCamera}
                  style={{
                    position: "absolute", bottom: 12, right: 12,
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(234,36,36,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: RED,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(234,36,36,0.1)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.85)" }}
                >
                  <FlipHorizontal style={{ width: 18, height: 18 }} />
                </button>

                {/* Live label */}
                {isStreaming && (
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    background: "rgba(234,36,36,0.85)",
                    borderRadius: "100px", padding: "4px 10px",
                    display: "flex", alignItems: "center", gap: "5px",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>LIVE</span>
                  </div>
                )}
              </>
            )}
          </div>

          <canvas ref={canvasRef} style={{ display: "none" }} />

          {/* Action buttons */}
          {capturedImage ? (
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleRetake}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  background: "#fff", color: "#1a1a1a",
                  border: "1.5px solid #e0e0e0", borderRadius: "14px",
                  padding: "14px", fontSize: "0.95rem", fontWeight: 700,
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = RED; (e.currentTarget as HTMLButtonElement).style.color = RED }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0"; (e.currentTarget as HTMLButtonElement).style.color = "#1a1a1a" }}
              >
                <RotateCcw style={{ width: 17, height: 17 }} />
                Retake
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  background: "linear-gradient(135deg, #ea2424, #c91f1f)",
                  color: "#fff", border: "none", borderRadius: "14px",
                  padding: "14px", fontSize: "0.95rem", fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(234,36,36,0.3)",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(234,36,36,0.4)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(234,36,36,0.3)" }}
              >
                <Scan style={{ width: 17, height: 17 }} />
                Analyse Now
              </button>
            </div>
          ) : (
            <button
              onClick={handleCapture}
              disabled={!isStreaming}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                background: isStreaming ? "linear-gradient(135deg, #ea2424, #c91f1f)" : "#e8e8e8",
                color: isStreaming ? "#fff" : "#aaa",
                border: "none", borderRadius: "14px",
                padding: "16px", fontSize: "1rem", fontWeight: 700,
                cursor: isStreaming ? "pointer" : "not-allowed",
                boxShadow: isStreaming ? "0 8px 28px rgba(234,36,36,0.3)" : "none",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={e => { if (isStreaming) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 36px rgba(234,36,36,0.4)" } }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; if (isStreaming) (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(234,36,36,0.3)" }}
            >
              <Camera style={{ width: 20, height: 20 }} />
              {isStreaming ? "Capture Photo" : "Starting Camera…"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
