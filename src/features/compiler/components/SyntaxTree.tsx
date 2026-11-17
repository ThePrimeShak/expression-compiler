import { useEffect, useMemo, useRef, useState } from "react";

import Tree from "react-d3-tree";

import type { TreeNode } from "@/features/compiler/types";

interface SyntaxTreeProps {
  treeData: TreeNode;
}

const SyntaxTree = ({ treeData }: SyntaxTreeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 320, y: 48 });
  const data = useMemo(() => [treeData], [treeData]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const centerTree = () => {
      setTranslate({ x: container.clientWidth / 2, y: 48 });
    };

    centerTree();
    const resizeObserver = new ResizeObserver(centerTree);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className="border-line bg-panel overflow-hidden rounded-2xl border shadow-xl shadow-black/10">
      <div className="border-line flex items-center justify-between border-b px-5 py-4">
        <div>
          <p className="text-accent mb-1 font-mono text-[10px] tracking-[0.18em] uppercase">
            Stage 02
          </p>
          <h2 className="font-semibold text-white">Abstract syntax tree</h2>
        </div>
        <span className="text-xs text-slate-500">Drag · Zoom · Collapse</span>
      </div>
      <div ref={containerRef} className="bg-ink/45 h-[32rem]">
        <Tree
          data={data}
          orientation="vertical"
          translate={translate}
          collapsible
          zoomable
          initialDepth={Infinity}
          nodeSize={{ x: 125, y: 90 }}
          separation={{ siblings: 1, nonSiblings: 1.25 }}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
        />
      </div>
    </section>
  );
};

export default SyntaxTree;
