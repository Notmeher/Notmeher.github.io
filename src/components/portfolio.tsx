"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { SiGooglescholar, SiOrcid, SiResearchgate } from "react-icons/si";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  activities,
  capabilities,
  experience,
  publications,
  researchInterests,
  technicalSkills,
  type PublicationFilter,
} from "@/data/portfolio";
import { SignalField } from "./signal-field";
import { AwardsCarousel } from "./awards-carousel";
import styles from "./portfolio.module.css";

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Awards", href: "#awards" },
  { label: "Research", href: "#research" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "#contact" },
];

const navbarLinks = [
  {
    label: "Email",
    href: "mailto:lifeasmeher@gmail.com",
    icon: MdOutlineEmail,
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?view_op=list_works&hl=en&user=PaBcNmIAAAAJ",
    icon: SiGooglescholar,
  },
  {
    label: "GitHub",
    href: "https://github.com/Notmeher",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/notmeher4459/",
    icon: FaLinkedinIn,
  },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Mehedi-Hasan-Nipu",
    icon: SiResearchgate,
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0009-0008-8251-2857",
    icon: SiOrcid,
  },
];

const publicationFilters: PublicationFilter[] = [
  "All",
  "Journal",
  "Conference",
  "Dataset",
];

const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.12 },
  },
};

