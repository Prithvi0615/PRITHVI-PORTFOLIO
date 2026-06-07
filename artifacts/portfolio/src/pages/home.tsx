import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, Mail, Phone, ExternalLink, GraduationCap, 
  Briefcase, Award, Code, Database, Layout, Github, 
  Linkedin, Sun, Moon, ArrowUp, Download, Check, 
  MapPin, Send, Cpu, Terminal, FileText, CheckCircle2,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Contact Form State
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formFeedback, setFormFeedback] = useState("");

  useEffect(() => {
    // Theme Toggle Initialization
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);

    const handleScroll = () => {
      // Scroll Progress Indicator
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Back to Top Button visibility
      setShowBackToTop(window.scrollY > 300);

      // Active Section Highlight
      const sections = ["home", "about", "internships", "skills", "education", "certifications", "achievements", "profiles", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -150 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      let response;
      let data;

      if (web3FormsKey) {
        // Submit to Web3Forms to send email directly to user's inbox
        response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Portfolio Message from ${formState.name}`,
            name: formState.name,
            email: formState.email,
            message: formState.message,
          }),
        });
        data = await response.json();
        if (response.ok && data.success) {
          setFormStatus("success");
          setFormFeedback("Thank you for reaching out! I will get back to you shortly.");
          setFormState({ name: "", email: "", message: "" });
        } else {
          setFormStatus("error");
          setFormFeedback(data.message || "Something went wrong. Please check fields and try again.");
        }
      } else {
        // Fallback to local Express API
        response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });
        data = await response.json();
        if (response.ok) {
          setFormStatus("success");
          setFormFeedback(data.message || "Thank you for reaching out! I will get back to you shortly.");
          setFormState({ name: "", email: "", message: "" });
        } else {
          setFormStatus("error");
          setFormFeedback(data.error || "Something went wrong. Please check fields and try again.");
        }
      }
    } catch (err) {
      setFormStatus("error");
      setFormFeedback("Failed to send message. Please verify the connection is active.");
    }
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "internships", label: "Internships" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`back-to-top p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 ${
          showBackToTop ? "visible" : ""
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => scrollTo("home")}
            className="text-xl font-display font-bold tracking-tight hover:text-primary transition-colors flex items-center gap-1"
          >
            PDS<span className="text-primary">.</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-6">
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

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <Button 
              onClick={toggleTheme} 
              variant="outline" 
              size="icon" 
              className="rounded-full border-border/80 hover:bg-secondary/80"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button onClick={() => scrollTo("contact")} variant="outline" className="hidden sm:inline-flex border-primary/20 hover:border-primary hover:bg-primary/10">
              Let's Talk
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-24 pb-20">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[85vh] flex flex-col justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              className="lg:col-span-7 order-2 lg:order-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 bg-primary/5 text-primary rounded-full font-medium uppercase tracking-wider">
                  Available for Internships & Full-Time Roles
                </Badge>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-display font-bold leading-tight mb-4 text-foreground">
                Hi, I'm <span className="text-primary font-bold">Prithvi Dev Singh</span>
              </motion.h1>
              
              <motion.h2 variants={fadeIn} className="text-xl md:text-2xl font-semibold text-muted-foreground mb-6 font-display">
                Computer Science Engineering Student & Software Developer
              </motion.h2>

              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Final-year Computer Science Engineering student passionate about Full Stack Development, Artificial Intelligence, and Software Engineering. Skilled in Java, Python, JavaScript, and modern web technologies. Actively seeking Software Development Engineer (SDE) and Full Stack Development opportunities.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex items-center gap-2 text-muted-foreground mb-8">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollTo("internships")} className="font-semibold px-6 shadow-sm">
                  View Experience
                </Button>
                <Button asChild size="lg" variant="outline" className="p-3 border-border hover:bg-secondary">
                  <a href="https://github.com/Prithvi0615" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="p-3 border-border hover:bg-secondary">
                  <a href="https://www.linkedin.com/in/prithvi-dev-singh-177aa5293" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
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
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform -translate-y-4 translate-x-4"></div>
                <img 
                  src="/prithvi-photo.jpeg" 
                  alt="Prithvi Dev Singh" 
                  className="relative z-10 w-full h-full object-cover rounded-2xl border border-border shadow-md transition-all duration-500"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <motion.section 
          id="about" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">About Me</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I am a dedicated Computer Science Engineering student with a robust problem-solving mindset and a passion for technology. Through academic projects, industry-focused virtual learning, and hands-on developer internships, I have cultivated strong skills in software architecture, database design, and algorithmic thinking.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                As a Google Gemini Campus Ambassador, I take active leadership in driving AI-focused developer programs. My career objective is to build scalable, reliable software applications and collaborate on impactful engineering projects in a professional SDE role.
              </p>

              {/* Quick Highlights Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Internships", value: "2 Completed" },
                  { label: "Certifications", value: "8+ Industry Certs" },
                ].map((stat, i) => (
                  <Card key={i} className="bg-secondary/30 border-border/50">
                    <CardContent className="p-4 flex flex-col justify-center h-full">
                      <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                      <span className="text-xs text-muted-foreground mt-1">{stat.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* INTERNSHIP & EXPERIENCE SECTION */}
        <motion.section 
          id="internships" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold mb-12">
            Internships & Experience
          </motion.h2>

          <div className="relative border-l border-border pl-6 ml-4 space-y-12">
            {[
              {
                role: "Python Full-Stack Intern",
                company: "Shri Ramswaroop Digital Technologies Pvt. Ltd.",
                tech: "Python, Django, SQLite, JavaScript",
                bullets: [
                  "Worked on Python-based backend architectures and full-stack integration processes.",
                  "Applied robust programming, debugging, and relational database paradigms to client requests.",
                  "Collaborated with developers in writing documentation and executing testing workflows."
                ],
                link: "#"
              },
              {
                role: "Artificial Intelligence Virtual Intern",
                company: "IBM PBEL Virtual Internship",
                tech: "Python, Jupyter, Pandas, Scikit-learn, Neural Networks",
                bullets: [
                  "Gained hands-on training and conceptual insights into Artificial Intelligence model design.",
                  "Performed data preprocessing, normalization, model selection, training, and testing.",
                  "Evaluated model performance using precision, recall, and ROC analysis."
                ],
                link: "#"
              },
              {
                role: "Google Gemini Student Ambassador",
                company: "Google Gemini Program",
                tech: "Generative AI, Large Language Models, Community Engagement",
                bullets: [
                  "Promoted Generative AI technologies and prompt-engineering capabilities within the campus ecosystem.",
                  "Orchestrated learning bootcamps, workshops, and AI integration discussions for students.",
                  "Represented the program within the campus technology ecosystem, facilitating Google developer activities."
                ],
                link: "#"
              }
            ].map((exp, i) => (
              <motion.div key={i} variants={fadeIn} className="relative">
                {/* Bullet node */}
                <div className="absolute left-[-31px] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background ring-2 ring-border"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                </div>
                <div className="text-primary font-medium text-sm mb-4">{exp.company}</div>
                
                <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.split(", ").map(t => (
                      <Badge key={t} variant="secondary" className="text-xs bg-secondary/80 font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>



        {/* SKILLS SECTION */}
        <motion.section 
          id="skills" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Technical Skills</h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              {[
                { title: "Programming Languages", skills: ["Java", "Python", "JavaScript", "C/C++"] },
                { title: "Frontend Technologies", skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS"] },
                { title: "Backend Technologies", skills: ["Node.js", "Express.js", "REST APIs"] },
                { title: "Databases", skills: ["MySQL", "PostgreSQL", "SQLite"] },
                { title: "Tools & Version Control", skills: ["Git", "GitHub", "VS Code", "Postman", "Canva"] },
                { title: "Core CS Subjects", skills: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks", "OOP"] },
              ].map((category, i) => (
                <div key={i} className="border-b border-border/30 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-base font-semibold text-foreground/80 mb-3 uppercase tracking-wider">{category.title}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm bg-secondary/80 hover:bg-primary/20 hover:text-primary transition-colors cursor-default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* EDUCATION SECTION */}
        <motion.section 
          id="education" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold mb-12">
            Education
          </motion.h2>

          <div className="space-y-8 relative border-l border-border pl-6 ml-4">
            {[
              {
                title: "B.Tech in Computer Science Engineering",
                institution: "Shri Ramswaroop Memorial College of Engineering and Management (SRMCEM)",
                univ: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
              },
              {
                title: "Class XII (ISC)",
                institution: "City Montessori School (CMS), Lucknow",
                univ: "Council for the Indian School Certificate Examinations (CISCE)",
                extra: "Focus: Physics, Chemistry, Mathematics, Computer Science"
              },
              {
                title: "Class X (ICSE)",
                institution: "City Montessori School (CMS), Lucknow",
                univ: "Council for the Indian School Certificate Examinations (CISCE)",
                extra: "Focus: Science, Computer Applications"
              }
            ].map((edu, i) => (
              <motion.div key={i} variants={fadeIn} className="relative">
                <div className="absolute left-[-31px] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background ring-2 ring-border"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">{edu.title}</h3>
                </div>
                <div className="text-primary font-medium text-sm mb-1">{edu.institution}</div>
                <div className="text-xs text-muted-foreground mb-4">{edu.univ}</div>
                
                {edu.extra && (
                  <div className="bg-secondary/40 border border-border/40 px-4 py-2 rounded-md inline-block">
                    <span className="text-sm text-muted-foreground">{edu.extra}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CERTIFICATIONS SECTION */}
        <motion.section 
          id="certifications" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold mb-12">
            Certifications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Google Gemini Campus Ambassador", issuer: "Google" },
              { title: "IBM PBEL AI Virtual Internship", issuer: "IBM / AICTE" },
              { title: "Tata GenAI Powered Data Analytics Simulation", issuer: "Tata / Forage" },
              { title: "Tata Data Visualisation Simulator", issuer: "Tata / Forage" },
              { title: "Deloitte Technology Simulation", issuer: "Deloitte / Forage" },
              { title: "Deloitte Cyber Simulation", issuer: "Deloitte / Forage" },
              { title: "Goldman Sachs Operations Simulation", issuer: "Goldman Sachs / Forage" },
              { title: "GUVI HCL Python Certification", issuer: "GUVI / HCL" },
            ].map((cert, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="h-full bg-background border-border hover:border-primary/40 hover:bg-secondary/20 transition-all duration-300">
                  <CardContent className="p-5 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase">{cert.issuer}</span>
                      </div>
                      <p className="text-sm font-semibold leading-snug text-foreground mb-4">{cert.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ACHIEVEMENTS SECTION */}
        <motion.section 
          id="achievements" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Key Achievements</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-4">
                {[
                  "Selected as Google Gemini Campus Ambassador to lead Generative AI evangelism and learning workshops.",
                  "Completed rigorous Virtual Internships with IBM (AI-focus) and Deloitte (Tech & Cyber Simulators).",
                  "Consistently ranked in the top tier of B.Tech CSE cohort."
                ].map((ach, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-muted-foreground">
                    <Check className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CODING PROFILES SECTION */}
        <motion.section 
          id="profiles" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold mb-12">
            Coding Profiles
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "LeetCode", info: "Practice Portfolio", link: "https://leetcode.com/", icon: Code },
              { name: "GeeksforGeeks", info: "Practice Portfolio", link: "https://www.geeksforgeeks.org/", icon: BookOpen },
              { name: "HackerRank", info: "Algorithms Badges", link: "https://www.hackerrank.com/", icon: Terminal },
              { name: "CodeChef", info: "Contest Ranks", link: "https://www.codechef.com/", icon: Cpu },
              { name: "GitHub", info: "Version Repos", link: "https://github.com/Prithvi0615", icon: Github }
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} variants={fadeIn}>
                  <a href={p.link} target="_blank" rel="noreferrer" className="block">
                    <Card className="h-full bg-secondary/30 border-border/50 hover:border-primary/50 hover:bg-secondary/60 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-bold text-base text-foreground mb-1 font-display">{p.name}</h3>
                        <span className="text-xs text-muted-foreground">{p.info}</span>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.section>



        {/* CONTACT SECTION */}
        <motion.section 
          id="contact" 
          className="py-24 border-t border-border/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Let's Connect</h2>
              <p className="text-lg text-muted-foreground mb-8">
                I am actively seeking software engineering internships and junior developer roles. Reach out if you want to collaborate or have an opportunity!
              </p>

              <div className="space-y-4">
                <a href="mailto:work.cms.rjpm@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <span>work.cms.rjpm@gmail.com</span>
                </a>
                <a href="tel:9453044441" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <span>9453044441</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span>Lucknow, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="bg-secondary/20 border-border/50 p-6 sm:p-8">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-semibold text-foreground/80 block mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-foreground/80 block mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-semibold text-foreground/80 block mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      required
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                      className="w-full p-4 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    ></textarea>
                  </div>

                  <Button type="submit" disabled={formStatus === "submitting"} className="w-full h-11 font-semibold text-sm">
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>

                  {formStatus !== "idle" && formStatus !== "submitting" && (
                    <div className={`p-4 rounded-md text-sm mt-4 ${
                      formStatus === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}>
                      {formFeedback}
                    </div>
                  )}
                </form>
              </Card>
            </div>
          </div>
        </motion.section>

      </main>

      <footer className="py-12 border-t border-border/50 bg-secondary/10 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-6">
          <h3 className="font-display font-bold text-foreground text-lg mb-4">Prithvi Dev Singh</h3>
          <div className="flex justify-center items-center gap-6 mb-6">
            <a href="https://github.com/Prithvi0615" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/prithvi-dev-singh-177aa5293" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://leetcode.com/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LeetCode</a>
            <a href="mailto:work.cms.rjpm@gmail.com" className="hover:text-primary transition-colors">Email</a>
          </div>
          <p>© {new Date().getFullYear()} Prithvi Dev Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}