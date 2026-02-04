import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

function getStyles(variant, disabled) {
  if (variant === "vibrant") {
    return (
      "btn-vibrant " +
      (disabled ? "opacity-60 cursor-not-allowed hover:scale-100" : "")
    );
  }

  if (variant === "outline-vibrant") {
    return (
      "btn-outline-vibrant " +
      (disabled ? "opacity-60 cursor-not-allowed" : "")
    );
  }

  if (variant === "primary") {
    return (
      "btn-vibrant " +
      (disabled ? "opacity-60 cursor-not-allowed hover:scale-100" : "")
    );
  }

  // secondary (light background style)
  return (
    "bg-white border-2 border-vibrant/20 text-vibrant hover:bg-vibrant/5 hover:border-vibrant/40 " +
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