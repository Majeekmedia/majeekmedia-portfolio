/**
 * The page shell. 1600px max, fluid gutters.
 *
 * Replaces the previous `max-w-6xl` (1152px), which left roughly 380px dead on
 * each side at a 1920px viewport and could not support oversized editorial
 * composition at all.
 */
export default function Container({ children, className = "", as: Tag = "div" }) {
  return <Tag className={`mm-shell ${className}`}>{children}</Tag>;
}
