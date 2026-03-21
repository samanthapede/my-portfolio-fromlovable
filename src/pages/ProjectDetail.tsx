import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { BackToWorkLink } from "@/components/BackToWorkLink";
import { getProjectById } from "@/data/projects";
import { getProjectTagLine, getProjectPrimaryMedia } from "@/lib/project-utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LOCKED_STORAGE_KEY = "portfolio-locked-unlocked";
const getExpectedPassword = () => import.meta.env.VITE_LOCKED_PROJECT_PASSWORD ?? "";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(LOCKED_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [passwordError, setPasswordError] = useState(false);

  if (!project) return <Navigate to="/" replace />;

  const isLocked = project.locked === true;
  const showContent = !isLocked || unlocked;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = getExpectedPassword();
    if (password === expected) {
      try {
        sessionStorage.setItem(LOCKED_STORAGE_KEY, "true");
      } catch {}
      setUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  if (isLocked && !showContent) {
    return (
      <article className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-md mx-auto">
            <BackToWorkLink className="mb-8" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-primary-text dark:text-section-heading">
                    This project is password protected
                  </h1>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Enter the password to view
                  </p>
                </div>
              </div>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className="h-11"
                  autoFocus
                  autoComplete="current-password"
                />
                {passwordError && (
                  <p className="text-sm text-destructive">
                    Incorrect password. Please try again.
                  </p>
                )}
                <Button type="submit" className="w-full" size="lg">
                  Unlock
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </article>
    );
  }

  const tagLine = getProjectTagLine(project);
  const primaryMedia = getProjectPrimaryMedia(project);

  return (
    <article className="min-h-screen">
      <Helmet>
        <title>{project.title} | Sam's portfolio</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="pt-8 sm:pt-12 pb-6"
        >
          <BackToWorkLink />
        </motion.div>

        {/* Header: title, metadata */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.03 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-primary-text dark:text-section-heading mb-4">
            {project.title}
          </h1>
          {tagLine && (
            <p className="text-base sm:text-lg text-primary-text/70 dark:text-primary-text/85">
              {tagLine}
            </p>
          )}
        </motion.header>

        {/* Project header media (single video or image) */}
        {primaryMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="w-full mb-10 sm:mb-14"
          >
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black relative border border-border">
              {primaryMedia.type === "videoFile" && primaryMedia.url ? (
                <video
                  src={primaryMedia.url}
                  className="absolute inset-0 w-full h-full object-cover object-center origin-top"
                  style={{
                    objectFit: project.imageCrop?.objectFit ?? "cover",
                    objectPosition: project.imageCrop?.objectPosition ?? "center top",
                    transform: `scale(${project.videoScale ?? 1.34})`,
                    transformOrigin: "top center",
                  }}
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
                  controls
                  title={`${project.title} - video`}
                />
              ) : primaryMedia.type === "video" && primaryMedia.url ? (
                <iframe
                  src={`${primaryMedia.url}${primaryMedia.url.includes("?") ? "&" : "?"}autoplay=1&mute=1&loop=1`}
                  title={`${project.title} - video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : primaryMedia.type === "image" && primaryMedia.url ? (
                <img
                  src={primaryMedia.url}
                  alt={`${project.title} - detail`}
                  className={
                    project.imageCrop?.objectFit === "contain"
                      ? "w-full h-full object-contain"
                      : "w-full h-full object-cover object-center"
                  }
                  style={
                    project.imageCrop
                      ? {
                          objectFit: project.imageCrop.objectFit ?? "cover",
                          objectPosition: project.imageCrop.objectPosition ?? "center",
                        }
                      : undefined
                  }
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10">
                  <div className="w-32 h-32 rounded-lg bg-background/50 dark:bg-background/20 shadow-lg" />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Gallery images (layout below carousel) */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.055 }}
            className="w-full mb-10 sm:mb-14"
          >
            <div className="grid gap-6 sm:gap-8">
              {project.galleryImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${project.title} - detail ${index + 1}`}
                  className="w-full rounded-lg overflow-hidden object-contain bg-muted/30 dark:bg-muted/10"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.06 }}
            className="max-w-[70ch] mb-10 sm:mb-14"
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Challenges
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg leading-relaxed text-primary-text">
              {project.challenges.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Solution */}
        {project.solution && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.065 }}
            className="max-w-[70ch] mb-10 sm:mb-14"
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Solution
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-primary-text">
              {project.solution}
            </p>
          </motion.section>
        )}

        {/* Outcomes */}
        {project.outcomes && project.outcomes.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.07 }}
            className="max-w-[70ch] mb-10 sm:mb-14"
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Outcomes
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg leading-relaxed text-primary-text">
              {project.outcomes.map((item, i) => (
                <li key={i}>
                  {typeof item === "string" ? (
                    item
                  ) : item.links ? (
                    (() => {
                      let remaining = item.text;
                      const parts: React.ReactNode[] = [];
                      for (const link of item.links) {
                        const idx = remaining.indexOf(link.label);
                        if (idx > 0) parts.push(remaining.slice(0, idx));
                        parts.push(
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-text underline underline-offset-2 hover:opacity-90"
                          >
                            {link.label}
                          </a>
                        );
                        remaining = remaining.slice(idx + link.label.length);
                      }
                      if (remaining) parts.push(remaining);
                      return <>{parts}</>;
                    })()
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.08 }}
          className="pb-16 sm:pb-24"
        />
        </div>
      </div>
    </article>
  );
}
