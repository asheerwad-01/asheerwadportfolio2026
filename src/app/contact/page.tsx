"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import GhostMascot from "@/components/ui/GhostMascot";
import StickyNote from "@/components/ui/StickyNote";

gsap.registerPlugin(ScrollTrigger);

function SocialIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><path d="M17.5 6.5h.01" />
      </svg>
    ),
    behance: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 11c1.4 0 2.5-.6 2.5-2.2 0-1.5-1-2.3-2.4-2.3H3v9h4.8c1.5 0 2.7-.9 2.7-2.5 0-1.4-1-2-2.5-2zm-2.8-3h2c.7 0 1.3.3 1.3 1.1 0 .7-.5 1.1-1.2 1.1h-2.1V8zm2.2 6.5H4.7v-2.4h2.3c.8 0 1.4.4 1.4 1.2 0 .8-.6 1.2-1.5 1.2zM15 7.5c-3 0-4.5 2-4.5 4.5s1.6 4.5 4.5 4.5c2.2 0 3.5-1 4.1-3h-2c-.3.7-1 1.1-2 1.1-1.4 0-2.3-.8-2.4-2.2h6.5c.1-2.7-1.2-4.9-4.2-4.9zm-2.3 3.6c.2-1.2 1-1.9 2.2-1.9 1.3 0 1.9.8 2 1.9h-4.2zM14 5h5v1.5h-5z"/>
      </svg>
    ),
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
    discord: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561 19.9312 19.9312 0 005.9932 3.0336.0764.0764 0 00.0827-.0272c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057 13.1073 13.1073 0 01-1.872-.8923.0766.0766 0 01-.0077-.127 10.2332 10.2332 0 00.3722-.2917.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095 10.2 10.2 0 00.3732.2927.0765.0765 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0282 19.9002 19.9002 0 006.0015-3.0327.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1569 2.4189z"/>
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  };
  return icons[icon] || null;
}

