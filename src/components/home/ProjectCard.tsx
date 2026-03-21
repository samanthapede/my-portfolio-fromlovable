import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectTagLine, getProjectThumbnail } from "@/lib/project-utils";
import { EASING_SMOOTH } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";


const SECTION_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
} as const;

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING_SMOOTH },
  },
} as const;

const THUMBNAIL_SCALE = "scale-100";

type ProjectCardProps = {
  project: Project;
  index: number;
  reducedMotion: boolean;
};

export function ProjectCard({ project, index, reducedMotion }: ProjectCardProps) {
  const thumbnail = getProjectThumbnail(project);
  const tagLine = getProjectTagLine(project);
  const isLocked = project.locked === true;
  const isFirstCard = index === 0;
  const [requestAccessOpen, setRequestAccessOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const REQUEST_ACCESS_EMAIL = "sam@geodedesign.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(REQUEST_ACCESS_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault();
      setRequestAccessOpen(true);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) video.play().catch(() => {});
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) video.play().catch(() => {});
  };

  const imageFit = project.imageCrop?.objectFit ?? "cover";
  const imagePosition = project.imageCrop?.objectPosition ?? "center";

  return (
    <div className="project-card-border-wrapper group transition-transform duration-150 group-active:scale-[0.98] relative">
      {isLocked && (
        <span
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-text dark:bg-secondary text-white dark:text-secondary-foreground border border-primary-text/30 dark:border-secondary-foreground/20 backdrop-blur-sm"
          title="Password protected"
        >
          <Lock className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Locked</span>
        </span>
      )}
      {isLocked ? (
        <div
          role="button"
          tabIndex={0}
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setRequestAccessOpen(true);
            }
          }}
          className="project-card-hover group group/view flex w-full flex-col lg:flex-row text-left rounded-lg overflow-hidden bg-card transition-colors touch-manipulation block cursor-pointer"
          onMouseEnter={(e) => {
            handleMouseEnter(e);
            if (window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches) setTooltipOpen(true);
          }}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
            setTooltipOpen(false);
          }}
          onTouchStart={(e) => {
            handleTouchStart(e);
            setTooltipOpen(false);
          }}
        >
        <div className="w-full lg:w-1/2 aspect-[4/3] flex-shrink-0 bg-muted/50 dark:bg-muted/20 overflow-hidden relative">
          {thumbnail?.type === "videoFile" && thumbnail.url ? (
            <>
              {"poster" in thumbnail && thumbnail.poster && (
                <img
                  src={thumbnail.poster}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover object-center ${THUMBNAIL_SCALE} origin-center`}
                  loading={isFirstCard ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={isFirstCard ? "high" : undefined}
                />
              )}
              <video
                src={thumbnail.url}
                className={`absolute inset-0 w-full h-full object-cover object-center ${THUMBNAIL_SCALE} origin-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100`}
                style={{ objectFit: imageFit, objectPosition: imagePosition }}
                muted
                playsInline
                loop
                preload="none"
                aria-hidden
              />
            </>
          ) : thumbnail?.type === "image" && thumbnail.url ? (
            <img
              src={thumbnail.url}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover object-center ${THUMBNAIL_SCALE} origin-center`}
              style={{ objectFit: imageFit, objectPosition: imagePosition }}
              loading={isFirstCard ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={isFirstCard ? "high" : undefined}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10">
              <div className="w-24 h-24 rounded-lg bg-background/50 dark:bg-background/20 shadow-sm" />
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-10">
          <h3 className="font-semibold text-primary-text dark:text-section-heading text-xl sm:text-2xl lg:text-3xl mb-1 group-hover:text-[#004E95] dark:group-hover:text-[#5B9BD5] transition-all duration-300 ease-in-out">
            {project.title}
          </h3>
          {tagLine && <p className="text-sm text-primary-text/60 dark:text-primary-text/75 mb-4">{tagLine}</p>}
          {project.keywords?.length ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 text-xs font-medium text-primary-text bg-primary-text/10 dark:bg-primary-text/15 rounded-full border border-primary-text/20 dark:border-primary-text/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center text-primary-text dark:text-section-heading text-sm group-hover:text-[#004E95] dark:group-hover:text-[#5B9BD5] transition-colors duration-300 group/view cursor-pointer">
                <span className="relative inline-block origin-left">
                  <span className="invisible font-bold text-sm" aria-hidden="true">
                    {isLocked ? "Request access" : "View"}
                  </span>
                  <span className="absolute left-0 top-0 font-medium group-hover/view:font-bold transition-all duration-200 ease-out">
                    {isLocked ? "Request access" : "View"}
                  </span>
                </span>
                <span className="ml-0.5 shrink-0 transition-all duration-200 ease-out [&>svg]:opacity-70 group-hover/view:[&>svg]:opacity-100">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </span>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                side="bottom"
                align="start"
                collisionPadding={16}
                className="z-[9999] max-w-[min(280px,calc(100vw-2rem))] flex items-center gap-2"
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>This project is password protected. Please contact me to request access.</span>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </div>
        </div>
      ) : (
        <a
          href={project.link}
          className="project-card-hover group group/view flex w-full flex-col lg:flex-row text-left rounded-lg overflow-hidden bg-card transition-colors touch-manipulation block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        >
          <div className="w-full lg:w-1/2 aspect-[4/3] flex-shrink-0 bg-muted/50 dark:bg-muted/20 overflow-hidden relative">
            {thumbnail?.type === "videoFile" && thumbnail.url ? (
              <>
                {"poster" in thumbnail && thumbnail.poster && (
                  <img
                    src={thumbnail.poster}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover object-center ${THUMBNAIL_SCALE} origin-center`}
                    loading={isFirstCard ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={isFirstCard ? "high" : undefined}
                  />
                )}
                <video
                  src={thumbnail.url}
                  className={`absolute inset-0 w-full h-full object-cover object-center ${THUMBNAIL_SCALE} origin-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100`}
                  style={{ objectFit: imageFit, objectPosition: imagePosition }}
                  muted
                  playsInline
                  loop
                  preload="none"
                  aria-hidden
                />
              </>
            ) : thumbnail?.type === "image" && thumbnail.url ? (
              <img
                src={thumbnail.url}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover object-center ${THUMBNAIL_SCALE} origin-center`}
                style={{ objectFit: imageFit, objectPosition: imagePosition }}
                loading={isFirstCard ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={isFirstCard ? "high" : undefined}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10">
                <div className="w-24 h-24 rounded-lg bg-background/50 dark:bg-background/20 shadow-sm" />
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-10">
            <h3 className="font-semibold text-primary-text dark:text-section-heading text-xl sm:text-2xl lg:text-3xl mb-1 group-hover:text-[#004E95] dark:group-hover:text-[#5B9BD5] transition-all duration-300 ease-in-out">
              {project.title}
            </h3>
            {tagLine && <p className="text-sm text-primary-text/60 dark:text-primary-text/75 mb-4">{tagLine}</p>}
            {project.keywords?.length ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 text-xs font-medium text-primary-text bg-primary-text/10 dark:bg-primary-text/15 rounded-full border border-primary-text/20 dark:border-primary-text/30"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : null}
            <span className="inline-flex items-center text-primary-text dark:text-section-heading text-sm group-hover:text-[#004E95] dark:group-hover:text-[#5B9BD5] transition-colors duration-300 group/view cursor-pointer">
              <span className="relative inline-block origin-left">
                <span className="invisible font-bold text-sm" aria-hidden="true">View</span>
                <span className="absolute left-0 top-0 font-medium group-hover/view:font-bold transition-all duration-200 ease-out">View</span>
              </span>
              <span className="ml-0.5 shrink-0 transition-all duration-200 ease-out [&>svg]:opacity-70 group-hover/view:[&>svg]:opacity-100">
                <ArrowRight className="w-4 h-4" />
              </span>
            </span>
          </div>
        </a>
      )}

      {isLocked && (
      <Dialog open={requestAccessOpen} onOpenChange={setRequestAccessOpen}>
        <DialogContent
          className="sm:max-w-md border border-warm-gradient-subtle rounded-lg p-10 sm:p-12 gap-8"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="space-y-4 text-left">
            <DialogTitle className="text-primary-text dark:text-section-heading text-xl sm:text-2xl leading-snug">
              This project is password protected
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              Contact{" "}
              <a
                href={`mailto:${REQUEST_ACCESS_EMAIL}?subject=Request%20access%20to%20project`}
                className="group/email relative inline text-primary-text dark:text-section-heading font-medium underline-offset-4 hover:underline cursor-pointer transition-colors hover:text-[#004E95] dark:hover:text-[#5B9BD5]"
              >
                {REQUEST_ACCESS_EMAIL}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={handleCopyEmail}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-1 inline-flex items-center justify-center rounded p-0.5 opacity-0 group-hover/email:opacity-100 transition-opacity hover:bg-muted focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-1 bg-background shadow-sm"
                  title={copied ? "Copied!" : "Copy email"}
                  aria-label={copied ? "Copied!" : "Copy email"}
                >
                  {copied ? (
                    <span className="text-xs text-green-600 dark:text-green-400 whitespace-nowrap">Copied!</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </a>{" "}
              to request access.
            </DialogDescription>
          </DialogHeader>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="conversation-cta-btn rounded-lg px-8 py-6 text-lg font-medium transition-all duration-300 hover:bg-background w-full sm:w-auto"
          >
            <a href={`mailto:${REQUEST_ACCESS_EMAIL}?subject=Request%20access%20to%20project`}>
              <span className="relative z-10">Contact Now</span>
            </a>
          </Button>
        </DialogContent>
      </Dialog>
      )}
    </div>
  );
}

export { SECTION_VARIANTS, ITEM_VARIANTS };
