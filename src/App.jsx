import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WebGLBackground from "./WebGLBackground";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Media ───
const PHOTOS = [
  "/media/photo1.png",
  "/media/photo2.png",
  "/media/photo3.png",
  "/media/photo4.png",
  "/media/photo5.png",
  "/media/photo6.png",
  "/media/photo7.png",
  "/media/photo8.png",
];
const VIDEOS = [
  "/media/video1.mp4",
  "/media/video2.mp4",
  "/media/video3.mp4",
];

const SCENES = [
  { id: "hero", label: "The Beginning" },
  { id: "firstsight", label: "First Sight" },
  { id: "office", label: "Office Days" },
  { id: "checkin", label: "Morning Ritual" },
  { id: "unspoken", label: "Unspoken" },
  { id: "birthday", label: "Birthday" },
  { id: "skyblue", label: "Sky Blue" },
  { id: "goodbye", label: "Goodbye" },
];

// ─── Floating particles ───
function Particles({ count = 16 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    key: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${3 + Math.random() * 9}px`,
    height: `${3 + Math.random() * 9}px`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${6 + Math.random() * 8}s`,
    opacity: Math.random() * 0.4 + 0.07,
  }));
  return (
    <>
      {items.map(p => (
        <div key={p.key} className="particle" style={{
          left: p.left, top: p.top,
          width: p.width, height: p.height,
          animationDelay: p.animationDelay,
          animationDuration: p.animationDuration,
          opacity: p.opacity,
        }} />
      ))}
    </>
  );
}

// ─── Bokeh ───
function Bokeh() {
  return (
    <>
      <div className="bokeh" style={{ width: 320, height: 320, left: "8%", top: "18%", background: "rgba(100,60,180,.055)", animationDelay: "0s", animationDuration: "14s" }} />
      <div className="bokeh" style={{ width: 220, height: 220, left: "72%", top: "52%", background: "rgba(180,80,120,.04)", animationDelay: "4s", animationDuration: "11s" }} />
      <div className="bokeh" style={{ width: 260, height: 260, left: "48%", top: "8%", background: "rgba(60,100,200,.035)", animationDelay: "2s", animationDuration: "16s" }} />
    </>
  );
}

// ─── Portrait photo — full height, no crop ───
function PortraitPhoto({ src, style = {}, caption = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 86%" }
      }
    );
  }, []);
  return (
    <div ref={ref} className="portrait-wrap" style={style}>
      <div className="portrait-frame">
        <img src={src} alt="memory" className="portrait-img" />
        <div className="portrait-overlay" />
      </div>
      {caption && <p className="portrait-caption">{caption}</p>}
    </div>
  );
}

// ─── Portrait video — full height, no crop ───
function PortraitVideo({ src, style = {}, caption = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 86%" }
      }
    );
  }, []);
  return (
    <div ref={ref} className="portrait-wrap" style={style}>
      <div className="portrait-frame">
        <video src={src} autoPlay muted loop playsInline className="portrait-img" />
        <div className="portrait-overlay" />
      </div>
      {caption && <p className="portrait-caption">{caption}</p>}
    </div>
  );
}

// ─── Two portrait photos side by side ───
function PortraitPair({ src1, src2 }) {
  return (
    <div className="portrait-pair">
      <PortraitPhoto src={src1} />
      <PortraitPhoto src={src2} />
    </div>
  );
}

// ─── Three portrait photos in a row ───
function PortraitTriple({ sources }) {
  return (
    <div className="portrait-triple">
      {sources.map((src, i) => <PortraitPhoto key={i} src={src} />)}
    </div>
  );
}

// ─── Chat bubble ───
function Bubble({ text, sent = false, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20, x: sent ? 20 : -20 },
      {
        opacity: 1, y: 0, x: 0, duration: 0.85, delay,
        scrollTrigger: { trigger: ref.current, start: "top 88%" }
      }
    );
  }, [delay, sent]);
  return (
    <div ref={ref} style={{ display: "flex", justifyContent: sent ? "flex-end" : "flex-start", marginBottom: 14, opacity: 0 }}>
      <div className={`bubble ${sent ? "bubble-sent" : "bubble-recv"}`}>
        {text}
        {!sent && <div className="bubble-tag">never sent</div>}
      </div>
    </div>
  );
}

