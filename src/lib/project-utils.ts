import type { Project } from "@/data/projects";

/** Media item for project thumbnails or detail primary display. */
export type ProjectMedia =
  | { type: "image"; url: string }
  | { type: "video"; url: string }
  | { type: "videoFile"; url: string; poster?: string };

/**
 * Returns the tag line for a project (tags, or role · year).
 */
export function getProjectTagLine(project: Project): string {
  if (project.tags?.length) {
    return project.tags.join(" · ");
  }
  const parts = [project.role, project.year].filter(Boolean);
  return parts.length ? parts.join(" · ") : "";
}

/**
 * Returns the thumbnail media for homepage project cards.
 * Prefers homepageCover, then first carousel item, then first image.
 */
export function getProjectThumbnail(project: Project): ProjectMedia | null {
  const first = project.homepageCover ?? project.carouselItems?.[0] ?? project.images?.[0];
  if (!first) return null;
  if (typeof first === "string") {
    return { type: "image", url: first };
  }
  return first as ProjectMedia;
}

/**
 * Returns the primary media for project detail pages.
 * Uses first carousel item, or first image as fallback.
 */
export function getProjectPrimaryMedia(project: Project): ProjectMedia | null {
  const first = project.carouselItems?.[0] ?? project.images?.[0];
  if (!first) return null;
  if (typeof first === "string") {
    return { type: "image", url: first };
  }
  return first as ProjectMedia;
}
