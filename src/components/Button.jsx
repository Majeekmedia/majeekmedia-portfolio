import { Link } from "react-router-dom";

/**
 * Buttons.
 *
 * Two variants only:
 *   accent — the ONE primary action per viewport. Accent fill, near-black label
 *            (16.10:1). There is one per screen, deliberately.
 *   ghost  — every secondary action.
 *
 * Labels are kept to 1-3 words so they never wrap at desktop. `white-space:
 * nowrap` is enforced in `.mm-btn` so a wrap is impossible rather than unlikely.
 *
 * Every button and link uses the same focus ring (`:focus-visible` in the base
 * layer), which is why there is no per-component focus styling here.
 *
 * The previous site shipped SIX different labels for a single "contact" intent
 * (Start a Project, Get In Touch, Get in Touch, Let's Work Together, Let's Build
 * Something Great, Read More About Me). One intent now has one label: GET IN TOUCH.
 */

const base = "mm-btn";

export function ButtonLink({
  to,
  href,
  variant = "ghost",
  children,
  className = "",
  ...rest
}) {
  const cls = `${base} ${variant === "accent" ? "mm-btn-accent" : "mm-btn-ghost"} ${className}`;

  // External destinations open in a new tab with the security attributes that
  // `target="_blank"` otherwise leaks.
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  type = "button",
  variant = "ghost",
  children,
  className = "",
  disabled,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variant === "accent" ? "mm-btn-accent" : "mm-btn-ghost"} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
