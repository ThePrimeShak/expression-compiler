import { lazy, Suspense, useState } from "react";

import CodePanel from "@/features/compiler/components/CodePanel";
import type { CompilerResult } from "@/features/compiler/types";

const SyntaxTree = lazy(
  () => import("@/features/compiler/components/SyntaxTree")
);

interface CompilerResultsProps {
  result: CompilerResult;
}

const CompilerResults = ({ result }: CompilerResultsProps) => {
  const [areTokensVisible, setAreTokensVisible] = useState(false);

  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
      <div className="flex flex-col gap-5">
        <CodePanel eyebrow="Stage 01" title="Lexical analysis">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-300">
                {result.tokens.length}
              </span>{" "}
              tokens identified
            </p>
            <button
              onClick={() => setAreTokensVisible((visible) => !visible)}
              type="button"
              aria-expanded={areTokensVisible}
              className="text-accent cursor-pointer text-xs font-semibold hover:text-white"
            >
              {areTokensVisible ? "Hide tokens" : "Inspect tokens"}
            </button>
          </div>

          {areTokensVisible ? (
            <pre className="border-line bg-ink max-h-64 overflow-auto rounded-xl border p-4 font-mono text-xs leading-5 text-slate-300">
              {JSON.stringify(result.tokens, null, 2)}
            </pre>
          ) : null}

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-slate-500">
              Transformed identifiers
            </p>
            <pre className="border-line bg-ink text-accent overflow-x-auto rounded-xl border p-4 font-mono text-xs leading-6 whitespace-pre-wrap">
              {result.transformedExpression}
            </pre>
          </div>
        </CodePanel>

        <CodePanel eyebrow="Stage 03" title="Three-address code">
          <div className="border-line bg-ink overflow-hidden rounded-xl border">
            <div className="border-line flex gap-1.5 border-b px-4 py-3">
              <span className="size-2 rounded-full bg-red-400/80" />
              <span className="bg-warm/80 size-2 rounded-full" />
              <span className="bg-accent-strong/80 size-2 rounded-full" />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-7 text-slate-200">
              {formatInstructions(result.threeAddressCode)}
            </pre>
          </div>
        </CodePanel>
      </div>

      <Suspense fallback={<SyntaxTreeSkeleton />}>
        <SyntaxTree treeData={result.syntaxTree} />
      </Suspense>
    </div>
  );
};

const SyntaxTreeSkeleton = () => (
  <div className="border-line bg-panel grid min-h-[36rem] place-items-center rounded-2xl border text-sm text-slate-500">
    Loading syntax tree…
  </div>
);

function formatInstructions(instructions: string[]) {
  if (instructions.length === 0) return "No TAC";

  return instructions
    .map(
      (instruction, index) =>
        `${String(index + 1).padStart(2, "0")}  ${instruction}`
    )
    .join("\n");
}

export default CompilerResults;
