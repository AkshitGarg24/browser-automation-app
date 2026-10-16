"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export function ChooseOrgToast() {
  const searchParams = useSearchParams()

  React.useEffect(() => {
    if (searchParams.get("error") === "org-required") {
      toast.error("An organization is required before creating a workflow.")

      const url = new URL(window.location.href)
      url.searchParams.delete("error")
      window.history.replaceState({}, "", url.pathname + url.search)
    }
  }, [searchParams])

  return null
}
