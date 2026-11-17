import { useState, type FormEvent } from "react";

import { EXPRESSION_EXAMPLES } from "@/features/compiler/constants";

interface ExpressionFormProps {
  onAnalyze: (expression: string) => void;
}

const ExpressionForm = ({ onAnalyze }: ExpressionFormProps) => {
  const [expression, setExpression] = useState<string>(EXPRESSION_EXAMPLES[0]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAnalyze(expression);
  };

  return (
    <div className="border-line bg-panel/90 rounded-2xl border p-4 shadow-2xl shadow-black/20 sm:p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <label
            htmlFor="expression"
            className="text-sm font-semibold text-slate-200"
          >
            Expression input
          </label>
          <span className="border-accent/20 bg-accent/8 text-accent rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase">
            Ready to compile
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="border-line bg-ink/75 focus-within:border-accent/70 focus-within:ring-accent/10 flex min-w-0 flex-1 items-center rounded-xl border px-4 focus-within:ring-3">
            <span aria-hidden="true" className="text-accent mr-3 font-mono">
              $
            </span>
            <input
              type="text"
              value={expression}
              autoComplete="off"
              spellCheck={false}
              name="expression"
              id="expression"
              onChange={(event) => setExpression(event.target.value)}
              className="min-w-0 flex-1 bg-transparent py-3.5 font-mono text-sm text-slate-100 outline-none placeholder:text-slate-600"
              aria-describedby="expression-help"
            />
          </div>
          <button
            type="submit"
            className="bg-accent-strong text-ink hover:bg-accent inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-teal-950/40 hover:-translate-y-0.5"
          >
            Analyze
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div
          id="expression-help"
          className="mt-4 flex flex-col gap-3 text-xs text-slate-500 lg:flex-row lg:items-center lg:justify-between"
        >
          <p>
            Supports identifiers, numbers,{" "}
            <code className="text-slate-300">sqrt</code>, and operators{" "}
            <code className="text-slate-300">+ − × ÷ ^</code>
          </p>
          <div
            className="flex flex-wrap items-center gap-2"
            aria-label="Example expressions"
          >
            <span>Try:</span>
            {EXPRESSION_EXAMPLES.slice(1).map((example, index) => (
              <button
                key={example}
                type="button"
                onClick={() => setExpression(example)}
                className="border-line cursor-pointer rounded-md border px-2 py-1 font-mono text-[10px] text-slate-400 hover:border-slate-500 hover:text-white"
              >
                Example {index + 1}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpressionForm;
