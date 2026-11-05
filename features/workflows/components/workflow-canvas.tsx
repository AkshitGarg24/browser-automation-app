"use client"

import { useCallback, useSyncExternalStore } from "react"
import {
  addEdge,
  Connection,
  Controls,
  Edge,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useTheme } from "next-themes"

interface WorkflowCanvasProps {
  workflowId?: string
}

const emptySubscribe = () => () => {}

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "1. Trigger / Start" },
    position: { x: 80, y: 150 },
  },
  {
    id: "2",
    type: "default",
    data: { label: "2. Open Browser & Navigate" },
    position: { x: 320, y: 150 },
  },
  {
    id: "3",
    type: "default",
    data: { label: "3. Extract Table Data" },
    position: { x: 580, y: 150 },
  },
  {
    id: "4",
    type: "output",
    data: { label: "4. Save & Finish" },
    position: { x: 820, y: 150 },
  },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4" },
]

export function WorkflowCanvas({ workflowId }: WorkflowCanvasProps) {
  const { resolvedTheme } = useTheme()
  const mounted = useIsMounted()
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const colorMode = mounted
    ? resolvedTheme === "dark"
      ? "dark"
      : "light"
    : "light"

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={colorMode}
        fitView
      >
        <Controls />
        {workflowId && (
          <Panel
            position="top-right"
            className="rounded-md border bg-card/80 p-2 text-xs shadow-xs backdrop-blur-xs"
          >
            Workflow ID: <span className="font-mono">{workflowId}</span>
          </Panel>
        )}
      </ReactFlow>
    </div>
  )
}
