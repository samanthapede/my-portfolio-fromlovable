import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Sam transformed our product experience. Her strategic thinking and attention to detail resulted in a 40% increase in user engagement.",
    author: "Sarah Chen",
    role: "VP of Product",
    company: "TechCorp",
  },
  {
    id: 2,
    quote: "Working with Sam was a game-changer. She understood our vision immediately and delivered beyond our expectations.",
    author: "Michael Torres",
    role: "CEO",
    company: "StartupXYZ",
  },
  {
    id: 3,
    quote: "Sam's ability to balance user needs with business goals is exceptional. She's the designer every team needs.",
    author: "Emily Watson",
    role: "Director of Design",
    company: "DesignCo",
  },
];

const companyLogos = [
  { name: "Shopify", logo: "Shopify" },
  { name: "TechCorp", logo: "TechCorp" },
  { name: "StartupXYZ", logo: "StartupXYZ" },
  { name: "DesignCo", logo: "DesignCo" },
  { name: "InnovateLab", logo: "InnovateLab" },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
          {companyLogos.map((company, index) => (
            <div
              key={company.name}
              className="text-xl lg:text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {company.logo}
            </div>
          ))}
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-purple to-gradient-blue" />
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
