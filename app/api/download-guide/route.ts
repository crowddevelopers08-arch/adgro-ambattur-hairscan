import { NextRequest, NextResponse } from "next/server"

type Section = { heading: string; items: string[] }

interface Guide {
  title: string
  subtitle: string
  sections: Section[]
  disclaimer: string
}

const guides: Record<string, Guide> = {
  "hair-fall": {
    title: "HAIR FALL REPORT",
    subtitle: "Problem Detected: Hair Fall",
    sections: [
      {
        heading: "Summary",
        items: [
          "You are experiencing excessive hair fall beyond normal shedding.",
          "This may be due to stress, hormonal imbalance, poor nutrition, or weak hair roots.",
        ],
      },
      {
        heading: "Solution",
        items: [
          "Growth Refactor - Controls hair fall and strengthens roots",
          "GFC - Improves regrowth and thickness",
          "Mesotherapy - Nourishes scalp",
          "OLT - Supports root strength",
          "Combination treatment may be recommended.",
        ],
      },
      {
        heading: "Stage & What You Should Do",
        items: [
          "Early Stage: Start OLT + scalp care. Hair fall can be controlled quickly.",
          "Moderate Stage: Growth Refactor / GFC sessions required. Strengthens follicles and reduces fall.",
          "Advanced Stage: Growth Refactor + GFC + supportive therapies. Prevent further loss and improve density.",
        ],
      },
      {
        heading: "Bonitaa Expertise",
        items: [
          "97% Success Rate",
          "5+ Years Of Experience",
          "2,000+ Happy Patients",
          "10+ Certified Doctors",
          "Adgro Hair Ambattur, Ambattur, Thiruvallur",
        ],
      },
      {
        heading: "Contact",
        items: [
          "Adgro Hair Ambattur",
          "Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053",
          "customercare@adgrohairambattur.in",
          "+91 7409256789",
          "Book Consultation Now",
        ],
      },
    ],
    disclaimer: "This report is informational and does not replace a doctor consultation.",
  },
  "crown-thinning": {
    title: "CROWN THINNING REPORT",
    subtitle: "Problem Detected: Crown Thinning",
    sections: [
      {
        heading: "Summary",
        items: [
          "Hair density is reducing at the crown area, often an early sign of pattern baldness.",
        ],
      },
      {
        heading: "Solution",
        items: [
          "Growth Refactor - Activates weak follicles",
          "GFC - Improves crown density",
          "Mesotherapy - Strengthens scalp",
          "Hair Transplant - For advanced stages",
        ],
      },
      {
        heading: "Stage & What You Should Do",
        items: [
          "Early Stage: OLT + scalp care. Can reverse thinning.",
          "Moderate Stage: Growth Refactor / GFC recommended. Visible density improvement.",
          "Advanced Stage: Hair Transplant. Permanent restoration.",
        ],
      },
      {
        heading: "Bonitaa Expertise",
        items: [
          "97% Success Rate",
          "5+ Years Of Experience",
          "2,000+ Happy Patients",
          "10+ Certified Doctors",
          "Adgro Hair Ambattur, Ambattur, Thiruvallur",
        ],
      },
      {
        heading: "Contact",
        items: [
          "Adgro Hair Ambattur",
          "Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053",
          "customercare@adgrohairambattur.in",
          "+91 7409256789",
          "Book Consultation Now",
        ],
      },
    ],
    disclaimer: "This report is informational and does not replace a doctor consultation.",
  },
  "frontal-hair-loss": {
    title: "FRONTAL HAIR LOSS REPORT",
    subtitle: "Problem Detected: Frontal Hair Loss",
    sections: [
      {
        heading: "Summary",
        items: [
          "Hairline recession or thinning in the front area is noticed.",
          "This is often caused by genetics, stress, or hormonal changes.",
        ],
      },
      {
        heading: "Solution",
        items: [
          "Growth Refactor - Slows hairline recession",
          "GFC - Improves hair thickness",
          "Mesotherapy - Nourishes follicles",
          "Hair Transplant - Rebuilds hairline",
        ],
      },
      {
        heading: "Stage & What You Should Do",
        items: [
          "Early Stage: OLT + preventive care. Slows down hairline loss.",
          "Moderate Stage: Growth Refactor / GFC. Strengthens and regrows hair.",
          "Advanced Stage: Hair Transplant. Restores natural hairline.",
        ],
      },
      {
        heading: "Bonitaa Expertise",
        items: [
          "97% Success Rate",
          "5+ Years Of Experience",
          "2,000+ Happy Patients",
          "10+ Certified Doctors",
          "Adgro Hair Ambattur, Ambattur, Thiruvallur",
        ],
      },
      {
        heading: "Contact",
        items: [
          "Adgro Hair Ambattur",
          "Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053",
          "customercare@adgrohairambattur.in",
          "+91 7409256789",
          "Book Consultation Now",
        ],
      },
    ],
    disclaimer: "This report is informational and does not replace a doctor consultation.",
  },
  "dandruff-scalp-issues": {
    title: "DANDRUFF / SCALP ISSUE REPORT",
    subtitle: "Problem Detected: Dandruff / Scalp Issues",
    sections: [
      {
        heading: "Summary",
        items: [
          "Flaky scalp, itching, or irritation is affecting your hair health and growth.",
        ],
      },
      {
        heading: "Solution",
        items: [
          "Anti-Dandruff Therapy - Clears scalp",
          "OLT - Improves scalp health",
          "Mesotherapy - Nourishes roots",
          "Healthy scalp = Better hair growth",
        ],
      },
      {
        heading: "Stage & What You Should Do",
        items: [
          "Mild Stage: Scalp care + home remedies. Easily controllable.",
          "Moderate Stage: Clinical dandruff treatment. Reduces irritation and hair fall.",
          "Severe Stage: Advanced scalp therapy. Restores scalp health.",
        ],
      },
      {
        heading: "Bonitaa Expertise",
        items: [
          "97% Success Rate",
          "5+ Years Of Experience",
          "2,000+ Happy Patients",
          "10+ Certified Doctors",
          "Adgro Hair Ambattur, Ambattur, Thiruvallur",
        ],
      },
      {
        heading: "Contact",
        items: [
          "Adgro Hair Ambattur",
          "Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053",
          "customercare@adgrohairambattur.in",
          "+91 7409256789",
          "Book Consultation Now",
        ],
      },
    ],
    disclaimer: "This report is informational and does not replace a doctor consultation.",
  },
  "low-hair-density": {
    title: "LOW HAIR DENSITY REPORT",
    subtitle: "Problem Detected: Low Hair Density",
    sections: [
      {
        heading: "Summary",
        items: [
          "Hair appears thin, flat, and lacks volume due to weak or inactive follicles.",
        ],
      },
      {
        heading: "Solution",
        items: [
          "GFC - Boosts density",
          "Growth Refactor - Strengthens follicles",
          "Mesotherapy - Improves nourishment",
          "Hair Transplant - For advanced thinning",
        ],
      },
      {
        heading: "Stage & What You Should Do",
        items: [
          "Early Stage: OLT + nutrition. Improves thickness.",
          "Moderate Stage: Growth Refactor / GFC. Increases density.",
          "Advanced Stage: Hair Transplant. Restores volume.",
        ],
      },
      {
        heading: "Bonitaa Expertise",
        items: [
          "97% Success Rate",
          "5+ Years Of Experience",
          "2,000+ Happy Patients",
          "10+ Certified Doctors",
          "Adgro Hair Ambattur, Ambattur, Thiruvallur",
        ],
      },
      {
        heading: "Contact",
        items: [
          "Adgro Hair Ambattur",
          "Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053",
          "customercare@adgrohairambattur.in",
          "+91 7409256789",
          "Book Consultation Now",
        ],
      },
    ],
    disclaimer: "This report is informational and does not replace a doctor consultation.",
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const problem = searchParams.get("problem")

  if (!problem || !guides[problem]) {
    return NextResponse.json({ error: "Invalid problem type" }, { status: 400 })
  }

  return NextResponse.json(guides[problem])
}
