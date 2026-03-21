import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LINK_CLASS =
  "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary-text dark:hover:text-section-heading transition-colors";

/**
 * Consistent "Back to work" link used on project detail and locked project pages.
 */
export function BackToWorkLink({ className }: { className?: string }) {
  return (
    <Link to="/#work" className={className ?? LINK_CLASS}>
      <ArrowLeft className="w-4 h-4" />
      Back to work
    </Link>
  );
}
