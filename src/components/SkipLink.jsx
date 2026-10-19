/**
 * A skipping link. Keyboard users should not have to tab the nav to reach the
 * content. Cheap to add, and the previous site had none.
 */
export default function SkipLink({ href = "#main" }) {
  return (
    <a href={href} className="mm-skip">
      Skip to content
    </a>
  );
}
