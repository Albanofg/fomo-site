"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";

const SECTIONS = [
  { id: "architecture", label: "Architecture" },
  { id: "tokens", label: "Tokens" },
  { id: "invariants", label: "Invariants" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "tokenomics", label: "Tokenomics" },
  { id: "governance", label: "Governance" },
];

const INVARIANTS = [
  { num: "01", title: "Conservation of Value", desc: "Netting must result in zero-sum net positions across all parties within a scope." },
  { num: "02", title: "No Double Consume", desc: "A CER may not be satisfied more than once within a batch." },
  { num: "03", title: "Scope Consistency", desc: "All netted obligations must share the same denomination reference." },
  { num: "04", title: "Lifecycle Integrity", desc: "Only ACTIVE obligations may transition to SATISFIED states." },
  { num: "05", title: "Determinism", desc: "Eligibility, batching, and verification must be fully deterministic across all nodes." },
  { num: "06", title: "No Oracles", desc: "The protocol does not rely on external price feeds. Ever." },
  { num: "07", title: "No Asset Custody", desc: "The system never holds user funds. It records and compresses." },
  { num: "08", title: "Supply Cap", desc: "Total FOMOG supply never exceeds 21,000,000. Hard cap. No exceptions." },
  { num: "09", title: "Bond Scaling", desc: "Bond requirements increase during systemic stress. Anti-procyclical by design." },
];

const CER_STEPS = ["CER Created", "Eligibility Snapshot", "Proposed for Netting", "Verified", "Satisfied", "Finalized On-Chain"];
const EPOCH_STEPS = ["Collect Eligible CERs", "Compute Commitment", "Submit Proposals", "Bond Check", "Challenge Window", "Finalization"];

const ISSUANCE = [
  "Successful netting participation",
  "Paying obligations that are successfully netted",
  "Originating new participants and expanding network",
  "Operating netting servers",
  "Operating relay servers",
];

const COMPARE = [
  { attr: "Supply Cap", btc: "21 million BTC", fomog: "21 million FOMOG" },
  { attr: "Issuance", btc: "Mining rewards (hash power)", fomog: "Earned via economic activity" },
  { attr: "Secures", btc: "Transaction ordering", fomog: "Clearing correctness" },
  { attr: "Security Model", btc: "Energy expenditure", fomog: "Bonded stake" },
  { attr: "Incentives", btc: "Block production", fomog: "Liquidity compression & throughput" },
  { attr: "Discretionary Issuance", btc: "None", fomog: "None" },
];

const GOV_CARDS = [
  { icon: "\u2B21", title: "Protocol Upgrades", desc: "FOMOG holders vote on protocol changes and feature flags including cross-shard activation." },
  { icon: "\u2B22", title: "Parameter Control", desc: "Governance adjusts bonding parameters and system parameters. Cannot violate core invariants." },
  { icon: "\u25C7", title: "No Central Authority", desc: "No government controls shutdown. No entity controls individual CER states. Deterministic operation." },
  { icon: "\u25B3", title: "No Asset Custody", desc: "Governance does not custody assets. It governs protocol parameters, nothing more." },
  { icon: "\u25BD", title: "Invariant Protection", desc: "Governance can modify parameters but can never violate conservation rules or the supply cap." },
  { icon: "\u25C8", title: "Jurisdictional Neutrality", desc: "The CER chain operates deterministically regardless of jurisdiction. No region-specific logic." },
];

/* ── Reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", style = {}, as: Tag = "div", delay = 0 }) {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ── Small components ── */
function SectionTag({ children }) {
  return <div style={s.sectionTag}><span style={s.tagLine} />{children}</div>;
}

function Divider() {
  return (
    <div style={s.divider}>
      <div style={s.dividerGlow} />
    </div>
  );
}

function FlowStep({ num, label, accent = "var(--accent)" }) {
  return (
    <div style={s.flowStep}>
      <div style={{ ...s.flowNode, borderColor: accent, color: accent }}>{String(num).padStart(2, "0")}</div>
      <div style={s.flowLabel}>{label}</div>
    </div>
  );
}

