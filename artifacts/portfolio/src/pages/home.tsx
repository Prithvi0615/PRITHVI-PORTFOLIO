import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Mail, Phone, ExternalLink, GraduationCap, Briefcase, Award, Code, Database, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "skills", "certifications", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => scrollTo("home")}
            className="text-xl font-display font-bold tracking-tight hover:text-primary transition-colors"
          >
            PDS<span className="text-primary">.</span>
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === link.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <Button onClick={() => scrollTo("contact")} variant="outline" className="hidden md:inline-flex border-primary/20 hover:border-primary hover:bg-primary/10">
            Let's Talk
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-24 pb-20">
        {/* Hero Section */}
        <section id="home" className="min-h-[85vh] flex flex-col justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              className="lg:col-span-7 order-2 lg:order-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
                <div className="h-[2px] w-8 bg-primary"></div>
                <span className="text-primary font-medium tracking-widest uppercase text-sm">PORTFOLIO</span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                Hi, I'm <span className="text-primary">Prithvi Dev Singh</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl font-light">
                B.Tech CSE Student | AI & Software Development Enthusiast
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollTo("projects")} className="font-semibold px-8">
                  View My Work <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo("contact")} className="font-semibold px-8 border-border hover:bg-secondary">
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform -translate-y-4 translate-x-4"></div>
                <img 
                  src="/prithvi-photo.jpeg" 
                  alt="Prithvi Dev Singh" 
                  className="relative z-10 w-full h-full object-cover rounded-2xl border border-border shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <motion.section 
          id="about" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">About Me</h2>
              <div className="h-1 w-20 bg-primary mt-4"></div>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Computer Science Engineering undergraduate with a strong foundation in Python, Java, C/C++, web technologies, databases, and software development. Hands-on exposure through a Python Full-Stack internship, AI-focused learning programs, and leadership experience as a Google Gemini Campus Ambassador.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Passionate about Artificial Intelligence, Data Analytics, Full-Stack Development, and building practical technology solutions that make an impact.
              </p>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-secondary/50 border-border/50">
                  <CardContent className="p-6">
                    <GraduationCap className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">Education</h3>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                      <li>
                        <strong className="text-foreground">B.Tech (CSE) | 2023 – Present</strong>
                        <br/>SRMCEM, Lucknow
                      </li>
                      <li>
                        <strong className="text-foreground">Class XII (ISC)</strong>
                        <br/>City Montessori School, Lucknow
                      </li>
                      <li>
                        <strong className="text-foreground">Class X (ICSE)</strong>
                        <br/>City Montessori School, Lucknow
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          id="experience" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold mb-12">
            Work Experience
            <div className="h-1 w-20 bg-primary mt-4"></div>
          </motion.h2>

          <div className="space-y-8">
            <motion.div variants={fadeIn} className="relative pl-8 border-l border-primary/30 py-4">
              <div className="absolute left-[-9px] top-5 h-4 w-4 rounded-full bg-primary ring-4 ring-background"></div>
              <h3 className="text-xl font-bold">Python Full-Stack Intern</h3>
              <p className="text-primary mb-4">Shri Ramswaroop Digital Technologies Pvt. Ltd.</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Worked on Python-based development tasks and gained exposure to full-stack application development.</li>
                <li>Applied programming, debugging, database, and software development concepts in practical assignments.</li>
                <li>Collaborated on project activities while strengthening problem-solving and development skills.</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="relative pl-8 border-l border-primary/30 py-4">
              <div className="absolute left-[-9px] top-5 h-4 w-4 rounded-full bg-primary ring-4 ring-background"></div>
              <h3 className="text-xl font-bold">Campus Ambassador</h3>
              <p className="text-primary mb-4">Google Gemini Program</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Promoted awareness of Generative AI technologies among students and peers.</li>
                <li>Supported community engagement, learning initiatives, and AI-focused discussions.</li>
                <li>Represented the program within the campus technology ecosystem.</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold mb-12">
            Projects
            <div className="h-1 w-20 bg-primary mt-4"></div>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeIn}>
              <Card className="h-full bg-secondary/30 border-border/50 hover:border-primary/50 transition-colors group">
                <CardContent className="p-8">
                  <Code className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">Python & Software Development</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Developed academic and practice-based applications using Python and OOP concepts, focusing on logic building, debugging, and software design principles.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full bg-secondary/30 border-border/50 hover:border-primary/50 transition-colors group">
                <CardContent className="p-8">
                  <Layout className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">Web Development</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Created responsive web applications using HTML, CSS, JavaScript, and database integration while following structured software development practices.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full bg-secondary/30 border-border/50 hover:border-primary/50 transition-colors group">
                <CardContent className="p-8">
                  <Database className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">Database Management</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Designed and implemented database-driven solutions using MySQL to understand data storage, querying, and management workflows.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          id="skills" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Skills</h2>
              <div className="h-1 w-20 bg-primary mt-4"></div>
            </div>
            <div className="md:col-span-8">
              <div className="mb-10">
                <h3 className="text-lg font-bold mb-4 text-muted-foreground">Technical</h3>
                <div className="flex flex-wrap gap-3">
                  {["Python", "Java", "C/C++", "HTML", "CSS", "JavaScript", "MySQL", "Git", "VS Code", "OOP", "SDLC", "Database Management", "AI Fundamentals", "Data Analytics Fundamentals"].map(skill => (
                    <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm bg-secondary hover:bg-primary/20 hover:text-primary transition-colors cursor-default border border-transparent hover:border-primary/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-lg font-bold mb-4 text-muted-foreground">Tools</h3>
                <div className="flex flex-wrap gap-3">
                  {["MS Excel", "MS Word", "MS PowerPoint", "Canva"].map(tool => (
                    <Badge key={tool} variant="outline" className="px-4 py-2 text-sm border-border/60 cursor-default">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-muted-foreground">Soft Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {["Leadership", "Team Management", "Communication", "Collaboration", "Problem Solving", "Multitasking"].map(skill => (
                    <Badge key={skill} variant="outline" className="px-4 py-2 text-sm border-primary/20 bg-primary/5 text-primary/80 cursor-default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section 
          id="certifications" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold mb-12">
            Certifications & Achievements
            <div className="h-1 w-20 bg-primary mt-4"></div>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Google Gemini Campus Ambassador",
              "IBM PBEL Virtual Internship – Artificial Intelligence",
              "Deloitte Technology Job Simulation",
              "Deloitte Cyber Job Simulation",
              "Goldman Sachs Operations Job Simulation",
              "GUVI | HCL Python Certification",
              "Tata Data Visualisation: Empowering Business with Effective Insights",
              "Tata GenAI Powered Data Analytics Job Simulation"
            ].map((cert, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="h-full bg-background border-border hover:border-primary/40 hover:bg-secondary/20 transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <Award className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <p className="text-sm font-medium leading-snug">{cert}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Let's build something great.</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Looking for a passionate developer or AI enthusiast for your next project? 
              My inbox is always open.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Button asChild size="lg" className="w-full md:w-auto h-14 px-8 text-base">
                <a href="mailto:work.cms.rjpm@gmail.com">
                  <Mail className="mr-2 h-5 w-5" /> work.cms.rjpm@gmail.com
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full md:w-auto h-14 px-8 text-base border-border hover:bg-secondary">
                <a href="tel:9453044441">
                  <Phone className="mr-2 h-5 w-5" /> 9453044441
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full md:w-auto h-14 px-8 text-base border-border hover:bg-secondary">
                <a href="https://www.linkedin.com/in/prithvi-dev-singh-177aa5293" target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" /> LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="py-8 border-t border-border/50 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Prithvi Dev Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}