const heroEyebrowVariants = {
  hidden: { opacity: 0, x: -22 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const heroLineVariants = {
  hidden: { y: "112%", rotate: 1.5 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.76, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const heroLeadVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(9px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const heroActionsVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 230, damping: 22 },
  },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 30, filter: "blur(7px)" }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Loader() {
  const shouldReduceMotion = useReducedMotion();
  const nameWords = [
    { word: "MEHEDI", offset: 0 },
    { word: "HASAN", offset: 6 },
    { word: "NIPU", offset: 11 },
  ];

  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      exit={
        shouldReduceMotion
          ? { opacity: 0, transition: { duration: 0.01 } }
          : {
              clipPath: "inset(0% 0% 100% 0%)",
              transition: { duration: 0.58, ease: [0.76, 0, 0.24, 1] },
            }
      }
      aria-label="Loading portfolio"
    >
      <motion.span
        className={styles.loaderSweep}
        initial={{ x: "-120%" }}
        animate={{ x: "340%" }}
        transition={{
          duration: shouldReduceMotion ? 0.01 : 1.38,
          ease: [0.65, 0, 0.35, 1],
        }}
        aria-hidden="true"
      />
      <div className={styles.loaderInner}>
        <motion.div
          className={styles.loaderName}
          aria-label="MEHEDI HASAN NIPU"
        >
          {nameWords.map(({ word, offset }) => (
            <span className={styles.loaderWord} key={word} aria-hidden="true">
              {Array.from(word).map((letter, letterIndex) => (
                <motion.span
                  className={styles.loaderLetter}
                  key={`${word}-${letterIndex}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: "0.72em",
                          filter: "blur(7px)",
                        }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.42,
                    delay: shouldReduceMotion
                      ? 0
                      : 0.08 + (offset + letterIndex) * 0.048,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
          <motion.i
            className={styles.loaderCaret}
            animate={
              shouldReduceMotion ? undefined : { opacity: [0.2, 1, 0.2] }
            }
            transition={{ duration: 0.8, repeat: Infinity }}
            aria-hidden="true"
          />
        </motion.div>
        <motion.div
          className={styles.loaderReadout}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.32 }}
        >
          <span>
            <i className={styles.loaderSignal} aria-hidden="true" />
            LOADING
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [publicationFilter, setPublicationFilter] =
    useState<PublicationFilter>("All");
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageScrollProgress } = useScroll();
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 38%"],
  });
  const progressScale = useSpring(pageScrollProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  });
  const timelineScale = useSpring(timelineScrollProgress, {
    stiffness: 105,
    damping: 24,
    mass: 0.32,
  });

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setIsLoading(false),
      shouldReduceMotion ? 100 : 1700,
    );
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  const closeMenu = () => setMenuOpen(false);
  const filteredPublications = publications.filter(
    (publication) =>
      publicationFilter === "All" ||
      publication.category === publicationFilter,
  );

  return (
    <div className={styles.site}>
      <AnimatePresence>{isLoading ? <Loader /> : null}</AnimatePresence>
      <motion.div
        className={styles.scrollProgress}
        style={{ scaleX: progressScale }}
      />

      <header className={styles.header}>
        <nav className={styles.navSocials} aria-label="Profiles and contact">
          {navbarLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                className={styles.navSocialLink}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={item.label}
                data-tooltip={item.label}
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </nav>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <button
            className={styles.menuButton}
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item, index) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <main>
        <section id="top" className={styles.hero}>
          <SignalField />

          <motion.div
            className={styles.heroContent}
            variants={heroContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={isLoading ? "hidden" : "visible"}
          >
            <motion.div
              className={styles.eyebrow}
              variants={heroEyebrowVariants}
            >
              <span>APPLICATION DEVELOPER</span>
              <span>DHAKA, BD · 23.8103° N</span>
            </motion.div>
            <h1>
              <span className={styles.heroNameLine}>
                <motion.span variants={heroLineVariants}>
                  Mehedi Hasan
                </motion.span>
              </span>
              <span
                className={`${styles.heroNameLine} ${styles.heroNameAccent}`}
              >
                <motion.span variants={heroLineVariants}>Nipu.</motion.span>
              </span>
            </h1>
            <motion.p
              className={styles.heroLead}
              variants={heroLeadVariants}
            >
              I build production AI systems where agents, people, and reliable
              software meet.
            </motion.p>
            <motion.div
              className={styles.heroActions}
              variants={heroActionsVariants}
            >
              <a className={styles.primaryButton} href="#work">
                Explore selected work <ArrowDownRight size={17} />
              </a>
              <a
                className={styles.iconButton}
                href="https://github.com/Notmeher"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <span aria-hidden="true">GH</span>
              </a>
              <a
                className={styles.iconButton}
                href="https://www.linkedin.com/in/notmeher4459/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <span aria-hidden="true">in</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroVisual}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.82,
                    rotate: 2.5,
                    clipPath: "inset(48% 48% 48% 48%)",
                  }
            }
            animate={
              isLoading
                ? { opacity: 0 }
                : {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    clipPath: "inset(0% 0% 0% 0%)",
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.9,
              delay: shouldReduceMotion ? 0 : 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className={styles.heroPortraitFrame}>
              <motion.div
                className={styles.heroPortraitLayer}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 54, scale: 1.08 }
                }
                animate={
                  isLoading
                    ? { opacity: 0 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.78,
                  delay: shouldReduceMotion ? 0 : 0.66,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Image
                  className={styles.heroPortrait}
                  src="/images/portrait-transparent.png"
                  alt="Portrait of Mehedi Hasan Nipu"
                  fill
                  sizes="(max-width: 560px) 82vw, (max-width: 820px) 340px, 450px"
                  priority
                />
              </motion.div>

              <motion.span
                className={styles.portraitScan}
                initial={shouldReduceMotion ? false : { top: "8%", opacity: 0 }}
                animate={
                  isLoading || shouldReduceMotion
                    ? { opacity: 0 }
                    : { top: ["8%", "92%"], opacity: [0, 0.55, 0] }
                }
                transition={{
                  duration: 2.1,
                  delay: 1.05,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 4.2,
                }}
                aria-hidden="true"
              />

              <div className={styles.portraitCorners} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </motion.div>

          <a className={styles.scrollCue} href="#profile">
            <span>SCROLL TO READ</span>
            <ArrowDownRight size={16} />
          </a>
        </section>

        <section id="profile" className={styles.profileSection}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeading}>
              <p className={styles.sectionIndex}>01 / PROFILE</p>
              <h2>
                From research questions to software that works in the real
                world.
              </h2>
            </Reveal>

            <div className={styles.profileGrid}>
              <Reveal className={styles.profileCopy}>
                <p className={styles.leadStatement}>
                  I am an application developer and AI researcher focused on
                  building useful, accountable systems around large language
                  models.
                </p>
                <p>
                  At DEXIAN, I design agentic workflows with the Claude Agent
                  SDK, LangGraph, and Azure OpenAI. My work spans government
                  procurement, software generation, enterprise compliance, and
                  model-cost analytics. Across each domain, the goal is the
                  same: make advanced AI dependable enough to use.
                </p>
                <p>
                  My research extends that practice into trustworthy AI,
                  multi-agent collaboration, medical decision support, and
                  human-LLM interaction.
                </p>
              </Reveal>

              <Reveal className={styles.profileFacts} delay={0.08}>
                <div>
                  <strong>06</strong>
                  <span>Production systems selected below</span>
                </div>
                <div>
                  <strong>08</strong>
                  <span>Publications and open datasets</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>Years bridging research and delivery</span>
                </div>
              </Reveal>
            </div>

            <Reveal className={styles.interestRail}>
              <span className={styles.railLabel}>RESEARCH SIGNALS</span>
              <div>
                {researchInterests.map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="work" className={styles.workSection}>
          <div className={styles.sectionInner}>
            <Reveal
              className={`${styles.sectionHeading} ${styles.headingOnDark}`}
            >
              <p className={styles.sectionIndex}>02 / PROFESSIONAL EXPERIENCE</p>
              <h2>Roles, projects, and the work behind them.</h2>
              <p className={styles.sectionSummary}>
                Each project is grouped under the position where I designed,
                built, and shipped it.
              </p>
            </Reveal>

            <div className={styles.roleTimeline} ref={timelineRef}>
              <span className={styles.timelineSpine} aria-hidden="true">
                <motion.span
                  style={{ scaleY: shouldReduceMotion ? 1 : timelineScale }}
                />
              </span>
              {experience.map((item, roleIndex) => (
                <motion.article
                  className={styles.roleGroup}
                  key={`${item.role}-${item.period}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={
                    shouldReduceMotion ? { opacity: 1, y: 0 } : undefined
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(roleIndex * 0.06, 0.12),
                  }}
                >
                  <aside className={styles.roleRail}>
                    <motion.span
                      className={styles.roleMarker}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0.35, scale: 0.55 }
                      }
                      animate={
                        shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined
                      }
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        delay: shouldReduceMotion ? 0 : roleIndex * 0.08,
                      }}
                      aria-hidden="true"
                    />
                    <p className={styles.roleIndex}>POSITION 0{roleIndex + 1}</p>
                    <p className={styles.rolePeriod}>{item.period}</p>
                    <div
                      className={`${styles.companyLogo} ${
                        item.logoTone === "dark"
                          ? styles.companyLogoDark
                          : styles.companyLogoLight
                      }`}
                    >
                      <Image
                        src={item.logo}
                        alt={item.logoAlt}
                        fill
                        sizes="110px"
                      />
                    </div>
                    <a
                      className={styles.roleCompany}
                      href={item.companyHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.company} <ArrowUpRight size={13} />
                    </a>
                    {item.location ? (
                      <p className={styles.roleLocation}>{item.location}</p>
                    ) : null}
                  </aside>

                  <div className={styles.roleContent}>
                    <header className={styles.roleHeader}>
                      <h3>{item.role}</h3>
                      <p>{item.summary}</p>
                    </header>

                    <div className={styles.roleProjects}>
                      {item.projects.map((project, projectIndex) => (
                        <motion.article
                          className={styles.roleProject}
                          key={project.title}
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, y: 24, scale: 0.985 }
                          }
                          animate={
                            shouldReduceMotion
                              ? { opacity: 1, y: 0, scale: 1 }
                              : undefined
                          }
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                          viewport={{ once: true, amount: 0.14 }}
                          transition={{
                            duration: 0.56,
                            delay: shouldReduceMotion
                              ? 0
                              : Math.min(projectIndex * 0.08, 0.16),
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <header className={styles.roleProjectHeader}>
                            <span>{project.number}</span>
                            <h4>{project.title}</h4>
                          </header>

                          <ul
                            className={styles.achievementList}
                            aria-label={`${project.title} achievements`}
                          >
                            {project.achievements.map((achievement) => (
                              <li key={achievement.lead}>
                                <span aria-hidden="true">■</span>
                                <p>
                                  <strong>{achievement.lead}</strong>{" "}
                                  {achievement.detail}
                                </p>
                              </li>
                            ))}
                          </ul>

                          <div className={styles.projectStack}>
                            <span>TECH STACK</span>
                            <ul aria-label={`${project.title} technologies`}>
                              {project.technologies.map((technology) => (
                                <li key={technology}>{technology}</li>
                              ))}
                            </ul>
                          </div>

                          {project.links?.length ? (
                            <div className={styles.projectActions}>
                              {project.links.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {link.label} <ArrowUpRight size={14} />
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </motion.article>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.educationSection}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeading}>
              <p className={styles.sectionIndex}>03 / EDUCATION</p>
              <h2>The foundation beneath the practice.</h2>
            </Reveal>

            <div className={styles.educationLayout}>
              <Reveal className={styles.educationCopy}>
                <article className={styles.educationRecord}>
                  <p className={styles.educationLabel}>
                    NORTH SOUTH UNIVERSITY
                  </p>
                  <h3>B.Sc. in Computer Science & Engineering</h3>
                  <p className={styles.educationMeta}>
                    January 2019 - January 2024 · Dhaka, Bangladesh
                  </p>
                  <dl>
                    <div>
                      <dt>Thesis</dt>
                      <dd>
                        Comparative Analysis of Deep Learning Algorithms for
                        Multiple Disease Prediction
                      </dd>
                    </div>
                    <div>
                      <dt>Focus</dt>
                      <dd>
                        Machine learning, deep learning, computer vision, and
                        healthcare AI
                      </dd>
                    </div>
                    <div>
                      <dt>Credits</dt>
                      <dd>138</dd>
                    </div>
                  </dl>
                </article>

                <article className={styles.educationRecord}>
                  <p className={styles.educationLabel}>
                    BIRSHRESHTHA NOOR MOHAMMAD PUBLIC COLLEGE · BNMPC
                  </p>
                  <h3>Higher Secondary Certificate (HSC), Science</h3>
                  <p className={styles.educationMeta}>
                    Jun 2016 - Jun 2018 · Dhaka, Bangladesh
                  </p>
                </article>
              </Reveal>

              <Reveal delay={0.1}>
                <figure className={styles.educationFigure}>
                  <div className={styles.educationImage}>
                    <Image
                      src="/images/graduation.jpg"
                      alt="Mehedi Hasan Nipu at his North South University graduation"
                      fill
                      sizes="(max-width: 820px) 100vw, 420px"
                    />
                  </div>
                  <figcaption>
                    <span>GRADUATION / 2024</span>
                    <strong>North South University</strong>
                    <span>Dhaka, Bangladesh</span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className={styles.skillsSection}>
          <div className={styles.sectionInner}>
            <Reveal
              className={`${styles.sectionHeading} ${styles.headingOnDark}`}
            >
              <p className={styles.sectionIndex}>04 / TECHNICAL SKILLS</p>
              <h2>The working stack behind the systems.</h2>
              <p className={styles.sectionSummary}>
                Languages, frameworks, cloud services, and engineering
                practices used across production applications and research.
              </p>
            </Reveal>

            <div className={styles.skillsGrid}>
              {technicalSkills.map((skillGroup, index) => (
                <Reveal
                  className={styles.skillGroup}
                  delay={Math.min(index * 0.04, 0.16)}
                  key={skillGroup.category}
                >
                  <div className={styles.skillGroupHeader}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{skillGroup.category}</h3>
                  </div>
                  <ul aria-label={skillGroup.category}>
                    {skillGroup.items.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="awards" className={styles.awardsSection}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeading}>
              <p className={styles.sectionIndex}>05 / AWARDS & CERTIFICATIONS</p>
              <h2>Awards & Certifications.</h2>
              <p className={styles.sectionSummary}>
                Verified credentials, professional service, and recognition
                from academic and industry organizations.
              </p>
            </Reveal>

            <Reveal>
              <AwardsCarousel />
            </Reveal>
          </div>
        </section>

        <section id="research" className={styles.researchSection}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeading}>
              <p className={styles.sectionIndex}>06 / RESEARCH INDEX</p>
              <h2>Evidence before certainty.</h2>
              <p className={styles.sectionSummary}>
                Work across multi-agent safety, clinical AI, computer vision,
                federated learning, and responsible datasets.
              </p>
            </Reveal>

            <div
              className={styles.filterBar}
              role="group"
              aria-label="Filter publications"
            >
              {publicationFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    filter === publicationFilter
                      ? styles.filterActive
                      : undefined
                  }
                  onClick={() => setPublicationFilter(filter)}
                  aria-pressed={filter === publicationFilter}
                >
                  {filter}
                  <span>
                    {filter === "All"
                      ? publications.length
                      : publications.filter((item) => item.category === filter)
                          .length}
                  </span>
                </button>
              ))}
            </div>

            <motion.div layout className={styles.publicationList}>
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredPublications.map((publication) => (
                  <motion.article
                    layout
                    key={publication.title}
                    className={styles.publicationRow}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className={styles.publicationMeta}>
                      <span>{publication.category}</span>
                      <span>{publication.year}</span>
                    </div>
                    <div className={styles.publicationMain}>
                      <h3>{publication.title}</h3>
                      <p>{publication.venue}</p>
                    </div>
                    <span className={styles.publicationStatus}>
                      {publication.status}
                    </span>
                    {publication.href ? (
                      <a
                        href={publication.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open publication: ${publication.title}`}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    ) : null}
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            <a
              className={styles.scholarLink}
              href="https://scholar.google.com/citations?view_op=list_works&hl=en&user=PaBcNmIAAAAJ"
              target="_blank"
              rel="noreferrer"
            >
              View complete Google Scholar profile <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <section className={styles.activitySection}>
          <div className={styles.sectionInner}>
            <Reveal
              className={`${styles.sectionHeading} ${styles.headingOnDark}`}
            >
              <p className={styles.sectionIndex}>07 / NOW & RECENT</p>
              <h2>Field notes from the work.</h2>
            </Reveal>
            <div className={styles.activityList}>
              {activities.map((activity, index) => (
                <Reveal
                  className={styles.activityRow}
                  delay={index * 0.05}
                  key={`${activity.date}-${activity.label}`}
                >
                  <p>{activity.date}</p>
                  <span>{activity.label}</span>
                  <p>{activity.text}</p>
                  {activity.href ? (
                    <a
                      href={activity.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Read ${activity.label} from ${activity.date}`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.capabilitySection}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.capabilityIntro}>
              <p className={styles.sectionIndex}>08 / CAPABILITIES</p>
              <h2>Where I can contribute.</h2>
            </Reveal>
            <div className={styles.capabilityGrid}>
              {capabilities.map((capability, index) => (
                <Reveal
                  className={styles.capabilityItem}
                  delay={index * 0.07}
                  key={capability.title}
                >
                  <span>{capability.number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={styles.contactSection}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.contactLayout}>
              <div>
                <p className={styles.contactKicker}>HAVE A HARD AI PROBLEM?</p>
                <h2>Let&apos;s make it useful.</h2>
              </div>
              <div className={styles.contactBody}>
                <p>
                  I am open to research collaboration, applied AI projects, and
                  conversations about agentic systems that need to work beyond
                  the demo.
                </p>
                <a
                  className={styles.contactButton}
                  href="mailto:lifeasmeher@gmail.com"
                >
                  Start a conversation <Mail size={18} />
                </a>
              </div>
            </Reveal>

            <footer className={styles.contactFooter}>
              <div className={styles.closingBottom}>
                <p>© 2026 Mehedi Hasan Nipu</p>
                <div>
                  <a
                    href="https://github.com/Notmeher"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/notmeher4459/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a href="mailto:lifeasmeher@gmail.com">Email</a>
                  <a href="#top" aria-label="Back to top">
                    Back to top <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}