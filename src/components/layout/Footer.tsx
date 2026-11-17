import { SITE_LINKS } from "@/config/site";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/8 py-7 text-slate-500">
      <div className="container flex flex-col items-center justify-between gap-2 text-center text-xs sm:flex-row sm:text-left">
        <p>Expression Compiler · A compiler design course project</p>
        <p>
          Designed &amp; built by{" "}
          <a
            href={SITE_LINKS.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent font-semibold text-slate-300"
          >
            ThePrimeShak
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
