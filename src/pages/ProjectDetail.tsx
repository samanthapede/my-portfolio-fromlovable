import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { getProjectById } from "@/data/projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
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
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary-text dark:hover:text-section-heading transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to work
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
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

  const tagLine = project.tags?.length
    ? project.tags.join(" · ")
    : [project.role, project.year].filter(Boolean).join(" · ");

  const slides = project.carouselItems?.length
    ? project.carouselItems
    : project.images?.length
      ? project.images.map((url) => ({ type: "image" as const, url }))
      : [{ type: "image" as const, url: "" }];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <article className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="pt-8 sm:pt-12 pb-6"
        >
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary-text dark:hover:text-section-heading transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to work
          </Link>
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
            <p className="text-base sm:text-lg text-primary-text/70">
              {tagLine}
            </p>
          )}
        </motion.header>

        {/* Project image carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="w-full mb-10 sm:mb-14"
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {slides.map((item, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black relative border border-neutral-200 dark:border-neutral-600">
                    {item.type === "videoFile" && item.url ? (
                      <video
                        src={item.url}
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
                        title={`${project.title} - video ${index + 1}`}
                      />
                    ) : item.type === "video" && item.url ? (
                      <iframe
                        src={`${item.url}${item.url.includes("?") ? "&" : "?"}autoplay=1&mute=1&loop=1`}
                        title={`${project.title} - video ${index + 1}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : item.type === "image" && item.url ? (
                      <img
                        src={item.url}
                        alt={`${project.title} - image ${index + 1}`}
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
                        <div className="w-32 h-32 rounded-2xl bg-background/50 dark:bg-background/20 shadow-lg" />
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {slides.length > 1 && (
              <>
                <CarouselPrevious className="left-4 border-border bg-background/80 hover:bg-background" />
                <CarouselNext className="right-4 border-border bg-background/80 hover:bg-background" />
                <div className="flex justify-center gap-2 mt-4">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === current
                          ? "w-6 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </Carousel>
        </motion.div>

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
                  className="w-full rounded-2xl overflow-hidden object-contain bg-muted/30 dark:bg-muted/10"
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
                            className="text-primary hover:underline"
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
