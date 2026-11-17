import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <section className="container flex min-h-[65vh] items-center justify-center py-16 text-center">
      <div>
        <p className="text-accent font-mono text-sm tracking-[0.2em] uppercase">
          Error 404
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
          Unexpected token.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          The parser could not find the page you requested. Return to the
          compiler and try another expression.
        </p>
        <Link
          to="/"
          className="bg-accent-strong text-ink hover:bg-accent mt-8 inline-flex rounded-xl px-5 py-3 text-sm font-bold hover:-translate-y-0.5"
        >
          Back to compiler
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
