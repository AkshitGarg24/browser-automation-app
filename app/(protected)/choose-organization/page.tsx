import { Suspense } from "react"
import { TaskChooseOrganization } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

import { ChooseOrgToast } from "./choose-org-toast"

export default async function ChooseOrganizationPage() {
  await auth.protect()

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={null}>
        <ChooseOrgToast />
      </Suspense>
      <TaskChooseOrganization redirectUrlComplete="/" />
    </div>
  )
}
