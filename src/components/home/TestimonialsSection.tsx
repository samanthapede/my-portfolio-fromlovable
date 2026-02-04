import { motion } from "framer-motion";

import victorImg from "@/assets/testimonials/victor.png";
import cassiaImg from "@/assets/testimonials/cassia.png";
import zackImg from "@/assets/testimonials/zack.png";
import emilyImg from "@/assets/testimonials/emily.png";
import joshImg from "@/assets/testimonials/josh.png";

import nolsLogo from "@/assets/logos/nols.png";
import pivotalLogo from "@/assets/logos/pivotal.png";
import shopifyLogo from "@/assets/logos/shopify.png";
import vizientLogo from "@/assets/logos/vizient.png";
import vmwareLogo from "@/assets/logos/vmware.png";
import cheggLogo from "@/assets/logos/chegg.png";
import dribbbleLogo from "@/assets/logos/dribbble.png";
import healthtalkLogo from "@/assets/logos/healthtalk-ai.png";
import hexaradLogo from "@/assets/logos/hexarad.png";
import hippLogo from "@/assets/logos/hipp.png";

const testimonials = [
  {
    id: 1,
    quote: "Sam has a rare ability to make the complex simple and the difficult seem effortless. I've had the privilege of working with her on some of the most challenging and ambiguous projects of my career, and one quality stands out above all: Sam embraces complexity and ambiguity, consistently delivering high-quality solutions at an impressive speed—all while keeping the team and stakeholders fully aligned and informed.",
    author: "Víctor Niharra Fe",
    role: "Leading Product at Shopify",
    image: victorImg,
  },
  {
    id: 2,
    quote: "[Sam is] one of the most compelling presenters and storytellers I know, with a rare ability to connect the dots between complex user needs and business goals. I've seen her dive fearlessly into the most challenging problem spaces, break down potential solutions with exceptional clarity, and navigate stakeholder feedback with ease. Every solution she delivers is beautifully crafted, deeply thoughtful, and always rooted in user needs. Sam is the kind of teammate who makes the whole team better.",
    author: "Cassia Brooks",
    role: "Staff Product Designer at Shopify",
    image: cassiaImg,
  },
  {
    id: 3,
    quote: "I can't say enough good things about Sam. Not only is she a seriously talented and professional UX designer and researcher, but she's just a tremendous joy to be around and work with. She radiates empathy for users' experiences and she truly cares about her work. I hope that my path crosses with Sam's in the future. I'd gladly welcome the opportunity to work with her again.",
    author: "Zack Onisko",
    role: "Former CEO at Dribbble",
    image: zackImg,
  },
  {
    id: 4,
    quote: "Sam is a self-starter with great instincts for what is needed to move a decision forward. Her pace, fast problem solving, and breadth of problem solving is extraordinary. She has a bias to ship and get things done, balancing long-term goals with respect for timelines, while always maintaining the high quality bar we set at Shopify. I would jump at any opportunity to work with her again!",
    author: "Emily Rucker",
    role: "Senior UX Manager at Shopify",
    image: emilyImg,
  },
  {
    id: 5,
    quote: "Sam is a top notch human-focused designer. Sam quickly diagnoses root problems and designs elegant, intuitive and efficient solutions. In our time working together, Sam was someone I always looked to for feedback on my designs work, knowing that her intuition and high bar for quality would elevate my work. In my time working with Sam, every project team was relieved and grateful when she was assigned to their project. When Sam is on your team, you know the end result will be amazing and the process getting there will be easy and fun.",
    author: "Josh Mantooth",
    role: "Senior Staff Product Designer at Paypal",
    image: joshImg,
  },
];

const companyLogos = [
  { name: "Shopify", logo: shopifyLogo },
  { name: "Dribbble", logo: dribbbleLogo },
  { name: "VMware", logo: vmwareLogo },
  { name: "Pivotal", logo: pivotalLogo },
  { name: "Chegg", logo: cheggLogo },
  { name: "Vizient", logo: vizientLogo },
  { name: "NOLS", logo: nolsLogo },
  { name: "HealthTalk AI", logo: healthtalkLogo },
  { name: "Hexarad", logo: hexaradLogo },
  { name: "Hipp", logo: hippLogo },
];

export const TestimonialsSection = () => {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            A trusted partner to{" "}
            <span className="gradient-text">amazing teams</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I've had the privilege of working with incredible teams across industries.
          </p>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 mb-16"
        >
          {companyLogos.map((company) => (
            <div
              key={company.name}
              className="opacity-40 hover:opacity-70 transition-opacity grayscale"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-6 lg:h-8 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Auto-scrolling Testimonial Carousel */}
      <div className="relative w-full">
        <div className="flex animate-scroll-left gap-6 w-max">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[400px] lg:w-[500px] bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-colors"
            >
              <p className="text-foreground mb-6 leading-relaxed text-sm lg:text-base">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
