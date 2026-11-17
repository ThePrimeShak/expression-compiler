import { NavLink } from "react-router";

import { SITE_LINKS } from "@/config/site";

const ExternalLinkIcon = () => (
  <svg
    aria-hidden="true"
    className="size-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 13.5V17a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3.5"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.28-1.29-5.28-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.01c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

const Header = () => {
  return (
    <header className="bg-ink/85 sticky top-0 z-50 border-b border-white/8 backdrop-blur-xl">
      <div className="container flex min-h-16 items-center justify-between gap-5">
        <a
          href={SITE_LINKS.linkedIn}
          target="_blank"
          rel="noreferrer"
          aria-label="ThePrimeShak on LinkedIn"
          className="group flex items-center gap-2.5 font-semibold tracking-tight text-white"
        >
          <span className="border-accent/30 bg-accent/10 text-accent group-hover:border-accent/60 group-hover:bg-accent/15 grid size-8 place-items-center rounded-lg border font-mono text-sm">
            &lt;/&gt;
          </span>
          <span className="hidden sm:inline">ThePrimeShak</span>
          <ExternalLinkIcon />
        </a>

        <div className="flex items-center gap-5 sm:gap-7">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-5 text-sm font-medium text-slate-400 sm:gap-7">
              <li>
                <NavLink to="/" className="nav-link hover:text-white">
                  Compiler
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="nav-link hover:text-white">
                  About
                </NavLink>
              </li>
            </ul>
          </nav>

          <a
            href={SITE_LINKS.repository}
            target="_blank"
            rel="noreferrer"
            className="border-line flex items-center gap-2 rounded-lg border bg-white/4 px-3 py-2 text-sm font-semibold text-slate-200 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-white/8"
          >
            <GithubIcon />
            <span className="hidden sm:inline">Repository</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
