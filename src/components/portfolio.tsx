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
  technicalSkills,
} from "@/data/portfolio";
import { withBasePath } from "@/lib/site-path";
import { AwardsCarousel } from "./awards-carousel";
import styles from "./portfolio.module.css";

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Awards", href: "#awards" },
  { label: "Research", href: "/research" },
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

const loaderNameWords = [
  { word: "MEHEDI", offset: 0 },
  { word: "HASAN", offset: 6 },
  { word: "NIPU", offset: 11 },
] as const;

const loaderGlyphFragments = [
  { value: "M", code: "01", left: "5%", top: "14%", x: -90, y: -42, z: -180, rx: 58, ry: -34, rz: -14 },
  { value: "{ }", code: "02", left: "22%", top: "8%", x: 38, y: -72, z: 120, rx: -42, ry: 48, rz: 9 },
  { value: "01", code: "03", left: "47%", top: "11%", x: -26, y: -86, z: -240, rx: 66, ry: 18, rz: -8 },
  { value: "H", code: "04", left: "75%", top: "9%", x: 72, y: -58, z: 170, rx: -54, ry: -38, rz: 14 },
  { value: "</>", code: "05", left: "90%", top: "22%", x: 110, y: -20, z: -120, rx: 32, ry: 62, rz: -11 },
  { value: "N", code: "06", left: "5%", top: "68%", x: -104, y: 44, z: 150, rx: -68, ry: 28, rz: 12 },
  { value: "[ ]", code: "07", left: "18%", top: "84%", x: -54, y: 86, z: -210, rx: 44, ry: -56, rz: -16 },
  { value: "AI", code: "08", left: "47%", top: "82%", x: 22, y: 94, z: 190, rx: -36, ry: 32, rz: 7 },
  { value: "//", code: "09", left: "75%", top: "85%", x: 62, y: 78, z: -160, rx: 62, ry: 46, rz: 15 },
  { value: "*", code: "10", left: "91%", top: "69%", x: 116, y: 48, z: 130, rx: -48, ry: -64, rz: -10 },
  { value: "R3", code: "11", left: "9%", top: "43%", x: -126, y: 4, z: -280, rx: 28, ry: 72, rz: 18 },
  { value: "XYZ", code: "12", left: "86%", top: "45%", x: 132, y: -8, z: 230, rx: -30, ry: -70, rz: -18 },
] as const;

const featuredPublications = publications.slice(0, 3);

const heroContentVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.1 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
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
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const settleTimer = window.setTimeout(() => setIsSettled(true), 1380);
    return () => window.clearTimeout(settleTimer);
  }, [shouldReduceMotion]);

  const loaderReady = shouldReduceMotion || isSettled;
  const loaderStatus = loaderReady
    ? "WELCOME"
    : "COMPOSING IDENTITY";

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
      <div className={styles.loaderScene} aria-hidden="true">
        <motion.div
          className={styles.loaderGridPlane}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: "18%", rotateX: 64 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 0.18, y: 0, rotateX: 60 }
              : {
                  opacity: [0, 0.56, 0.24],
                  y: ["18%", "0%", "-8%"],
                  rotateX: [64, 60, 56],
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.01 : 1.65,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        <div className={styles.loaderCorePosition}>
          <motion.div
            className={styles.loaderCore}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.52,
                    rotateX: 62,
                    rotateY: -54,
                    rotateZ: 18,
                    z: -260,
                  }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 0.14 }
                : {
                    opacity: [0, 0.44, 0.16],
                    scale: [0.52, 1.04, 0.9],
                    rotateX: [62, 38, 26],
                    rotateY: [-54, 18, 38],
                    rotateZ: [18, -7, -13],
                    z: [-260, 40, -30],
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0.01 : 1.62,
              times: [0, 0.58, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className={styles.loaderCoreFrame} />
            <span className={styles.loaderCoreFrame} />
            <span className={styles.loaderCoreFrame} />
            <span className={styles.loaderCoreMark}>MHN</span>
          </motion.div>
        </div>

        <div className={styles.loaderGlyphField}>
          {loaderGlyphFragments.map((glyph, index) => (
            <motion.span
              className={styles.loaderGlyph}
              style={{ left: glyph.left, top: glyph.top }}
              key={glyph.code}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: glyph.x,
                      y: glyph.y,
                      z: glyph.z,
                      rotateX: glyph.rx,
                      rotateY: glyph.ry,
                      rotateZ: glyph.rz,
                      scale: 0.54,
                    }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 0.14 }
                  : {
                      opacity: [0, 0.78, 0.5, 0.12],
                      x: [glyph.x, 0, 0, glyph.x * -0.12],
                      y: [glyph.y, 0, 0, glyph.y * -0.08],
                      z: [glyph.z, glyph.z * -0.14, 24, glyph.z * 0.22],
                      rotateX: [glyph.rx, glyph.rx * -0.12, 0, 0],
                      rotateY: [glyph.ry, glyph.ry * -0.14, 0, glyph.ry * -0.24],
                      rotateZ: [glyph.rz, 0, 0, glyph.rz * -0.22],
                      scale: [0.54, 1.04, 1, 0.84],
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0.01 : 1.58,
                delay: shouldReduceMotion ? 0 : index * 0.018,
                times: [0, 0.34, 0.72, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <small>{glyph.code}</small>
              <b>{glyph.value}</b>
            </motion.span>
          ))}
        </div>
      </div>
      <div className={styles.loaderInner}>
        <motion.div
          className={styles.loaderName}
          aria-label="MEHEDI HASAN NIPU"
        >
          {loaderNameWords.map(({ word, offset }) => (
            <span className={styles.loaderWord} key={word} aria-hidden="true">
              {Array.from(word).map((letter, letterIndex) => {
                const globalIndex = offset + letterIndex;
                const direction = globalIndex % 2 === 0 ? 1 : -1;
                const lateralDirection = (globalIndex % 3) - 1;

                return (
                  <motion.span
                    className={styles.loaderLetter}
                    key={`${word}-${letterIndex}`}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: `${direction * 0.78}em`,
                            rotateX: direction * 78,
                            rotateY: lateralDirection * 28,
                            rotateZ: direction * (3 + (globalIndex % 3) * 2),
                            scale: 0.68,
                            filter: "blur(12px)",
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      rotateY: 0,
                      rotateZ: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 0.7,
                      delay: shouldReduceMotion ? 0 : 0.08 + globalIndex * 0.042,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.div>
        <motion.div
          className={styles.loaderReadout}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.32 }}
        >
          <span>
            <i
              className={`${styles.loaderSignal} ${
                loaderReady ? styles.loaderSignalReady : ""
              }`}
              aria-hidden="true"
            />
            <motion.b
              key={loaderStatus}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.16 }}
            >
              {loaderStatus}
            </motion.b>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeout = window.setTimeout(
      () => setIsLoading(false),
      prefersReducedMotion ? 100 : 1700,
    );
    return () => window.clearTimeout(timeout);
  }, []);

  const closeMenu = () => setMenuOpen(false);

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
            <a key={item.href} href={withBasePath(item.href)}>
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
              <a
                key={item.href}
                href={withBasePath(item.href)}
                onClick={closeMenu}
              >
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <main>
        <section id="top" className={styles.hero}>
          <div className={styles.heroShell}>
            <motion.div
              className={styles.heroCopy}
              variants={heroContentVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={isLoading ? "hidden" : "visible"}
            >
              <motion.div
                className={styles.heroEyebrow}
                variants={heroItemVariants}
              >
                <span>APPLICATION DEVELOPER(AI/ML)</span>
                <span>DHAKA, BANGLADESH</span>
              </motion.div>

              <motion.h1 variants={heroItemVariants}>
                Mehedi Hasan <em>Nipu.</em>
              </motion.h1>

              <motion.p
                className={styles.heroRole}
                variants={heroItemVariants}
              >
                AI engineer &amp; researcher
              </motion.p>

              <motion.p
                className={styles.heroIntro}
                variants={heroItemVariants}
              >
                I build reliable agentic systems, language-model applications,
                and applied machine-learning products for real operational
                work.
              </motion.p>

              <motion.div
                className={styles.heroActions}
                variants={heroItemVariants}
              >
                <a className={styles.primaryButton} href="#work">
                  Selected work <ArrowDownRight size={17} />
                </a>
                <a
                  className={styles.heroTextLink}
                  href={withBasePath("/research")}
                >
                  Research <ArrowRight size={15} />
                </a>
                <a
                  className={styles.heroTextLink}
                  href={withBasePath("/cv")}
                >
                  CV <ArrowRight size={15} />
                </a>
              </motion.div>
            </motion.div>

            <motion.figure
              className={styles.heroPortrait}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.96, x: 24 }
              }
              animate={
                isLoading
                  ? { opacity: 0 }
                  : { opacity: 1, scale: 1, x: 0 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.72,
                delay: shouldReduceMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={styles.heroPortraitImage}>
                <Image
                  src={withBasePath("/images/avatar.png")}
                  alt="Portrait of Mehedi Hasan Nipu"
                  fill
                  sizes="(max-width: 820px) 72vw, 400px"
                  priority
                />
              </div>
              <figcaption>
                <span>MEHEDI HASAN NIPU</span>
              </figcaption>
            </motion.figure>
          </div>

          <motion.a
            className={styles.heroScroll}
            href="#profile"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.55 }}
          >
            Scroll to profile <ArrowDownRight size={14} />
          </motion.a>
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
                  I am an AI engineer and researcher focused on
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
                  <strong>{publications.length}</strong>
                  <span>Research outputs in the dedicated archive</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>Years bridging research and delivery</span>
                </div>
              </Reveal>
            </div>

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
                        src={withBasePath(item.logo)}
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
                      src={withBasePath("/images/graduation.jpg")}
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

        <section className={styles.featuredSection}>
          <div className={styles.sectionInner}>
            <Reveal
              className={`${styles.sectionHeading} ${styles.headingOnDark}`}
            >
              <p className={styles.sectionIndex}>06 / FEATURED PUBLICATIONS</p>
              <h2>Selected research.</h2>
              <p className={styles.sectionSummary}>
                Three recent outputs from the complete research archive.
              </p>
            </Reveal>

            <div className={styles.featuredGrid}>
              {featuredPublications.map((publication, index) => (
                <motion.article
                  className={styles.featuredCard}
                  key={publication.title}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 26, scale: 0.985 }
                  }
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.56,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                >
                  <header>
                    <span>{publication.category}</span>
                    <span>{publication.publishedDate ?? publication.year}</span>
                  </header>
                  <h3>{publication.title}</h3>
                  {publication.authors?.length ? (
                    <p className={styles.featuredAuthors}>
                      {publication.authors.map((author, authorIndex) => (
                        <span key={author}>
                          {author === "Md Mehedi Hasan Nipu" ? (
                            <strong>{author}</strong>
                          ) : (
                            author
                          )}
                          {authorIndex < publication.authors!.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p className={styles.featuredAuthors}>
                      Mehedi Hasan Nipu and collaborators
                    </p>
                  )}
                  <footer>
                    <span>{publication.venue}</span>
                    {publication.href ? (
                      <a
                        href={publication.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${publication.title}`}
                      >
                        Paper <ArrowUpRight size={14} />
                      </a>
                    ) : null}
                  </footer>
                </motion.article>
              ))}
            </div>

            <Reveal className={styles.featuredBrowse}>
              <a href={withBasePath("/research")}>
                Browse all publications <ArrowRight size={16} />
              </a>
              <span>{String(publications.length).padStart(2, "0")} records</span>
            </Reveal>
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
                <p>© Mehedi Hasan Nipu</p>
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