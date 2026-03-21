import { imageUrl } from "@/lib/cloudflare-images";
import { videoUrl } from "@/lib/cloudflare-stream";

export type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  /** When true, project detail page requires password to view */
  locked?: boolean;
  overview?: string;
  role?: string;
  year?: string;
  tags?: string[];
  /** Homepage card keywords (displayed as pills) */
  keywords?: string[];
  metrics?: string[];
  /** Challenges faced (bullet list) */
  challenges?: string[];
  /** Solution description */
  solution?: string;
  /** Outcomes achieved (strings or { text, links? } for outcomes with inline links) */
  outcomes?: Array<
    | string
    | { text: string; links?: Array<{ label: string; href: string }> }
  >;
  /** Image URLs for project gallery carousel (placeholder URLs used until real assets added) */
  images?: string[];
  /** Homepage cover: overrides first carousel item for the project card on homepage. For videoFile, poster shows by default; video plays on hover. */
  homepageCover?: { type: "image" | "video" | "videoFile"; url: string; poster?: string };
  /** Carousel items: image URLs, video embed URLs, or self-hosted video files (for project detail page) */
  carouselItems?: Array<{ type: "image" | "video" | "videoFile"; url: string }>;
  /** Additional project work images for layout grid below carousel */
  galleryImages?: string[];
  /** Optional image display overrides for thumbnails/carousel (object-fit, object-position) */
  imageCrop?: { objectFit?: "cover" | "contain"; objectPosition?: string };
  /** Optional video scale on project detail page (default 1.34 for black frame removal) */
  videoScale?: number;
};

