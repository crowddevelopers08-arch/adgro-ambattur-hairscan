import { Suspense } from "react"
import { ReportPage } from "@/components/report-page"

export default function Page() {
  return (
    <Suspense>
      <ReportPage />
    </Suspense>
  )
}
