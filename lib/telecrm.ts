type TelecrmLeadInput = {
  name: string
  phone: string
  email?: string
  location?: string
  problem: string
  formName: string
  sourceUrl: string
}

type TelecrmResponse = {
  modifiedLeadIds?: string[]
  status?: string
  errorString?: string
  uniqueIdentifier?: string
}

export type TelecrmSyncResult = {
  status: string
  leadIds: string[]
  error: string
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "")
}

function getTelecrmHeaders(apiKey: string) {
  const authScheme = process.env.TELECRM_AUTH_SCHEME?.trim() || "Bearer"

  return {
    "Content-Type": "application/json",
    Authorization: `${authScheme} ${apiKey}`,
    "x-api-key": apiKey,
  }
}

export async function syncLeadToTelecrm(input: TelecrmLeadInput): Promise<TelecrmSyncResult> {
  const apiUrl = process.env.TELECRM_API_URL?.trim()
  const apiKey = process.env.TELECRM_API_KEY?.trim()

  if (!apiUrl || !apiKey) {
    return {
      status: "skipped",
      leadIds: [],
      error: "TeleCRM API URL or API key is not configured.",
    }
  }

  const payload = {
    fields: {
      phone: normalizePhone(input.phone),
      name: input.name.trim(),
      email: input.email?.trim() || "",
      location: input.location?.trim() || "",
      problem: input.problem,
      form_name: input.formName,
      source_url: input.sourceUrl,
      live_url: input.sourceUrl,
    },
    actions: [
      {
        type: process.env.TELECRM_LEAD_DETAILS_ACTION || "ACTION_LEAD_DETAILS",
        fields: {
          name: input.name.trim(),
          phone: normalizePhone(input.phone),
          email: input.email?.trim() || "",
          location: input.location?.trim() || "",
          problem: input.problem,
          form_name: input.formName,
          source_url: input.sourceUrl,
          live_url: input.sourceUrl,
        },
      },
    ],
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: getTelecrmHeaders(apiKey),
      body: JSON.stringify(payload),
    })

    const text = await response.text()
    const data = text ? (JSON.parse(text) as TelecrmResponse) : {}

    if (!response.ok || data.status?.toLowerCase() === "error") {
      return {
        status: "error",
        leadIds: data.modifiedLeadIds ?? [],
        error: data.errorString || `TeleCRM request failed with status ${response.status}`,
      }
    }

    return {
      status: data.status || "synced",
      leadIds: data.modifiedLeadIds ?? [],
      error: "",
    }
  } catch (error) {
    return {
      status: "error",
      leadIds: [],
      error: error instanceof Error ? error.message : "TeleCRM request failed.",
    }
  }
}