export default function ContactPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Heading animation
  useEffect(() => {
    if (!headingRef.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const chars = headingRef.current.querySelectorAll(".contact-char");

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: 2D character stagger, smooth and lively, replays always
        gsap.fromTo(
          chars,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      } else {
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.04,
            duration: 0.7,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  // Info & form animations
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll(".info-item");
        gsap.fromTo(
          items,
          { y: isMobile ? 25 : 0, x: isMobile ? 0 : -40, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            stagger: isMobile ? 0.05 : 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: isMobile ? "top 90%" : "top 85%",
              end: isMobile ? "bottom 10%" : "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: isMobile ? 30 : 0, x: isMobile ? 0 : 40, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: isMobile ? 0.6 : 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: isMobile ? "top 90%" : "top 85%",
              end: isMobile ? "bottom 10%" : "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  // Map animation
  useEffect(() => {
    if (!mapRef.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapRef.current,
        { y: isMobile ? 30 : 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.6 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: isMobile ? "top 92%" : "top 90%",
            end: isMobile ? "bottom 8%" : "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // EmailJS integration - using mailto as fallback
    try {
      const mailtoLink = `mailto:${SITE.email}?subject=${encodeURIComponent(
        formData.subject || "Portfolio Contact"
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.open(mailtoLink, "_blank");
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      alert("Failed to send. Please email directly at " + SITE.email);
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: "Email",
      value: SITE.email,
      sub: "I usually reply within 24 hrs.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: "Phone",
      value: SITE.phone,
      sub: "Mon - Sat | 10AM - 7PM",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Location",
      value: SITE.location,
      sub: "Available for remote work worldwide.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: "Timezone",
      value: SITE.timezone,
      sub: "Let's sync up!",
    },
  ];

  return (
    <div className="pt-24 pb-16">
      {/* ═══ HERO ═══ */}
      <section className="min-h-[50vh] flex items-center px-6 md:px-10 mb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 grid grid-cols-2 gap-px">
                <div className="bg-neon w-full h-full" />
                <div className="bg-neon/40 w-full h-full" />
                <div className="bg-neon/40 w-full h-full" />
                <div className="bg-neon w-full h-full" />
              </div>
              <span className="font-space text-xs tracking-[0.2em] text-text-gray uppercase">
                Contact_
              </span>
            </div>

            <div ref={headingRef} style={{ perspective: "600px" }}>
              <h1 className="section-heading">
                <div className="overflow-hidden">
                  {"LET'S".split("").map((c, i) => (
                    <span key={i} className="contact-char inline-block text-white">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="overflow-hidden">
                  {"CONNECT".split("").map((c, i) => (
                    <span key={i} className="contact-char inline-block text-neon">
                      {c}
                    </span>
                  ))}
                  <span className="contact-char inline-block text-neon">_</span>
                </div>
              </h1>
            </div>

            <p className="font-space text-sm text-text-gray leading-relaxed mt-6 max-w-md">
              Have a project in mind or just want to say hi? I&apos;d love to
              hear from you. Let&apos;s build something amazing together.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-neon/30 rounded-full">
              <div className="w-2 h-2 bg-neon rounded-full animate-pulse-glow" />
              <span className="font-space text-[10px] tracking-[0.2em] text-neon uppercase">
                {SITE.available}
              </span>
            </div>
          </div>

          {/* Right: Portrait + decorations */}
          <div className="relative flex justify-center">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(157,3,244,0.1) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative w-56 h-72 rounded-2xl overflow-hidden border border-surface-border bg-gradient-to-br from-surface-light to-surface group">
              <img
                src="/Professional Portrait.jpg"
                alt="Asheerwad Meher"
                className="w-full h-full object-cover filter drop-shadow-[0_0_20px_rgba(157,3,244,0.3)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="absolute -top-2 right-0">
              <StickyNote rotation={3}>
                <p className="font-space text-[10px] tracking-wider text-white uppercase leading-relaxed">
                  Great Ideas<br />Start with<br />
                  <span className="text-neon font-bold">A Conversation.</span>
                </p>
              </StickyNote>
            </div>

            <div className="absolute bottom-12 -left-12">
              <GhostMascot />
            </div>

            <div
              className="absolute bottom-4 right-[-10px] animate-float-slow px-4 py-2 bg-surface/90 backdrop-blur border border-surface-border rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              style={{
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif",
                color: "#C54DFF",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                transform: "rotate(3deg)",
              }}
            >
              Let&apos;s create something great!
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT INFO + FORM ═══ */}
      <section className="px-6 md:px-10 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Get In Touch */}
          <div ref={infoRef}>
            <h2 className="font-space text-xs tracking-[0.2em] text-neon uppercase mb-8">
              Get In Touch__
            </h2>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="info-item flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 flex-shrink-0 card-surface flex items-center justify-center group-hover:border-neon/30 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-space text-xs tracking-[0.15em] text-white uppercase mb-1">
                      {item.label}
                    </h4>
                    <p className="font-space text-sm text-text-gray">
                      {item.value}
                    </p>
                    <p className="font-space text-[10px] text-text-dim mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <h3 className="font-space text-xs tracking-[0.2em] text-neon uppercase mb-4">
                Follow Me__
              </h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-surface-border rounded-lg text-text-gray hover:text-neon hover:border-neon/30 transition-all duration-300"
                    data-cursor="pointer"
                    aria-label={link.label}
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2 className="font-space text-xs tracking-[0.2em] text-neon uppercase mb-8">
              Send A Message
            </h2>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 bg-surface border border-surface-border rounded-lg font-space text-xs text-white placeholder-text-dim focus:border-neon transition-colors"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 bg-surface border border-surface-border rounded-lg font-space text-xs text-white placeholder-text-dim focus:border-neon transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-surface border border-surface-border rounded-lg font-space text-xs text-white placeholder-text-dim focus:border-neon transition-colors"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-4 text-text-dim">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                </div>
                <textarea
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-surface border border-surface-border rounded-lg font-space text-xs text-white placeholder-text-dim focus:border-neon transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-neon text-bg font-space text-xs tracking-[0.2em] uppercase font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(157,3,244,0.4)] hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-3"
                data-cursor="pointer"
              >
                {sent ? (
                  "Message Sent! ✓"
                ) : sending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <span>→</span>
                    {/* Pixel decoration */}
                    <div className="flex gap-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-bg"
                          style={{ opacity: 0.3 + i * 0.2 }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ MAP SECTION ═══ */}
      <section className="px-6 md:px-10">
        <div ref={mapRef} className="max-w-7xl mx-auto">
          <div className="card-surface overflow-hidden relative">
            {/* Stylized dark map */}
            <div className="w-full h-64 md:h-80 bg-surface relative overflow-hidden">
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(157,3,244,0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(157,3,244,0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Fake map paths */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1200 400"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,200 Q300,150 600,200 T1200,180"
                  stroke="rgba(157,3,244,0.1)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0,250 Q400,200 800,250 T1200,220"
                  stroke="rgba(157,3,244,0.08)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M200,0 Q250,200 200,400"
                  stroke="rgba(157,3,244,0.06)"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M800,0 Q750,200 800,400"
                  stroke="rgba(157,3,244,0.06)"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>

              {/* Location marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Pulse ring */}
                <div className="absolute inset-0 -m-8 rounded-full border border-neon/20 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-0 -m-4 rounded-full border border-neon/30 animate-pulse-glow" />

                {/* Marker */}
                <div className="w-6 h-6 relative">
                  <div className="w-full h-full bg-neon rounded-full shadow-[0_0_20px_rgba(157,3,244,0.6)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-bg rounded-full" />
                </div>

                {/* Label */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="font-space text-[10px] text-neon tracking-wider">
                    📍 Sonepur, Odisha
                  </span>
                </div>
              </div>
            </div>

            {/* Map footer text */}
            <div className="p-4 flex items-center gap-2 border-t border-surface-border">
              <div className="w-2 h-2 bg-neon" />
              <span className="font-space text-[10px] tracking-[0.15em] text-text-gray uppercase">
                Work from Anywhere,{" "}
                <span className="text-white underline decoration-neon">
                  Create
                </span>{" "}
                Everywhere.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
