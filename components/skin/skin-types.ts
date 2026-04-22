"use client"

export type SkinProblem =
  | "acne"
  | "pigmentation"
  | "dullness"
  | "tanning"
  | "uneven-skin-tone"
  | "open-pores"
  | ""

export type SkinFormData = {
  name: string
  phone: string
  email: string
  location: string
  problem: SkinProblem
}
