import { useState } from "react";
import Reveal from "./Reveal.jsx";
import Rule from "./Rule.jsx";
import TiltPlate from "./TiltPlate.jsx";
import PhoneFrame from "./PhoneFrame.jsx";
import { derivative, thumbnail } from "../lib/images.js";

/**
 * Display sizes, in one place.
 *
 * These are the numbers that matter for image sourcing: the phone bezel is this
 * wide, so a screenshot never needs to be wider than 2x this for a retina screen.
 * A single set of constants makes that explicit rather than scattered through
 * class names.
 */
const sizes = {
  phoneWidth: 200, // px, the primary bezel width. 2x = 400px source is plenty.
  phoneWidthSmall: 156, // px, for the additional screens beside the lead.
};

/**
 * The numbered editorial project showcase.
 *
 * Replaces `ProjectCard` + `ImageGallery`, which wrapped every image in a
 * bordered rounded card with a `1 / 3` overlay counter and a "click thumbnails
 * to navigate" tip: chrome without information.
 *
 * DESKTOP AND MOBILE SHOTS ARE PRESENTED SEPARATELY. VHM ships three 1920x891
 * desktop captures and three 720x1600 phone captures. Clicking between them in
 * one frame is jarring, and forcing the phones into a landscape frame crops them
 * to a ribbon. So the spread renders a large lead plate plus, where the project
 * has them, a row of phone plates at their own portrait ratio. Orientation comes
 * from the manifest, so nothing needs manual tagging.
 *
 * HONESTY RULES ENFORCED HERE:
 *  - `outcomeIsReported` makes a client-reported figure carry an explicit
 *    "Reported by the client" qualifier rather than reading as measured data.
 *  - `challenge` / `solution` render only when the owner supplied them.
 *  - A null link renders nothing. No dead links.
 *  - `status` distinguishes live / completed / in-progress.
 */

function StatusMark({ status, label }) {
  // One accent mark is allowed here: status is REAL semantic state, which is the
  // documented exception to the no-decorative-dots rule.
  const isLive = status === "active";
  return (
    <span className="mm-label inline-flex items-center gap-2">
      {isLive ? (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-mm-accent" aria-hidden="true" />
      ) : null}
      {label}
    </span>
  );
}

function MetaRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-mm-line py-3 last:border-b-0">
      <dt className="mm-label">{label}</dt>
      <dd className="text-small text-mm-text-muted">{value}</dd>
    </div>
  );
}

/** Split a project's images by orientation, using the manifest. */
function groupImages(images = []) {
  const desktop = [];
  const mobile = [];
  for (const image of images) {
    const { portrait } = derivative(image.src);
    (portrait ? mobile : desktop).push(image);
  }
  return { desktop, mobile };
}

