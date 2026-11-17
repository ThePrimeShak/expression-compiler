import { useState } from "react";

import CompilerResults from "@/features/compiler/components/CompilerResults";
import ExpressionForm from "@/features/compiler/components/ExpressionForm";
import { analyzeExpression } from "@/features/compiler/core/analyze-expression";
import type { CompilerResult } from "@/features/compiler/types";

const CompilerWorkspace = () => {
  const [result, setResult] = useState<CompilerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = (expression: string) => {
    try {
      setResult(analyzeExpression(expression));
      setError(null);
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "An unexpected error occurred."
      );
    }
  };

  return (
    <section className="container" aria-label="Expression compiler workspace">
      <ExpressionForm onAnalyze={handleAnalyze} />

      {error ? (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-400/20 bg-red-400/8 px-4 py-3 text-sm text-red-200"
        >
          <span className="mr-2 font-bold text-red-300">
            Could not analyze:
          </span>
          {error}
        </div>
      ) : null}

      {!result && !error ? <EmptyState /> : null}
      {result ? <CompilerResults result={result} /> : null}
    </section>
  );
};

const EmptyState = () => (
  <div className="border-line mt-5 rounded-2xl border border-dashed py-12 text-center">
    <div className="text-accent mx-auto mb-4 grid size-11 place-items-center rounded-xl bg-white/4 font-mono">
      AST
    </div>
    <p className="font-medium text-slate-300">
      Your compiler output will appear here
    </p>
    <p className="mt-1 text-sm text-slate-600">
      Enter an expression and select Analyze to run the pipeline.
    </p>
  </div>
);

export default CompilerWorkspace;