function FlowArrow({ color = "var(--accent)" }) {
  return (
    <div style={{ ...s.flowArrow, background: `linear-gradient(90deg, ${color}, transparent)` }}>
      <span style={{ ...s.flowArrowHead, color }}>&#9656;</span>
    </div>
  );
}

/* ── Main Page ── */
export default function FOMOSite() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileNav, setMobileNav] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 30,
      y: (e.clientY / window.innerHeight - 0.5) * 30,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  return (
    <div style={s.root}>
      {/* Grid BG */}
      <div style={s.gridBg} />

      {/* NAV */}
      <nav style={s.nav}>
        <a href="#" style={s.navLogo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          FOMO<span style={s.navLogoSub}>{"//"} PROTOCOL</span>
        </a>
        <button className="mobile-toggle" style={s.mobileToggle} onClick={() => setMobileNav(!mobileNav)}>&#9776;</button>
        <ul style={{ ...s.navLinks, ...(mobileNav ? s.navLinksMobile : {}) }}>
          {SECTIONS.map((sec) => (
            <li key={sec.id}>
              <a href={`#${sec.id}`} className="nav-link" style={s.navLink} onClick={(e) => { e.preventDefault(); scrollTo(sec.id); }}>
                {sec.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div
          style={{
            ...s.heroGlow,
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        />
        <div style={s.container}>
          <div style={s.heroContent}>
            <div style={{ ...s.heroTag, animation: "fadeSlideUp 0.8s 0.2s both" }}>
              <span style={{ width: 40, height: 1, background: "var(--accent)", display: "inline-block" }} />
              Decentralized Clearing Protocol
            </div>
            <h1
              style={{ ...s.heroH1, animation: "fadeSlideUp 0.8s 0.4s both" }}
            >
              COMPRESS
              <br />
              <span style={s.outline}>LIQUIDITY.</span>
              <br />
              NET EVERYTHING.
            </h1>
            <p style={{ ...s.heroSub, animation: "fadeSlideUp 0.8s 0.6s both" }}>
              A dual-chain architecture that nets bilateral obligations at scale. No asset custody. No oracles. Pure deterministic clearing.
            </p>
            <div style={{ ...s.heroStats, animation: "fadeSlideUp 0.8s 0.8s both" }}>
              {[
                { num: "21M", label: "Max FOMOG Supply" },
                { num: "0", label: "Assets Custodied" },
                { num: "\u221E", label: "Netting Capacity" },
              ].map((stat) => (
                <div key={stat.label} style={s.heroStat}>
                  <div style={s.statNumber}>{stat.num}</div>
                  <div style={s.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ARCHITECTURE */}
      <section id="architecture" style={s.section}>
        <div style={s.container}>
          <Reveal><SectionTag>01 // Architecture</SectionTag></Reveal>
          <Reveal delay={0.1}><h2 style={s.sectionTitle}>Dual Chain<br />Architecture</h2></Reveal>
          <Reveal delay={0.15}><p style={s.sectionDesc}>Two chains. Two purposes. Obligation state management separated from economic security. No compromise.</p></Reveal>
          <div style={s.dualGrid}>
            <Reveal delay={0.2}>
              <div style={{ ...s.chainCard, ...s.chainCardCer }} className="chain-card">
                <div style={{ ...s.cardIcon, borderColor: "var(--accent)", color: "var(--accent)" }}>CER</div>
                <h3 style={s.chainTitle}>FOMO CER Chain</h3>
                <p style={s.chainDesc}>Built on Cosmos SDK. Hosts obligation records and the deterministic netting epoch engine. No fungible tokens. No oracles. No custody.</p>
                <ul style={s.chainFeatures}>
                  {["Eligibility snapshots", "Deterministic batching", "Proposal submission", "Fraud-proof verification", "Lifecycle state transitions", "Conservation invariant enforcement", "CometBFT consensus"].map((f) => (
                    <li key={f} style={s.featureItem}><span style={{ color: "var(--accent)" }}>&#9656;</span> {f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ ...s.chainCard, ...s.chainCardFomog }} className="chain-card">
                <div style={{ ...s.cardIcon, borderColor: "var(--accent2)", color: "var(--accent2)" }}>FG</div>
                <h3 style={s.chainTitle}>FOMOG Chain</h3>
                <p style={s.chainDesc}>Fully separate blockchain. Fixed 21M supply. Economic security through staking. Governs protocol upgrades. Tradeable on exchanges.</p>
                <ul style={s.chainFeatures}>
                  {["Fungible governance token", "Staking & bonding", "Netting server incentives", "Relay server incentives", "Dispute arbitration", "Cross-shard coordination", "Quantum-resistant option"].map((f) => (
                    <li key={f} style={s.featureItem}><span style={{ color: "var(--accent2)" }}>&#9656;</span> {f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* TOKEN ROLES */}
      <section id="tokens" style={{ ...s.section, background: "var(--bg2)" }}>
        <div style={s.container}>
          <Reveal><SectionTag>02 // Token Roles</SectionTag></Reveal>
          <Reveal delay={0.1}><h2 style={s.sectionTitle}>Two Tokens.<br />Zero Confusion.</h2></Reveal>
          <Reveal delay={0.15}><p style={s.sectionDesc}>CER records who owes whom. FOMOG secures the system. They never cross purposes.</p></Reveal>
          <div style={s.dualGrid}>
            <Reveal delay={0.2}>
              <div style={s.tokenCardCer}>
                <div style={{ ...s.tokenLabel, color: "var(--accent)" }}>CER</div>
                <div style={s.tokenType}>Controllable Electronic Record</div>
                <div style={s.tokenProps}>
                  {[
                    ["\u2715", "Non-fungible"], ["\u2715", "Non-transferable"], ["\u2715", "Not a financial instrument"],
                    ["\u2715", "Cannot be traded"], ["\u2715", "Cannot be assigned"],
                    ["\u25C6", "Bilateral debtor-creditor obligation"], ["\u25C6", "Denominated in any agreed currency"], ["\u25C6", "Protocol-governed lifecycle"],
                  ].map(([icon, text]) => (
                    <div key={text} style={s.tokenProp}>
                      <span style={{ color: icon === "\u2715" ? "var(--accent3)" : "var(--accent)", width: 20, flexShrink: 0, fontSize: "0.7rem" }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={s.tokenCardFomog}>
                <div style={{ ...s.tokenLabel, color: "var(--accent2)" }}>FOMOG</div>
                <div style={s.tokenType}>Governance & Economic Security</div>
                <div style={s.tokenProps}>
                  {[
                    ["\u2713", "Fungible"], ["\u2713", "Scarce \u2014 21M max"], ["\u2713", "Earned, not pre-minted"], ["\u2713", "Tradeable on exchanges"],
                    ["\u25C6", "Required for netting servers"], ["\u25C6", "Bonding against incorrect netting"], ["\u25C6", "Governance voting"], ["\u25C6", "Cross-shard compression"],
                  ].map(([icon, text]) => (
                    <div key={text} style={s.tokenProp}>
                      <span style={{ color: "var(--accent)", width: 20, flexShrink: 0, fontSize: "0.7rem" }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* INVARIANTS */}
      <section id="invariants" style={s.section}>
        <div style={s.container}>
          <Reveal><SectionTag>03 // Protocol Law</SectionTag></Reveal>
          <Reveal delay={0.1}><h2 style={s.sectionTitle}>Invariants</h2></Reveal>
          <Reveal delay={0.15}><p style={s.sectionDesc}>Unbreakable rules enforced at the protocol level. No exceptions. No overrides.</p></Reveal>
          <Reveal delay={0.2}>
            <div style={s.invariantsGrid}>
              {INVARIANTS.map((inv) => (
                <div key={inv.num} style={s.invariant} className="invariant-cell">
                  <div style={s.invariantNum}>{inv.num}</div>
                  <h4 style={s.invariantTitle}>{inv.title}</h4>
                  <p style={s.invariantDesc}>{inv.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* LIFECYCLE */}
      <section id="lifecycle" style={{ ...s.section, background: "var(--bg2)" }}>
        <div style={s.container}>
          <Reveal><SectionTag>04 // Process</SectionTag></Reveal>
          <Reveal delay={0.1}><h2 style={s.sectionTitle}>CER Lifecycle</h2></Reveal>
          <Reveal delay={0.15}><p style={s.sectionDesc}>From creation to satisfaction. Every obligation follows the same deterministic path.</p></Reveal>
          <Reveal delay={0.2}>
            <div style={s.lifecycleFlow}>
              {CER_STEPS.map((step, i) => (
                <Fragment key={step}>
                  <FlowStep num={i + 1} label={step} />
                  {i < CER_STEPS.length - 1 && <FlowArrow />}
                </Fragment>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}><SectionTag>Netting Epoch Flow</SectionTag></Reveal>
          <Reveal delay={0.35}>
            <div style={{ ...s.lifecycleFlow, marginTop: "1.5rem" }}>
              {EPOCH_STEPS.map((step, i) => (
                <Fragment key={step}>
                  <FlowStep num={i + 1} label={step} accent="var(--accent2)" />
                  {i < EPOCH_STEPS.length - 1 && <FlowArrow color="var(--accent2)" />}
                </Fragment>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* TOKENOMICS */}
      <section id="tokenomics" style={s.section}>
        <div style={s.container}>
          <Reveal><SectionTag>05 // Economics</SectionTag></Reveal>
          <Reveal delay={0.1}><h2 style={s.sectionTitle}>FOMOG Tokenomics</h2></Reveal>
          <Reveal delay={0.15}><p style={s.sectionDesc}>Hard cap. Earned only. Demand from necessity, not speculation.</p></Reveal>
          <Reveal delay={0.2}>
            <div style={s.tokenomicsHero}>
              <div style={s.supplyVisual}>
                <div style={s.supplyCircle}>
                  <div style={s.supplyOuter} />
                  <div style={s.supplyNumber}>21M</div>
                  <div style={s.supplyUnit}>FOMOG</div>
                  <div style={s.supplySub}>FIXED CAP &bull; NO INFLATION</div>
                </div>
              </div>
              <div style={s.issuanceMethods}>
                {ISSUANCE.map((item, i) => (
                  <div key={i} style={s.issuanceItem} className="issuance-item">
                    <div style={s.issuanceNum}>{String(i + 1).padStart(2, "0")}</div>
                    <div style={s.issuanceText}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3} style={{ marginTop: "4rem" }}>
            <SectionTag>FOMOG vs Bitcoin</SectionTag>
            <div style={{ overflowX: "auto" }}>
              <table style={s.compareTable}>
                <thead>
                  <tr>
                    <th style={{ ...s.th, ...s.thFeature }}>Attribute</th>
                    <th style={{ ...s.th, color: "var(--accent)", borderBottomColor: "var(--accent)" }}>Bitcoin</th>
                    <th style={{ ...s.th, color: "var(--accent2)", borderBottomColor: "var(--accent2)" }}>FOMOG</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.attr} className="compare-row">
                      <td style={{ ...s.td, ...s.tdFeature }}>{row.attr}</td>
                      <td style={s.td}>{row.btc}</td>
                      <td style={s.td}>{row.fomog}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* GOVERNANCE */}
      <section id="governance" style={{ ...s.section, background: "var(--bg2)" }}>
        <div style={s.container}>
          <Reveal><SectionTag>06 // Control</SectionTag></Reveal>
          <Reveal delay={0.1}><h2 style={s.sectionTitle}>Governance</h2></Reveal>
          <Reveal delay={0.15}><p style={s.sectionDesc}>FOMOG holders govern the protocol. No government authority. No central shutdown switch.</p></Reveal>
          <div style={s.govGrid}>
            {GOV_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={0.2 + i * 0.05}>
                <div style={s.govCard} className="gov-card">
                  <div style={s.govIcon}>{card.icon}</div>
                  <h4 style={s.govTitle}>{card.title}</h4>
                  <p style={s.govDesc}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section style={s.ctaSection}>
        <div style={s.ctaGlow} />
        <div style={{ ...s.container, position: "relative", zIndex: 2, textAlign: "center" }}>
          <Reveal>
            <h2 style={s.ctaTitle}>SETTLE LESS.<br />NET MORE.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={s.ctaSub}>Liquidity compression through deterministic obligation netting. Economically superior to existing settlement rails at global scale.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={s.ctaButtons}>
              <a href="#" style={s.btnPrimary}>Read Whitepaper &rarr;</a>
              <a href="#" style={s.btnOutline}>Join Community</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={{ ...s.container, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={s.footerLogo}>FOMO</div>
          <div style={s.footerText}>Decentralized Clearing Protocol &mdash; No custody. No oracles. Net everything.</div>
        </div>
      </footer>
    </div>
  );
}

/* ── Styles ── */
const mono = "var(--font-mono), 'JetBrains Mono', monospace";
const display = "var(--font-display), 'Bebas Neue', sans-serif";
const body = "var(--font-body), 'Chakra Petch', sans-serif";

const s = {
  root: {
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: body,
    overflowX: "hidden",
    lineHeight: 1.6,
    minHeight: "100vh",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    zIndex: -1,
    backgroundImage: "linear-gradient(rgba(0,255,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.03) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    animation: "gridShift 20s linear infinite",
  },
  container: { maxWidth: 1280, margin: "0 auto", padding: "0 2rem" },

  // Nav
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(6,8,12,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)",
  },
  navLogo: {
    fontFamily: display, fontSize: "2rem", letterSpacing: "0.15em", color: "var(--accent)",
    textDecoration: "none", position: "relative", cursor: "pointer",
  },
  navLogoSub: {
    fontFamily: mono, fontSize: "0.5rem", color: "var(--text-dim)",
    position: "absolute", bottom: -2, right: -65, letterSpacing: "0.2em",
  },
  navLinks: {
    display: "flex", gap: "2.5rem", listStyle: "none",
  },
  navLinksMobile: {
    position: "absolute", top: "100%", left: 0, right: 0,
    flexDirection: "column", gap: "0.5rem", padding: "1rem 2rem",
    background: "rgba(6,8,12,0.95)", borderBottom: "1px solid var(--border)",
  },
  navLink: {
    textDecoration: "none", fontFamily: mono,
    fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
  },
  mobileToggle: {
    display: "none", background: "none", border: "1px solid var(--border)",
    color: "var(--accent)", fontSize: "1.2rem", padding: "0.4rem 0.6rem",
    cursor: "pointer", fontFamily: mono,
  },

  // Hero
  hero: { minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "5rem" },
  heroGlow: {
    position: "absolute", top: "20%", right: "-10%", width: 700, height: 700,
    background: "radial-gradient(circle, rgba(0,255,170,0.08) 0%, transparent 70%)",
    zIndex: 1, animation: "pulse 4s ease-in-out infinite", transition: "transform 0.1s ease-out",
  },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 900 },
  heroTag: {
    fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)",
    textTransform: "uppercase", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem",
  },
  heroH1: {
    fontFamily: display, fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 0.9,
    color: "var(--white)", letterSpacing: "0.02em", marginBottom: "1.5rem", cursor: "default",
  },
  outline: { WebkitTextStroke: "2px var(--accent)", color: "transparent" },
  glitchLayer: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" },
  heroSub: { fontSize: "1.15rem", color: "var(--text)", maxWidth: 600, marginBottom: "2.5rem" },
  heroStats: { display: "flex", gap: "3rem", flexWrap: "wrap" },
  heroStat: { borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" },
  statNumber: { fontFamily: display, fontSize: "2.5rem", color: "var(--white)", lineHeight: 1 },
  statLabel: { fontFamily: mono, fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" },

  // Divider
  divider: {
    width: "100%", height: 1,
    background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
    position: "relative", overflow: "hidden",
  },
  dividerGlow: {
    position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%",
    background: "linear-gradient(90deg, transparent, var(--accent2), transparent)",
    animation: "dividerSlide 3s linear infinite",
  },

  // Sections
  section: { padding: "8rem 0", position: "relative" },
  sectionTag: {
    fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--accent)",
    textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem",
  },
  tagLine: { width: 30, height: 1, background: "var(--accent)", display: "inline-block" },
  sectionTitle: {
    fontFamily: display, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--white)",
    letterSpacing: "0.02em", marginBottom: "1rem", lineHeight: 1,
  },
  sectionDesc: { color: "var(--text-dim)", maxWidth: 600, marginBottom: "4rem", fontSize: "1rem" },

  // Dual Grid
  dualGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" },

  // Chain Cards
  chainCard: {
    background: "var(--surface)", border: "1px solid var(--border)", padding: "2.5rem",
    position: "relative", overflow: "hidden", transition: "border-color 0.4s, transform 0.3s",
  },
  chainCardCer: { borderTop: "3px solid var(--accent)" },
  chainCardFomog: { borderTop: "3px solid var(--accent2)" },
  cardIcon: {
    width: 48, height: 48, border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: display, fontSize: "1.2rem", marginBottom: "1.5rem",
  },
  chainTitle: { fontFamily: display, fontSize: "1.8rem", color: "var(--white)", letterSpacing: "0.05em", marginBottom: "0.75rem" },
  chainDesc: { color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: "1.5rem" },
  chainFeatures: { listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" },
  featureItem: { fontFamily: mono, fontSize: "0.72rem", color: "var(--text)", display: "flex", gap: "0.5rem" },

  // Token Cards
  tokenCardCer: {
    padding: "3rem", background: "linear-gradient(135deg, rgba(0,255,170,0.05), transparent)",
    border: "1px solid rgba(0,255,170,0.15)",
  },
  tokenCardFomog: {
    padding: "3rem", background: "linear-gradient(135deg, rgba(0,204,255,0.05), transparent)",
    border: "1px solid rgba(0,204,255,0.15)",
  },
  tokenLabel: { fontFamily: display, fontSize: "4rem", lineHeight: 1, marginBottom: "0.25rem" },
  tokenType: {
    fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
    color: "var(--text-dim)", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)",
  },
  tokenProps: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  tokenProp: { display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem" },

  // Invariants
  invariantsGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
    background: "var(--border)", border: "1px solid var(--border)",
  },
  invariant: { background: "var(--bg)", padding: "2rem", transition: "background 0.3s" },
  invariantNum: { fontFamily: display, fontSize: "2.5rem", color: "rgba(0,255,170,0.15)", lineHeight: 1, marginBottom: "0.75rem" },
  invariantTitle: {
    fontFamily: body, fontWeight: 700, fontSize: "0.85rem", color: "var(--white)",
    textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem",
  },
  invariantDesc: { fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.5 },

  // Lifecycle
  lifecycleFlow: { display: "flex", alignItems: "center", overflowX: "auto", padding: "2rem 0" },
  flowStep: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: 140, flexShrink: 0 },
  flowNode: {
    width: 56, height: 56, border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: display, fontSize: "1.2rem", marginBottom: "0.75rem",
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
    background: "var(--bg2)",
  },
  flowLabel: { fontFamily: mono, fontSize: "0.65rem", color: "var(--text)", maxWidth: 100, textTransform: "uppercase", letterSpacing: "0.05em" },
  flowArrow: { width: 40, height: 2, flexShrink: 0, position: "relative", marginTop: "-1.5rem" },
  flowArrowHead: { position: "absolute", right: -4, top: -8, fontSize: "0.7rem" },

  // Tokenomics
  tokenomicsHero: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" },
  supplyVisual: { position: "relative", height: 300, display: "flex", alignItems: "center", justifyContent: "center" },
  supplyCircle: {
    width: 260, height: 260, border: "3px solid var(--accent2)", borderRadius: "50%",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    position: "relative",
  },
  supplyOuter: {
    position: "absolute", inset: -15, border: "1px dashed rgba(0,204,255,0.2)", borderRadius: "50%",
  },
  supplyNumber: { fontFamily: display, fontSize: "3.5rem", color: "var(--white)", lineHeight: 1 },
  supplyUnit: { fontFamily: mono, fontSize: "0.7rem", color: "var(--accent2)", letterSpacing: "0.2em", textTransform: "uppercase" },
  supplySub: { fontFamily: mono, fontSize: "0.6rem", color: "var(--text-dim)", marginTop: "0.5rem" },
  issuanceMethods: { display: "flex", flexDirection: "column", gap: "1.25rem" },
  issuanceItem: {
    display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem 1.25rem",
    background: "var(--surface)", borderLeft: "2px solid var(--accent)", transition: "border-color 0.3s, background 0.3s",
  },
  issuanceNum: { fontFamily: display, fontSize: "1.5rem", color: "var(--accent)", lineHeight: 1, flexShrink: 0, width: 24 },
  issuanceText: { fontSize: "0.85rem", color: "var(--text)" },

  // Compare Table
  compareTable: { width: "100%", borderCollapse: "collapse", marginTop: "2rem" },
  th: {
    fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
    textAlign: "left", padding: "1rem 1.5rem", borderBottom: "2px solid var(--accent)",
  },
  thFeature: { color: "var(--text-dim)" },
  td: { padding: "1rem 1.5rem", borderBottom: "1px solid var(--border)", fontSize: "0.85rem", verticalAlign: "top", transition: "background 0.3s" },
  tdFeature: { fontFamily: mono, fontSize: "0.75rem", color: "var(--text-dim)", width: "25%" },

  // Governance
  govGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" },
  govCard: {
    background: "var(--bg)", border: "1px solid var(--border)", padding: "2rem",
    transition: "border-color 0.3s, transform 0.3s",
  },
  govIcon: { fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent2)" },
  govTitle: { fontFamily: body, fontWeight: 700, color: "var(--white)", fontSize: "0.95rem", marginBottom: "0.5rem" },
  govDesc: { fontSize: "0.8rem", color: "var(--text-dim)" },

  // CTA
  ctaSection: { padding: "10rem 0", textAlign: "center", position: "relative", overflow: "hidden" },
  ctaGlow: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse at center, rgba(0,255,170,0.06), transparent 70%)",
  },
  ctaTitle: { fontFamily: display, fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--white)", lineHeight: 0.95, marginBottom: "1.5rem" },
  ctaSub: { fontSize: "1rem", color: "var(--text-dim)", maxWidth: 500, margin: "0 auto 3rem" },
  ctaButtons: { display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: {
    fontFamily: mono, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase",
    padding: "1rem 2.5rem", background: "var(--accent)", color: "var(--bg)", fontWeight: 700,
    border: "none", cursor: "pointer", transition: "all 0.3s", textDecoration: "none",
    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
  },
  btnOutline: {
    fontFamily: mono, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase",
    padding: "1rem 2.5rem", background: "transparent", color: "var(--text)",
    border: "1px solid var(--border)", cursor: "pointer", transition: "all 0.3s", textDecoration: "none",
  },

  // Footer
  footer: { padding: "3rem 0", borderTop: "1px solid var(--border)" },
  footerLogo: { fontFamily: display, fontSize: "1.5rem", color: "var(--accent)", letterSpacing: "0.1em" },
  footerText: { fontFamily: mono, fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.1em" },
};
