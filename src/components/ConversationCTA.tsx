import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const TYPEFORM_URL = "https://form.typeform.com/to/Jq0m9fFT";

/**
 * Shared CTA button that opens the Typeform in a new tab.
 * Used in ConversationSection and Footer.
 */
export function ConversationCTA() {
  return (
    <Button
      size="lg"
      variant="outline"
      asChild
      className="conversation-cta-btn rounded-lg px-8 py-6 text-lg font-medium transition-all duration-300 hover:bg-background"
    >
      <a
        href={TYPEFORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
      >
        <span className="relative z-10">Start a conversation</span>
        <ExternalLink className="w-4 h-4 shrink-0 relative z-10" aria-hidden />
      </a>
    </Button>
  );
}