// ─── Eye contact art ───
function EyeArt() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current.children,
      { opacity: 0, scale: 0.6 },
      {
        opacity: 1, scale: 1, stagger: 0.35, duration: 1.1,
        scrollTrigger: { trigger: ref.current, start: "top 82%" }
      }
    );
  }, []);
  return (
    <div ref={ref} className="eye-wrap">
      {[{ color: "#8b6fd4", label: "him" }, { color: "#e8a0bf", label: "her" }].map(({ color, label }) => (
        <div key={label} style={{ textAlign: "center", opacity: 0 }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
            <div style={{ width: 30, height: 15, borderRadius: "50%", border: `1.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: color, animation: "pulse 2.4s ease-in-out infinite" }} />
            </div>
          </div>
          <p style={{ color: `${color}77`, fontSize: 11, fontStyle: "italic", fontFamily: "Cormorant Garamond,serif" }}>{label}</p>
        </div>
      ))}
      <div style={{ position: "absolute", height: 1, width: 90, background: "linear-gradient(to right,#8b6fd455,#e8a0bf55)" }} />
    </div>
  );
}

// ─── Generic scroll-reveal block ───
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const x = direction === "left" ? -50 : direction === "right" ? 50 : 0;
    const y = direction === "up" ? 50 : direction === "down" ? -50 : 0;
    gsap.fromTo(ref.current,
      { opacity: 0, x, y },
      {
        opacity: 1, x: 0, y: 0, duration: 1.1, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" }
      }
    );
  }, [delay, direction]);
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>;
}

// ─── Section heading ───
function Heading({ chapter, title, sub }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%" }
      }
    );
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, marginBottom: sub ? 0 : 40 }}>
      {chapter && <p className="caption" style={{ marginBottom: 14 }}>{chapter}</p>}
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p className="body-text" style={{ marginBottom: 44 }}>{sub}</p>}
    </div>
  );
}

// ─── Cinematic Entry Gate + Music Player ───
// The splash screen click = user gesture → unlocks audio in ALL browsers.
function MusicPlayer({ onEnter }) {
  const audioRef   = useRef(null);
  const splashRef  = useRef(null);
  const [entered,  setEntered]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  const handleEnter = () => {
    const audio = audioRef.current;
    // This click IS the user gesture — play is guaranteed here
    audio.volume = 0;
    audio.loop   = true;
    audio.play().then(() => {
      // Fade volume in over 5 s
      gsap.to(audio, { volume: 0.18, duration: 5, ease: "power2.inOut" });
      // Show mute button after 2 s
      setTimeout(() => setBtnVisible(true), 2000);
    }).catch(err => console.warn("Audio play failed:", err));

    // Animate splash out
    gsap.to(splashRef.current, {
      opacity: 0,
      duration: 1.4,
      ease: "power3.inOut",
      onComplete: () => {
        setEntered(true);
        if (onEnter) onEnter();
      },
    });
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (muted) {
      gsap.to(audio, { volume: 0.18, duration: 1.5, ease: "power2.inOut" });
      setMuted(false);
    } else {
      gsap.to(audio, { volume: 0, duration: 1.5, ease: "power2.inOut" });
      setMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/media/music.mp3" preload="auto" />

      {/* ── Cinematic Splash / Entry Gate ── */}
      {!entered && (
        <div ref={splashRef} className="splash-overlay">
          {/* Animated background particles */}
          <div className="splash-bg" />

          {/* Bokeh blobs */}
          <div className="splash-blob" style={{ width:380, height:380, left:"12%", top:"18%", background:"rgba(100,55,180,.12)", animationDuration:"15s" }} />
          <div className="splash-blob" style={{ width:260, height:260, left:"68%", top:"55%", background:"rgba(180,80,130,.09)", animationDuration:"11s", animationDelay:"3s" }} />
          <div className="splash-blob" style={{ width:300, height:300, left:"42%", top:"5%",  background:"rgba(60,100,200,.07)", animationDuration:"18s", animationDelay:"1s" }} />

          <div className="splash-content">
            {/* Name */}
            <p className="splash-eyebrow">a memory for</p>
            <h1 className="splash-name">Amisha</h1>
            <div className="splash-divider" />
            <p className="splash-sub">some things are said in silence.</p>

            {/* Enter button */}
            <button className="splash-enter-btn" onClick={handleEnter}>
              <span className="splash-enter-ring" />
              <span className="splash-enter-inner">
                {/* Play triangle */}
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:18, height:18, marginLeft:3 }}>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </span>
              <span className="splash-enter-label">enter with sound</span>
            </button>

            <p className="splash-hint">🎵 For A Reason — Karan Aujla</p>
          </div>

          {/* Corner film grain */}
          <div className="film-grain" style={{ opacity:.06 }} />
          <div className="vignette" />
        </div>
      )}

      {/* ── Mute / Unmute control ── */}
      <button
        onClick={toggle}
        className={`music-btn ${btnVisible && entered ? "music-btn--visible" : ""} ${muted ? "music-btn--muted" : ""}`}
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        <span className="music-icon">
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </span>
        <span className="music-label">{muted ? "unmute" : "playing"}</span>
        {!muted && (
          <span className="music-bars" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
        )}
      </button>
    </>
  );
}

// ════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════
export default function App() {
  const [activeScene, setActiveScene] = useState(0);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      gsap.to(cursorDotRef.current, { x: e.clientX, y: e.clientY, duration: 0.08 });
      gsap.to(cursorRingRef.current, { x: e.clientX, y: e.clientY, duration: 0.26 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Active scene
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          const i = SCENES.findIndex(s => s.id === e.target.id);
          if (i !== -1) setActiveScene(i);
        }
      }),
      { threshold: 0.25 }
    );
    SCENES.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Hero intro
  useEffect(() => {
    gsap.timeline({ delay: 0.4 })
      .fromTo(".hero-photo-wrap", { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "power3.out" })
      .fromTo(".hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" }, "-=1.1")
      .fromTo(".hero-sub", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.7")
      .fromTo(".tag", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 }, "-=0.6")
      .fromTo(".scroll-cue", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.3");
  }, []);

  return (
    <>
      {/* Cursors */}
      <div ref={cursorDotRef} style={{ position: "fixed", zIndex: 9999, pointerEvents: "none", width: 8, height: 8, borderRadius: "50%", background: "rgba(220,180,255,.9)", transform: "translate(-50%,-50%)" }} />
      <div ref={cursorRingRef} style={{ position: "fixed", zIndex: 9998, pointerEvents: "none", width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(180,140,220,.4)", transform: "translate(-50%,-50%)" }} />

      <WebGLBackground />
      <div className="film-grain" />
      <div className="vignette" />
      <MusicPlayer />

      {/* Side nav */}
      <nav className="side-nav">
        {SCENES.map((s, i) => (
          <div key={s.id} className={`nav-dot ${activeScene === i ? "active" : ""}`}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            title={s.label} />
        ))}
      </nav>

      {/* ══ 1. HERO ══ */}
      <section id="hero" className="scene" style={{ textAlign: "center", minHeight: "100vh", alignItems: "center" }}>
        <div className="hero-bg-glow" />
        <Particles count={26} />
        <Bokeh />

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Portrait ring — shows full body */}
          <div className="hero-photo-wrap" style={{ opacity: 0 }}>
            <div className="hero-photo-ring">
              <img src={PHOTOS[0]} alt="Amisha" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
            </div>
            <div className="hero-orbit">
              <div className="hero-orbit-dot" />
              <div className="hero-orbit-dot" style={{ animationDuration: "20s", animationDelay: "-6s", background: "rgba(232,160,191,.35)" }} />
            </div>
          </div>

          <p className="caption" style={{ marginBottom: 14 }}>a digital memory</p>
          <h1 className="hero-title glow-text" style={{ opacity: 0 }}>Amisha</h1>
          <p className="hero-sub" style={{ opacity: 0 }}>some people leave before you ever find the words.</p>

          <div className="tag-row">
            {["silent love", "missed timing", "unspoken words", "distant admiration"].map((t, i) => (
              <span key={t} className="tag" style={{ animationDelay: `${0.2 + i * 0.13}s` }}>{t}</span>
            ))}
          </div>

          <div className="scroll-cue" style={{ opacity: 0 }}>
            <div className="scroll-line" />
            <p className="caption" style={{ marginTop: 8 }}>scroll to remember</p>
          </div>
        </div>
      </section>

      {/* ══ 2. FIRST SIGHT ══ */}
      <section id="firstsight" className="scene">
        <Particles count={10} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Heading
            chapter="chapter one"
            title='The First <span class="glow-text">Glance</span>'
            sub="The first time I saw you inside those office walls, something shifted — quietly, like morning light entering a room before anyone notices."
          />

          {/* Large single portrait + text beside it */}
          <div className="portrait-text-row" style={{ marginTop: 20 }}>
            <Reveal direction="left">
              <PortraitPhoto src={PHOTOS[1]} />
            </Reveal>
            <Reveal direction="right" delay={0.2} style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
              <p className="body-text">Not just your face. Your entire <em>presence</em> — the way you moved through a corridor as if the world was slightly quieter around you.</p>
              <p className="body-text muted">Those moments in corridors, hallway crossings — where our eyes would meet and neither of us would say a single word. A whole conversation happening in silence.</p>
              <EyeArt />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 3. OFFICE DAYS ══ */}
      <section id="office" className="scene">
        <Particles count={10} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Heading
            chapter="chapter two"
            title='When She Was <span class="glow-text">There</span>'
            sub="Office felt different when you were around. Lighter. Like the air had a different quality to it."
          />

          {/* Memory cards */}
          <div className="memory-grid" style={{ marginBottom: 52 }}>
            {[
              { e: "☕", t: "Morning coffee breaks where I'd glance over without you knowing." },
              { e: "💼", t: "Watching you navigate sales pressure — wishing I could make it easier." },
              { e: "👀", t: "Corridor eye contact. Three seconds. An entire story." },
              { e: "📊", t: "Those A+ leads I routed your way — genuinely hoping your numbers would shine." },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="memory-card">
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{m.e}</div>
                  <p className="body-text muted" style={{ fontSize: 14, fontStyle: "italic" }}>{m.t}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Portrait pair — two full photos */}
          <Reveal>
            <PortraitPair src1={PHOTOS[2]} src2={PHOTOS[3]} />
            <p className="body-text muted" style={{ textAlign: "center", fontSize: 13, fontStyle: "italic", marginTop: 18 }}>this desk has been quieter ever since.</p>
          </Reveal>
        </div>
      </section>

      {/* ══ 4. MORNING CHECK-IN ══ */}
      <section id="checkin" className="scene">
        <Particles count={10} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Heading
            chapter="chapter three"
            title='Every <span class="glow-text">Morning</span>'
            sub="After you left, every single morning became a strange ritual of absence — eyes scanning the floor, searching for someone no longer there."
          />

          <div className="portrait-text-row">
            <Reveal direction="left">
              <PortraitVideo src={VIDEOS[1]} caption="that reel i saw of you — the warmth was undeniable." />
            </Reveal>
            <Reveal direction="right" delay={0.2} style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
              <p className="body-text">It's a strange kind of longing — not for something you had, but for something that always felt <em>possible</em>. The potential of a friendship that kept getting postponed.</p>
              <div className="glass-card" style={{ padding: "18px 22px" }}>
                <p className="body-text muted" style={{ fontSize: 15, fontStyle: "italic" }}>"Just seeing her around used to make the office feel lighter."</p>
              </div>
              <Reveal delay={0.3}>
                <PortraitPhoto src={PHOTOS[4]} />
              </Reveal>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 5. UNSPOKEN ══ */}
      <section id="unspoken" className="scene">
        <Particles count={8} />
        <div className="container" style={{ maxWidth: 640, position: "relative", zIndex: 2 }}>
          <Heading
            chapter="chapter four"
            title='Words That <span class="glow-text">Never Sent</span>'
            sub="There were so many things I wanted to say. Typed out, deleted. Thought about, never voiced."
          />

          <div style={{ maxWidth: 460, margin: "0 auto 44px" }}>
            <Bubble text="Hey — wanted to say your presentation today was genuinely great." delay={0.1} />
            <Bubble text="Can I grab coffee sometime? No agenda. Just wanted to talk." delay={0.28} />
            <Bubble text="I think you'd be incredible in a creative role. Your personality is made for design." delay={0.46} />
            <Bubble text="Hope today was easier than yesterday." delay={0.64} />
            <Bubble text="I noticed. I always noticed. I just never found the right moment." delay={0.82} sent />
          </div>

          {/* Full portrait centered */}
          <Reveal style={{ display: "flex", justifyContent: "center" }}>
            <PortraitPhoto src={PHOTOS[5]} style={{ maxWidth: 300 }} />
          </Reveal>

          <Reveal style={{ textAlign: "center", marginTop: 36 }}>
            <p className="body-text muted" style={{ fontSize: 14 }}>The hardest part isn't rejection. It's the things that never got a chance.</p>
          </Reveal>
        </div>
      </section>

      {/* ══ 6. BIRTHDAY ══ */}
      <section id="birthday" className="scene">
        <Particles count={12} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Heading
            chapter="chapter five"
            title='Your <span class="glow-text">Birthday</span>'
            sub="I knew your birthday was coming. I rehearsed a proper message for weeks. Then the day arrived, and fear won again."
          />

          <div className="portrait-text-row">
            <Reveal direction="left" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
              <p className="body-text">A Snapchat wish. Quiet. Cautious. Hoping it would be enough to say <em>I remembered you</em> without saying <em>I think about you often.</em></p>
              <p className="body-text muted" style={{ fontSize: 14, fontStyle: "italic" }}>Maybe you never saw it. That blue tick that never turned to a reply.</p>

              {/* Snapchat card */}
              <div className="snapchat-card" style={{ alignSelf: "flex-start" }}>
                <div style={{ fontSize: 38, marginBottom: 10 }}>👻</div>
                <div className="snap-title">Happy Birthday, Amisha 🎂</div>
                <div className="snap-sub">Sent. Maybe never seen.</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "14px 0 6px" }}>
                  {[.5, .25, .12].map((o, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: `rgba(255,220,0,${o})` }} />)}
                </div>
                <div className="snap-delivery">delivered • no reply</div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <PortraitPhoto src={PHOTOS[6]} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 7. SKY BLUE ══ */}
      <section id="skyblue" className="scene">
        <Particles count={10} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Heading chapter="chapter six" title='That <span style="color:rgba(100,180,255,.85)">Sky-Blue</span> Shirt' />

          {/* Video + photo side by side */}
          <div className="portrait-pair" style={{ marginTop: 12, marginBottom: 44 }}>
            <Reveal direction="left">
              <PortraitVideo src={VIDEOS[0]} caption="the reel I kept rewatching." />
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <PortraitPhoto src={PHOTOS[7]} />
            </Reveal>
          </div>

          <Reveal style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
            <p className="body-text">Every outfit suited you beautifully — and I noticed them all. But there was one that stayed in memory long after everything else faded.</p>
            <p className="body-text" style={{ color: "rgba(100,180,255,.58)", fontStyle: "italic", marginTop: 16 }}>That sky-blue shirt. The way it caught the office light. The way it made everything around you feel softer.</p>
            <div className="glass-card" style={{ padding: "16px 22px", marginTop: 24, borderColor: "rgba(100,180,255,.1)" }}>
              <p className="body-text muted" style={{ fontSize: 14, fontStyle: "italic", color: "rgba(140,190,255,.45)" }}>"Some details are so ordinary and yet become the things you remember most clearly."</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 8. GOODBYE ══ */}
      <section id="goodbye" className="scene" style={{ textAlign: "center" }}>
        <div className="goodbye-bg" />
        <Particles count={26} />
        <Bokeh />

        <div className="container" style={{ maxWidth: 700, position: "relative", zIndex: 2 }}>
          <Reveal><p className="caption" style={{ marginBottom: 28 }}>the end, and not the end</p></Reveal>
          <Reveal delay={0.15}>
            <h2 className="section-title" style={{ fontSize: "clamp(30px,7vw,58px)", marginBottom: 36 }}>
              <span className="glow-text">Goodbye,</span><br />
              <span style={{ color: "rgba(220,210,240,.6)" }}>Amisha</span>
            </h2>
          </Reveal>
          <Reveal delay={0.22}><div className="divider" /></Reveal>
          <Reveal delay={0.3}>
            <p className="body-text" style={{ marginBottom: 36 }}>Maybe we were never meant to become close. Maybe the timing was always going to be wrong. Maybe the courage was always going to arrive one moment too late.</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="glass-card" style={{ padding: "28px 34px", marginBottom: 52, textAlign: "left" }}>
              <p className="body-text muted" style={{ fontSize: "clamp(15px,2.5vw,18px)", lineHeight: 2, fontStyle: "italic" }}>
                "But some people leave memories so quietly and so deeply that even after they leave a place — their absence becomes visible everywhere. In a morning check-in. In an empty desk. In the way an office corridor doesn't feel the same."
              </p>
            </div>
          </Reveal>

          {/* Full portrait triple */}
          <Reveal delay={0.5}>
            <PortraitTriple sources={[PHOTOS[0], PHOTOS[2], PHOTOS[6]]} />
          </Reveal>

          <Reveal delay={0.65}>
            <p className="body-text muted" style={{ margin: "44px auto 20px", maxWidth: 520 }}>I genuinely hope you find work that fits your creative soul — design, art, something that lets that part of you breathe.</p>
          </Reveal>
          <Reveal delay={0.8}>
            <p className="final-line">"So yeah… bye Amisha."</p>
            <p className="final-sub">Hopefully someday, somewhere, we meet again.</p>
          </Reveal>
          <Reveal delay={1.0} style={{ marginTop: 56 }}>
            <div className="farewell-emojis">
              {["💜"].map((e, i) => <span key={i} style={{ animationDelay: `${i * .5}s` }}>{e}</span>)}
            </div>
            <p className="caption" style={{ marginTop: 44, color: "rgba(180,140,200,.18)" }}>made with quiet feelings • 2025</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