const LOREM = {
  batching:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  fulfillable:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident.",
  inventory:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  uiSystems:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
  dashboard:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  chatbot:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  sellIncoming:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export const projects: Project[] = [
  {
    id: 8,
    title: "Redesigning merchant workflows for speed and clarity",
    description: "E-commerce order management and merchant workflows",
    link: "/work/8",
    role: "Lead Design",
    year: "2025",
    tags: ["E-commerce", "2025"],
    keywords: ["Workflow Simplification", "Usability at Scale", "Interaction Design"],
    homepageCover: {
      type: "videoFile",
      url: videoUrl("order-fulfillment-short-2", "/assets/projects/order-fulfillment/order-fulfillment-short-2.mp4"),
      poster: imageUrl("order-fulfillment-page-image-blue-cropped", "Full", "/assets/projects/order-fulfillment/order-fulfillment-page-image-blue-cropped.png"),
    },
    carouselItems: [
      { type: "videoFile", url: videoUrl("order-fulfillment-workflows", "/assets/projects/order-fulfillment/order-fulfillment-workflows.mp4") },
    ],
    galleryImages: [
      "/assets/projects/order-fulfillment/order-fulfillment-page-image.png",
    ],
    videoScale: 1,
    overview: "Simplifying and elevating merchant workflows in e-commerce order management.",
    challenges: [],
    solution: "",
    outcomes: [],
  },
  {
    id: 1,
    title: "Building Shopify's inventory management foundation",
    description: "Multi-location order fulfillment",
    link: "/work/1",
    overview: LOREM.batching,
    role: "Lead Designer",
    year: "2021–2022",
    tags: ["E-commerce", "2021–2022"],
    keywords: ["Systems Architecture", "Inventory Logic", "Platform Scale"],
    challenges: [
      "Supporting a wide spectrum of operational complexity without fragmenting the product experience.",
      "Designing infrastructure-level inventory logic that could scale reliably across millions of merchants.",
      "Driving alignment across product, engineering, and merchant insights within a highly distributed team.",
    ],
    solution:
      "The tool focused on delivering real-time visibility into stock levels, simplifying manual workflows, and ensuring merchants could confidently maintain accurate inventory.",
    outcomes: [
      "For the first time merchants could manage their inventory on Shopify",
      "More than 3 million merchants around the world adopted this feature",
      {
        text: "Learn more about Inventory States or the API.",
        links: [
          { label: "Inventory States", href: "https://help.shopify.com/en/manual/products/inventory/inventory-states" },
          { label: "API", href: "https://shopify.dev/api/admin-rest/latest/resources/inventorylevel" },
        ],
      },
    ],
    homepageCover: {
      type: "videoFile",
      url: videoUrl("inventory-states-smaller", "/assets/projects/inventory/inventory-states-smaller.mp4"),
      poster: imageUrl("inventory-states-preview", "Full", "/assets/projects/inventory/inventory-states-preview.png"),
    },
    carouselItems: [
      { type: "videoFile", url: videoUrl("inventory-states-smaller", "/assets/projects/inventory/inventory-states-smaller.mp4") },
    ],
    galleryImages: [
      "/assets/projects/inventory/inventory-states-overview.png",
    ],
  },
  {
    id: 0,
    title: "Making clinical compliance simpler with AI",
    description: "AI-powered clinical compliance",
    link: "/work/0",
    locked: true,
    tags: ["Healthcare", "AI", "2025"],
    keywords: ["AI-Driven Workflows", "Regulatory Complexity", "Risk Reduction"],
    carouselItems: [
      {
        type: "image",
        url: imageUrl("clinical-compliance-reports-side-drawer", "Full", "/assets/projects/clinical-compliance/clinical-compliance-reports-side-drawer.png"),
      },
    ],
    imageCrop: { objectFit: "cover", objectPosition: "center" },
  },
  {
    id: 2,
    title: "Raising the bar on inventory at Shopify",
    description: "Real-time inventory visibility",
    link: "/work/2",
    overview: LOREM.fulfillable,
    role: "Lead Designer",
    year: "2022",
    tags: ["E-commerce", "Lead Design", "2022"],
    challenges: [],
    solution:
      "Placeholder solution: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    outcomes: [
      "Placeholder outcome: Improved efficiency metrics across the platform",
      "Placeholder outcome: Reduced support tickets and user confusion",
      "Placeholder outcome: Positive feedback from merchant and internal teams",
    ],
    carouselItems: [
      { type: "videoFile", url: videoUrl("inventory-states-smaller", "/assets/projects/inventory/inventory-states-smaller.mp4") },
    ],
    imageCrop: { objectFit: "contain", objectPosition: "center" },
    videoScale: 1,
  },
  {
    id: 3,
    title: "Inventory management",
    description: "Streamlined stock operations",
    link: "/work/3",
    overview: LOREM.inventory,
    role: "Lead Designer",
    year: "2021–2022",
    tags: ["E-commerce", "Product Design", "2021–2022"],
    challenges: [],
    solution:
      "Placeholder solution: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    outcomes: [
      "Placeholder outcome: Improved efficiency metrics across the platform",
      "Placeholder outcome: Reduced support tickets and user confusion",
      "Placeholder outcome: Positive feedback from merchant and internal teams",
    ],
    carouselItems: [
      { type: "image", url: "https://picsum.photos/seed/inventory-1/1200/675" },
      { type: "image", url: "https://picsum.photos/seed/inventory-2/1200/675" },
      { type: "image", url: "https://picsum.photos/seed/inventory-3/1200/675" },
    ],
  },
  {
    id: 4,
    title: "UI systems",
    description: "Scalable design components",
    link: "/work/4",
    overview: LOREM.uiSystems,
    role: "Design",
    year: "—",
    tags: ["Design Systems", "UI", "Components"],
    challenges: [],
    solution:
      "Placeholder solution: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    outcomes: [
      "Placeholder outcome: Improved efficiency metrics across the platform",
      "Placeholder outcome: Reduced support tickets and user confusion",
      "Placeholder outcome: Positive feedback from merchant and internal teams",
    ],
    carouselItems: [
      { type: "image", url: "https://picsum.photos/seed/ui-1/1200/675" },
      { type: "image", url: "https://picsum.photos/seed/ui-2/1200/675" },
    ],
  },
  {
    id: 5,
    title: "Dashboard analytics",
    description: "Data-driven merchant insights",
    link: "/work/5",
    overview: LOREM.dashboard,
    role: "Design",
    year: "—",
    tags: ["Analytics", "Dashboards", "Product Design"],
    challenges: [],
    solution:
      "Placeholder solution: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    outcomes: [
      "Placeholder outcome: Improved efficiency metrics across the platform",
      "Placeholder outcome: Reduced support tickets and user confusion",
      "Placeholder outcome: Positive feedback from merchant and internal teams",
    ],
    carouselItems: [
      { type: "image", url: "https://picsum.photos/seed/dashboard-1/1200/675" },
      { type: "image", url: "https://picsum.photos/seed/dashboard-2/1200/675" },
      { type: "image", url: "https://picsum.photos/seed/dashboard-3/1200/675" },
    ],
  },
  {
    id: 6,
    title: "Chatbot experience",
    description: "Conversational support flows",
    link: "/work/6",
    overview: LOREM.chatbot,
    role: "Design",
    year: "—",
    tags: ["Conversational UI", "Support", "Product Design"],
    challenges: [],
    solution:
      "Placeholder solution: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    outcomes: [
      "Placeholder outcome: Improved efficiency metrics across the platform",
      "Placeholder outcome: Reduced support tickets and user confusion",
      "Placeholder outcome: Positive feedback from merchant and internal teams",
    ],
    carouselItems: [
      { type: "image", url: "https://picsum.photos/seed/chatbot-1/1200/675" },
      { type: "image", url: "https://picsum.photos/seed/chatbot-2/1200/675" },
    ],
  },
  {
    id: 7,
    title: "Sell from incoming",
    description: "Pre-arrival inventory sales",
    link: "/work/7",
    overview: LOREM.sellIncoming,
    role: "Design",
    year: "—",
    tags: ["E-commerce", "Inventory", "Product Design"],
    challenges: [],
    solution:
      "Placeholder solution: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    outcomes: [
      "Placeholder outcome: Improved efficiency metrics across the platform",
      "Placeholder outcome: Reduced support tickets and user confusion",
      "Placeholder outcome: Positive feedback from merchant and internal teams",
    ],
    carouselItems: [
      { type: "image", url: "https://picsum.photos/seed/sell-1/1200/675" },
      { type: "image", url: "https://picsum.photos/seed/sell-2/1200/675" },
      { type: "image", url: "https://picsum.photos/seed/sell-3/1200/675" },
    ],
  },
];

export const getProjectById = (id: string | number): Project | undefined => {
  const numId = typeof id === "string" ? parseInt(id, 10) : id;
  return projects.find((p) => p.id === numId);
};
