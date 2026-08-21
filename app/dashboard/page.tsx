import { auth } from "@clerk/nextjs/server"

export default async function DashboardPage() {
  const { userId } = await auth.protect()

  return (
    <div className="flex min-h-svh flex-col gap-4 p-6 text-sm leading-loose">
      <div>
        <h1 className="font-medium">Dashboard</h1>
        <p>
          Only signed-in users can see this. Your ID:{" "}
          <code className="font-mono text-xs">{userId}</code>
        </p>
      </div>
    </div>
  )
}
