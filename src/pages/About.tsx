import { motion } from "framer-motion";
import { Lightbulb, Users, Zap, BarChart3, Target, Handshake, Compass, Layers } from "lucide-react";
import headshot from "@/assets/headshot.jpg";
const strengths = [{
  icon: Lightbulb,
  label: "Strategic and system thinking"
}, {
  icon: Users,
  label: "Leading teams, projects, and design cycles"
}, {
  icon: Zap,
  label: "Hands-on execution & rapid iteration"
}, {
  icon: BarChart3,
  label: "Translating research & data into user-centered designs"
}, {
  icon: Target,
  label: "Balancing user needs with business goals"
}, {
  icon: Handshake,
  label: "Collaborating to ship smart, scalable solutions"
}, {
  icon: Compass,
  label: "Stakeholder alignment"
}, {
  icon: Layers,
  label: "Creating greenpath visions and viable MVPs"
}];
const About = () => {
  return <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground">
              Staff-level Product Designer
            </p>
          </motion.div>

          {/* Bio Section with Photo Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Bio Text */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <p className="text-lg leading-relaxed mb-6 lg:text-lg text-[#6f6f7b] font-sans font-normal">With over a decade of experience leading user experience, interface design, and user research across fast-moving teams. I now work independently, helping great companies design intuitive, scalable interfaces that solve real problems for real people. 


Over the past 10+ years, I’ve worked with startups and enterprise organizations across a range of industries. Most recently, I spent 4+ years at Shopify as a lead designer in the logistics space, designing complex systems across Inventory, Fulfillment, and Shipping. I’m particularly proud of leading the design and execution of a CEO-sponsored initiative — collaborating directly with Shopify’s senior leadership to bring a bold new fulfillment vision to life. That work was approved for build and is expected to transform how merchants fulfill orders at scale.</p>
              <p className="text-lg leading-relaxed text-muted-foreground lg:text-lg">I bring a mix of strategic thinking and hands-on execution to every engagement. I'm most effective when I'm helping teams move fast while staying focused on what matters.</p>
            </motion.div>

            {/* Photo Collage */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-xl overflow-hidden">
                <img src={headshot} alt="Samantha Pede" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-gradient-purple to-gradient-blue" />
                <div className="aspect-square rounded-xl bg-gradient-to-br from-gradient-blue to-gradient-cyan" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Strengths Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Key Strengths
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((strength, index) => <motion.div key={strength.label} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4,
            delay: index * 0.05
          }} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <strength.icon className="w-8 h-8 text-primary mb-4" />
                <p className="font-medium">{strength.label}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Philosophy</h2>
            <p className="text-xl lg:text-2xl leading-relaxed text-muted-foreground">
              Design, for me, is about{" "}
              <span className="text-foreground font-medium">clarity</span>,{" "}
              <span className="text-foreground font-medium">momentum</span>, and{" "}
              <span className="text-foreground font-medium">impact</span>. I thrive 
              in environments where I can help shape the big picture, while sweating 
              the details that make an experience truly work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Outside of Work Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Outside of Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }}>
              <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
                Outside of work, I live with my family in Wyoming, where we explore 
                the mountains, remodel our 100-year-old home, and run a local bike 
                and ski shop. I'm happiest outdoors, creating in the kitchen, or 
                riding bikes with my husband and two sons.
              </p>
            </motion.div>

            {/* Photo Collage Grid */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="grid grid-cols-3 gap-3">
              {[...Array(6)].map((_, index) => <div key={index} className={`aspect-square rounded-lg bg-gradient-to-br ${index % 3 === 0 ? "from-gradient-purple to-gradient-blue" : index % 3 === 1 ? "from-gradient-blue to-gradient-cyan" : "from-gradient-cyan to-gradient-purple"}`} />)}
            </motion.div>
          </div>
        </div>
      </section>
    </>;
};
export default About;