import Link from "next/link";
import type { ToolItem } from "@/lib/tool-data";

export function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link href={tool.url} className="cUsage">
      <div className="boxUsage">
        <div className="hoverBox" />
        <div className="title">{tool.title}</div>
        <div className="sub">{tool.sub}</div>
      </div>
    </Link>
  );
}
