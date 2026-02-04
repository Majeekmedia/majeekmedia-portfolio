import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold " +
  "transition focus:outline-none focus:ring-2 focus:ring-accent-600 " +
  "focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950";

function getStyles(variant, disabled) {
  if (variant === "primary") {
    return (
      "bg-accent-600 text-white hover:bg-accent-700 shadow-soft " +
      (disabled ? "opacity-60 cursor-not-allowed hover:bg-accent-600" : "")
    );
  }

  // secondary
  return (
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 " +
    "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 " +
    (disabled ? "opacity-60 cursor-not-allowed" : "")
  );
}

export function ButtonLink({ to, variant = "primary", children, className = "" }) {
  return (
    <Link to={to} className={`${base} ${getStyles(variant, false)} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  type = "button",
  variant = "primary",
  disabled,
  children,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${getStyles(variant, disabled)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}