export default function ProjectSpread({ project, headingLevel = "h2" }) {
  const { desktop, mobile } = groupImages(project.images);
  const [active, setActive] = useState(0);

  /*
   * THE LEAD, AND WHY THIS BRANCHES ON DISCIPLINE.
   *
   * A web project has landscape captures, so the lead is the selected one of
   * those and the rest become a switcher.
   *
   * A mobile project is portrait-only. The earlier version took the first phone
   * capture as the lead and set `phoneStrip = []` whenever landscape shots
   * existed, which meant a mobile project showed ONE screenshot and silently
   * dropped the other five. They were never hidden on purpose; the condition was
   * just wrong.
   *
   * So the rule is stated plainly instead:
   *   - mobile project  -> every capture goes in a device frame, lead included
   *   - web project     -> landscape captures get the big plate and switcher,
   *                        plus any portrait captures below
   */
  const isMobile = project.discipline === "mobile";
  const leadShots = isMobile ? mobile : desktop;
  const current = leadShots[Math.min(active, leadShots.length - 1)];

  // Everything except the current lead, shown beneath. A mobile project frames
  // them all; a web project frames only the portrait ones.
  const remainingPhones = isMobile
    ? mobile.filter((image) => image.src !== current?.src)
    : mobile;

  /* The web lead plate only makes sense with a landscape capture. */
  const showPlateLead = !isMobile && Boolean(current);

  /*
   * Heading level is a prop, not a constant.
   *
   * On `/portfolio/:slug` the project title IS the page title, so it must be `h1`
   * or the page has no `h1` at all: a real SEO and screen-reader defect, since
   * the h1 is what names the document. When the spread is rendered inside an
   * index it must sit below that index's own `h1`, so `h2` is correct there.
   */
  const Title = headingLevel;
  const Sub = headingLevel === "h1" ? "h2" : "h3";

  return (
    <article
      id={project.slug}
      className="mm-section-lg border-t border-mm-line"
      aria-labelledby={`${project.slug}-title`}
    >
      {/* Header: index numeral, title, status */}
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-1">
          <span className="mm-index" aria-hidden="true">
            {project.index}
          </span>
        </div>

        <div className="md:col-span-7">
          <Title id={`${project.slug}-title`} className="text-[clamp(1.75rem,4vw,3rem)]">
            {project.title}
          </Title>
          <p className="mt-3 text-small text-mm-text-muted">{project.category}</p>
        </div>

        <div className="md:col-span-4 md:justify-self-end">
          <StatusMark status={project.status} label={project.statusLabel} />
        </div>
      </div>

      {/*
       * MOBILE PROJECTS: every capture in a device frame.
       *
       * The lead one is larger, the rest sit beside it. `flex-wrap` rather than a
       * horizontal scroller, because a scroller hides screens past the fold with
       * no hint they exist.
       */}
      {isMobile ? (
        <Reveal className="mt-12 md:mt-16">
          <div className="flex flex-wrap items-start justify-center gap-6 sm:justify-start sm:gap-8">
            {mobile.map((image, i) => (
              <PhoneFrame
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={i === 0 ? sizes.phoneWidth : sizes.phoneWidthSmall}
                sizes={`${i === 0 ? sizes.phoneWidth : sizes.phoneWidthSmall}px`}
                priority={i === 0}
              />
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* Lead plate. Web projects only: a mobile lead is the first device frame below. */}
      {showPlateLead ? (
        <Reveal className="mt-12 md:mt-16">
          <TiltPlate
            src={current.src}
            alt={current.alt}
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="w-full"
          />

          {/* Switcher: only when there is more than one landscape capture. */}
          {desktop.length > 1 ? (
            <div
              className="mm-scroll-x mm-scroll mt-4 flex gap-3 pb-2"
              role="group"
              aria-label={`${project.title} screenshots`}
            >
              {desktop.map((image, i) => {
                const thumb = thumbnail(image.src);
                return (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show screenshot ${i + 1} of ${desktop.length}`}
                    aria-current={i === active}
                    className={`mm-snap-item h-14 w-24 shrink-0 border transition-colors duration-fast ease-mm ${
                      i === active
                        ? "border-mm-accent"
                        : "border-mm-line hover:border-mm-line-control"
                    }`}
                  >
                    {/*
                     * `thumbnail()` returns the SMALLEST derivative. Using
                     * `derivative()` here meant a 96px thumbnail downloaded a
                     * 1920px capture, which measured as ~180 KB of waste across
                     * three thumbnails at a phone viewport.
                     */}
                    <img
                      src={thumb.src}
                      srcSet={thumb.srcSet}
                      sizes="96px"
                      alt=""
                      width={96}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </Reveal>
      ) : null}

      {/* Device frames: the lead for a mobile project, plus any portrait captures */}
      {!isMobile && remainingPhones.length ? (
        <Reveal className="mt-12">
          <Sub className="mm-label mb-6">On mobile</Sub>
          <div className="flex flex-wrap items-start justify-center gap-6 sm:justify-start sm:gap-8">
            {remainingPhones.map((image) => (
              <PhoneFrame
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={sizes.phoneWidth}
                sizes={`${sizes.phoneWidth}px`}
              />
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* Body: description left, facts right */}
      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <p className="text-lg leading-relaxed text-mm-text-muted">{project.summary}</p>

          {project.problem ? (
            <div className="mt-10">
              <Sub className="mm-label mb-3">The problem</Sub>
              <p className="text-mm-text-muted">{project.problem}</p>
            </div>
          ) : null}

          {project.challenge ? (
            <div className="mt-10">
              <Sub className="mm-label mb-3">Technical challenge</Sub>
              <p className="text-mm-text-muted">{project.challenge}</p>
            </div>
          ) : null}

          {project.solution ? (
            <div className="mt-10">
              <Sub className="mm-label mb-3">Approach</Sub>
              <p className="text-mm-text-muted">{project.solution}</p>
            </div>
          ) : null}
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <dl>
            <MetaRow label="Role" value={project.role?.join(", ")} />
            <MetaRow label="Stack" value={project.tech?.join(", ")} />
          </dl>

          {project.outcome ? (
            <div className="mt-8 border-t border-mm-line pt-6">
              <Sub className="mm-label mb-3">Outcome</Sub>
              <p className="text-mm-text-muted">{project.outcome}</p>
              {project.outcomeIsReported ? (
                <p className="mt-3 text-small text-mm-text-muted">
                  Reported by the client. Not independently measured.
                </p>
              ) : null}
            </div>
          ) : null}

          {project.note ? (
            <div className="mt-8 border-l-2 border-mm-accent bg-mm-surface p-4">
              <p className="text-small text-mm-text">{project.note}</p>
            </div>
          ) : null}

          {project.link ? (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mm-underline mt-8 inline-block text-mm-accent"
            >
              {project.link.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>

      {/* Features: rules in two columns, no card */}
      {project.features?.length ? (
        <div className="mt-16">
          <Rule />
          <Sub className="mm-label py-5">What it does</Sub>
          <ul className="grid gap-x-10 border-t border-mm-line md:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="border-b border-mm-line py-4 text-small text-mm-text-muted"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
