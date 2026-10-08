import { auth } from "@clerk/nextjs/server";
import { OrganizationProfile } from "@clerk/nextjs";

export default async function DashboardPage() {
  const { userId, orgId } = await auth.protect();

  return (
    <div className="flex min-h-svh flex-col gap-4 p-6 text-sm leading-loose">
      <div>
        <h1 className="font-medium">Dashboard</h1>
        <p>
          Only signed-in users can see this. Your ID:{" "}
          <code className="font-mono text-xs">{userId}</code>
        </p>
        {orgId ? (
          <div className="mt-6">
            <OrganizationProfile />
          </div>
        ) : (
          <p className="mt-6 text-muted-foreground">
            You don&apos;t have an active organization. Use the OrganizationSwitcher
            to create or select one.
          </p>
        )}
      </div>
    </div>
  )
}
