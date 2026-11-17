import type { PropsWithChildren } from "react";

interface CodePanelProps extends PropsWithChildren {
  eyebrow: string;
  title: string;
}

const CodePanel = ({ eyebrow, title, children }: CodePanelProps) => (
  <section className="border-line bg-panel overflow-hidden rounded-2xl border shadow-xl shadow-black/10">
    <div className="border-line border-b px-5 py-4">
      <p className="text-accent mb-1 font-mono text-[10px] tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-semibold text-white">{title}</h2>
    </div>
    <div className="p-5">{children}</div>
  </section>
);

export default CodePanel;
