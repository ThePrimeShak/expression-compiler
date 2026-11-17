import CompilerWorkspace from "@/features/compiler/components/CompilerWorkspace";

const COMPILER_STAGES = ["Lex", "Parse", "Generate"] as const;

const HomePage = () => {
  return (
    <>
      <section className="container pt-16 pb-9 text-center sm:pt-20 sm:pb-12">
        <div className="border-line mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border bg-white/3 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">
          <span className="bg-accent size-1.5 rounded-full shadow-[0_0_10px_#5eead4]" />
          Interactive compiler pipeline
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl leading-[1.08] font-bold tracking-[-0.04em] text-white sm:text-6xl">
          See an expression become{" "}
          <span className="text-accent">intermediate code.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Explore lexical analysis, syntax tree generation, and three-address
          code in one visual pipeline. Built as a university compiler design
          project.
        </p>

        <div
          className="mt-7 flex items-center justify-center gap-2"
          aria-label="Compiler stages"
        >
          {COMPILER_STAGES.map((stage, index) => (
            <div key={stage} className="flex items-center gap-2">
              <span className="border-line bg-panel rounded-lg border px-3 py-1.5 font-mono text-[10px] text-slate-300">
                {String(index + 1).padStart(2, "0")} · {stage}
              </span>
              {index < COMPILER_STAGES.length - 1 ? (
                <span className="text-slate-700">→</span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <CompilerWorkspace />
    </>
  );
};

export default HomePage;
