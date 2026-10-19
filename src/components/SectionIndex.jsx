import Reveal from "./Reveal.jsx";
import Rule from "./Rule.jsx";

/**
 * A section header.
 *
 * DELIBERATELY HAS NO INDEX NUMERAL.
 *
 * An earlier version rendered `01` / `02` / `03` above every section heading. It
 * was removed for two reasons:
 *
 *  1. It is the banned "section-number eyebrow" pattern. A numeral that only
 *     counts positions carries no information a reader needs, and it is one of
 *     the most reliable AI-generated-design tells.
 *  2. It COLLIDED with the numbered project sections, which are the numbering
 *     the brief actually asks for. Two competing number sequences in one page is
 *     genuinely confusing, not merely untidy.
 *
 * Numbering exists in exactly one place, and it means something: the project
 * spreads, where 01 and 02 identify real, referable work.
 *
 * The heading uses the `lines` reveal variant. The caller supplies the line
 * breaks, so nothing has to measure where lines fall.
 */
export default function SectionIndex({ title, titleLines, lead, id }) {
  return (
    <header className="mb-10 md:mb-14">
      <Rule draw className="mb-8" />

      {titleLines ? (
        /*
         * `aria-label` carries the real title because the visual spans are
         * line fragments with no whitespace between them. Without it the
         * accessible name, and any copy-paste, reads "What Iwork with".
         */
        <Reveal
          as="h2"
          variant="lines"
          id={id}
          className="max-w-[22ch]"
          aria-label={titleLines.join(" ")}
        >
          {titleLines.map((line) => (
            <span key={line} aria-hidden="true">
              {line}
            </span>
          ))}
        </Reveal>
      ) : (
        <h2 id={id} className="max-w-[22ch]">
          {title}
        </h2>
      )}

      {lead ? (
        <p className="mt-5 max-w-[58ch] leading-relaxed text-mm-text-muted">{lead}</p>
      ) : null}
    </header>
  );
}
