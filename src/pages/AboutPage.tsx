import { SITE_LINKS } from "@/config/site";

const CONCEPTS = [
  {
    number: "01",
    title: "Tokenize",
    description:
      "Recognizes identifiers, numbers, functions, operators, and grouping symbols.",
  },
  {
    number: "02",
    title: "Parse",
    description:
      "Builds an abstract syntax tree while respecting precedence and associativity.",
  },
  {
    number: "03",
    title: "Generate",
    description:
      "Walks the tree to produce a compact three-address intermediate representation.",
  },
] as const;

const TECHNOLOGIES = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Vite",
  "D3 Tree",
] as const;

const AboutPage = () => {
  return (
    <section className="container py-16 sm:py-24" aria-labelledby="about-title">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="text-accent mb-4 font-mono text-xs tracking-[0.2em] uppercase">
            About the project
          </p>
          <h1
            id="about-title"
            className="text-4xl leading-tight font-bold tracking-[-0.035em] text-white sm:text-5xl"
          >
            Compiler concepts, made tangible.
          </h1>
          <p className="mt-6 leading-7 text-slate-400">
            Expression Compiler is an educational web app created for a
            university compiler design course. It turns a mathematical
            expression into visible outputs for each major stage of a simple
            compiler.
          </p>
          <p className="mt-4 leading-7 text-slate-400">
            The project is implemented entirely in TypeScript with React, and
            uses an interactive tree to make the parser&apos;s output easier to
            inspect and understand.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {TECHNOLOGIES.map((technology) => (
              <span
                key={technology}
                className="border-line rounded-lg border bg-white/3 px-3 py-1.5 font-mono text-[11px] text-slate-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {CONCEPTS.map(({ number, title, description }) => (
            <article
              key={number}
              className="group border-line bg-panel rounded-2xl border p-5 hover:border-slate-500 sm:p-6"
            >
              <div className="flex gap-5">
                <span className="text-accent font-mono text-sm">{number}</span>
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-white">
                    {title}
                  </h2>
                  <p className="text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}

          <div className="border-accent/20 bg-accent/6 mt-6 rounded-2xl border p-6">
            <p className="text-sm leading-6 text-slate-300">
              Created by{" "}
              <a
                href={SITE_LINKS.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="text-accent font-semibold hover:text-white"
              >
                ThePrimeShak
              </a>
              . The full source code is available on{" "}
              <a
                href={SITE_LINKS.repository}
                target="_blank"
                rel="noreferrer"
                className="text-accent font-semibold hover:text-white"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
