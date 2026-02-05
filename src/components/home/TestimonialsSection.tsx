import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import victorImg from "@/assets/testimonials/victor.png";
import cassiaImg from "@/assets/testimonials/cassia.png";
import zackImg from "@/assets/testimonials/zack.png";
import emilyImg from "@/assets/testimonials/emily.png";
import joshImg from "@/assets/testimonials/josh.png";
import pivotalLogo from "@/assets/logos/pivotal.png";
import shopifyLogo from "@/assets/logos/shopify.png";
import vizientLogo from "@/assets/logos/vizient.png";
import vmwareLogo from "@/assets/logos/vmware.png";
import cheggLogo from "@/assets/logos/chegg.png";
import dribbbleLogo from "@/assets/logos/dribbble.png";
import healthtalkLogo from "@/assets/logos/healthtalk-ai.png";
import hexaradLogo from "@/assets/logos/hexarad.png";
import hippLogo from "@/assets/logos/hipp.png";
import augintelLogo from "@/assets/logos/augintel.png";
const testimonials = [{
  id: 1,
  quote: <><strong>Sam has a rare ability to make the complex simple and the difficult seem effortless.</strong> I've had the privilege of working with her on <strong>some of the most challenging and ambiguous projects of my career,</strong> and one quality stands out above all: Sam embraces complexity and ambiguity, consistently delivering high-quality solutions at an impressive speed—all while keeping the team and stakeholders fully aligned and informed.</>,
  author: "Víctor Niharra Fe",
  role: "Leading Product at Shopify",
  image: victorImg
}, {
  id: 2,
  quote: <>[Sam is] one of the most compelling presenters and storytellers I know, with a rare ability to connect the dots between complex user needs and business goals. <strong>I've seen her dive fearlessly into the most challenging problem spaces, break down potential solutions with exceptional clarity, and navigate stakeholder feedback with ease.</strong> Every solution she delivers is beautifully crafted, deeply thoughtful, and always rooted in user needs. Sam is the kind of teammate who makes the whole team better.</>,
  author: "Cassia Brooks",
  role: "Staff Product Designer at Shopify",
  image: cassiaImg
}, {
  id: 3,
  quote: "I can't say enough good things about Sam. Not only is she a seriously talented and professional UX designer and researcher, but she's just a tremendous joy to be around and work with. She radiates empathy for users' experiences and she truly cares about her work. I hope that my path crosses with Sam's in the future. I'd gladly welcome the opportunity to work with her again.",
  author: "Zack Onisko",
  role: "Former CEO at Dribbble",
  image: zackImg
}, {
  id: 4,
  quote: "Sam is a self-starter with great instincts for what is needed to move a decision forward. Her pace, fast problem solving, and breadth of problem solving is extraordinary. She has a bias to ship and get things done, balancing long-term goals with respect for timelines, while always maintaining the high quality bar we set at Shopify. I would jump at any opportunity to work with her again!",
  author: "Emily Rucker",
  role: "Senior UX Manager at Shopify",
  image: emilyImg
}, {
  id: 5,
  quote: <>Sam is a top notch human-focused designer. Sam quickly diagnoses root problems and designs elegant, intuitive and efficient solutions. In our time working together, Sam was someone I always looked to for feedback on my designs work, knowing that her intuition and high bar for quality would elevate my work. In my time working with Sam, <strong>every project team was relieved and grateful when she was assigned to their project.</strong> When Sam is on your team, you know the end result will be amazing and the process getting there will be easy and fun.</>,
  author: "Josh Mantooth",
  role: "Senior Staff Product Designer at Paypal",
  image: joshImg
}];
const companyLogos = [{
  name: "Shopify",
  logo: shopifyLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Dribbble",
  logo: dribbbleLogo,
  size: "h-9 lg:h-12"
}, {
  name: "VMware",
  logo: vmwareLogo,
  size: "h-9 lg:h-11"
}, {
  name: "Pivotal",
  logo: pivotalLogo,
  size: "h-9 lg:h-11"
}, {
  name: "Chegg",
  logo: cheggLogo,
  size: "h-5 lg:h-7"
}, {
  name: "HealthTalk AI",
  logo: healthtalkLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Vizient",
  logo: vizientLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Hexarad",
  logo: hexaradLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Hipp",
  logo: hippLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Augintel",
  logo: augintelLogo,
  size: "h-5 lg:h-7"
}];
export const TestimonialsSection = () => {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  return <section className="py-16 lg:py-24 overflow-hidden pt-[90px] pb-[50px]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-left mb-12">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            A trusted partner to{" "}
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="relative inline-block cursor-pointer group isolate">
                    <span className="relative z-10 text-[#4A56D4] transition-colors duration-500 ease-out group-hover:text-[#5E69D9]">
                      amazing teams
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-4 overflow-visible transition-all duration-500 ease-out group-hover:scale-x-105 group-hover:opacity-80 z-0" viewBox="0 0 200 16" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 10C15 8 30 12 50 9C70 6 90 13 110 10C130 7 150 14 170 10C185 7 200 11 200 11" stroke="url(#gradient-testimonials)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-500 ease-out group-hover:[stroke-width:6]" />
                      <defs>
                        <linearGradient id="gradient-testimonials" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4B1B9E" />
                          <stop offset="50%" stopColor="#4E8DD3" />
                          <stop offset="100%" stopColor="#14E3F4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm bg-gradient-to-r from-[#4A56D4] to-[#262D6E] text-white border-none rounded-md px-5 py-4 text-base font-medium shadow-2xl">
                  <p className="leading-relaxed">
                    ✨ I'm a Staff-level product designer with over a decade of experience leading user experience, interface design, and user research across fast-moving teams. I now work independently with startups and enterprises as a freelance and consulting partner — helping them design intuitive, scalable products that solve real problems for real people. 💜
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
        </motion.div>
      </div>

      {/* Auto-scrolling Testimonial Carousel */}
      <div className="relative w-full mb-16 group">
        <div className="flex animate-scroll-left group-hover:[animation-play-state:paused] gap-6 w-max">
          {duplicatedTestimonials.map((testimonial, index) => <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-[400px] lg:w-[500px] bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-colors">
              <p className="text-foreground mb-6 leading-relaxed text-sm lg:text-base">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {/* Company Logos - Two rows */}
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.2
      }} className="grid grid-cols-3 sm:grid-cols-5 gap-x-10 gap-y-8 lg:gap-x-16 lg:gap-y-10 items-center justify-items-center max-w-4xl mx-auto">
          {companyLogos.map(company => <div key={company.name} className="opacity-40 hover:opacity-70 transition-opacity grayscale">
              <img src={company.logo} alt={company.name} className={`${company.size} w-auto object-contain max-w-[140px] lg:max-w-[180px]`} />
            </div>)}
        </motion.div>
      </div>
    </section>;
};