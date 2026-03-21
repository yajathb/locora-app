import Link from "next/link";
import { MapPin, Mail, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "var(--brand-paper)", color: "var(--brand-ink)" }}>

      {/* Hero */}
      <section style={{ backgroundColor: "var(--brand-navy)" }} className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            color: "var(--brand-mist)",
            marginBottom: "16px",
          }}>
            Est. Brentwood, CA
          </p>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "0.02em",
            marginBottom: "20px",
          }}>
            Locora
          </h1>
          <div style={{ width: "36px", height: "0.5px", backgroundColor: "var(--brand-sky)", marginBottom: "20px" }} />
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "20px",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--brand-mist)",
            lineHeight: 1.5,
            maxWidth: "520px",
          }}>
            The definitive guide to your city.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ backgroundColor: "var(--brand-paper)", borderColor: "var(--brand-rule)" }} className="py-20 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "var(--brand-sky)",
            marginBottom: "14px",
          }}>
            Our Mission
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(32px, 4vw, 44px)",
            fontWeight: 300,
            color: "var(--brand-ink)",
            lineHeight: 1.15,
            marginBottom: "24px",
            maxWidth: "640px",
          }}>
            Locora exists to make cities legible to the people who live in them.
          </h2>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "15px",
            fontWeight: 300,
            color: "var(--brand-slate)",
            lineHeight: 1.75,
            maxWidth: "600px",
            marginBottom: "16px",
          }}>
            Information about Brentwood shouldn't be scattered across outdated websites and disconnected pages. Locora brings everything together — events, places, and community moments — written and edited with the care of a city magazine, delivered with the accessibility of a mobile app.
          </p>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "15px",
            fontWeight: 300,
            color: "var(--brand-slate)",
            lineHeight: 1.75,
            maxWidth: "600px",
          }}>
            Locora is not a directory. It is a point of view.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ backgroundColor: "var(--brand-sand)", borderColor: "var(--brand-rule)" }} className="py-20 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--brand-sky)",
                marginBottom: "14px",
              }}>
                The Story
              </p>
              <h2 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(28px, 3.5vw, 38px)",
                fontWeight: 300,
                color: "var(--brand-ink)",
                lineHeight: 1.2,
                marginBottom: "20px",
              }}>
                Built from a simple frustration.
              </h2>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--brand-slate)",
                lineHeight: 1.75,
                marginBottom: "16px",
              }}>
                Locora was founded in Brentwood, California by{" "}
                <strong style={{ fontWeight: 500, color: "var(--brand-ink)" }}>Aarav Bhattacharya</strong>.
                Despite living in a city full of exceptional small businesses, parks, and local events,
                discovering them still meant sifting through outdated Yelp reviews and Google Maps pins
                with no personality.
              </p>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--brand-slate)",
                lineHeight: 1.75,
              }}>
                Locora was built to be what every city deserves — a guide written by someone who actually loves the place.
              </p>
            </div>

            <div style={{ borderLeft: "2px solid var(--brand-sky)", paddingLeft: "24px", paddingTop: "4px" }}>
              <p style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "22px",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--brand-ink)",
                lineHeight: 1.55,
                marginBottom: "20px",
              }}>
                "There's just no good way to find out what's going on in Brentwood. I want to know where the cool events are, which restaurants are actually worth going to, and what hidden gems I might be missing. So I built Locora to solve that problem — a guide for people who love this city as much as I do."
              </p>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase" as const,
                color: "var(--brand-slate)",
              }}>
                — Aarav Bhattacharya · Founder, Locora
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: "var(--brand-paper)", borderColor: "var(--brand-rule)" }} className="py-20 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "var(--brand-sky)",
            marginBottom: "14px",
          }}>
            What We Believe
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 3.5vw, 38px)",
            fontWeight: 300,
            color: "var(--brand-ink)",
            lineHeight: 1.2,
            marginBottom: "40px",
          }}>
            Curation is the product.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Editorial over algorithmic",
                body: "Every listing on Locora is chosen by a human who has been there. We surface the best ten, not the most. Quantity is the enemy of curation.",
              },
              {
                num: "02",
                title: "The city, not the platform",
                body: "No popups before the first scroll. No account required to browse. The city is the product — not the registration funnel.",
              },
              {
                num: "03",
                title: "Trust is non-negotiable",
                body: "Locora Pick is never for sale at any price. Featured placement can be earned through quality — never purchased over editorial judgment.",
              },
            ].map(({ num, title, body }) => (
              <div key={num}>
                <p style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "28px",
                  fontWeight: 300,
                  color: "var(--brand-mist)",
                  lineHeight: 1,
                  marginBottom: "10px",
                }}>
                  {num}
                </p>
                <div style={{ height: "0.5px", backgroundColor: "var(--brand-rule)", marginBottom: "14px" }} />
                <h3 style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--brand-ink)",
                  marginBottom: "8px",
                  lineHeight: 1.4,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--brand-slate)",
                  lineHeight: 1.7,
                }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ backgroundColor: "var(--brand-sand)", borderColor: "var(--brand-rule)" }} className="py-20 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "var(--brand-sky)",
            marginBottom: "14px",
          }}>
            The Team
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 3.5vw, 38px)",
            fontWeight: 300,
            color: "var(--brand-ink)",
            lineHeight: 1.2,
            marginBottom: "40px",
          }}>
            People who love Brentwood.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Aarav Bhattacharya", role: "Founder", bio: "There's just no good way to find out what's going on in Brentwood. I want to know where the cool events are, which restaurants are actually worth going to, and what hidden gems I might be missing. So I started Locora to solve that problem as a guide for people who love this city as much as I do." },
              { name: "Nahar Grewal", role: "Co-Founder", bio: "I love creating tools that help people discover and engage with their communities. In my role as Co-Founder, I work to connect Locora with local businesses and organizations to ensure our guide is comprehensive and inclusive." },
              { name: "Aashutosh Vyas", role: "Lead Programmer", bio: "I'm passionate about building tools that help people discover and engage with their communities. In my role as Lead Programmer, I work to ensure that Locora delivers a seamless and enjoyable experience for all users." },
              { name: "Yajath Barve", role: "Lead Programmer", bio: "I'm passionate about building tools that help people discover and engage with their communities. In my role as Lead Programmer, I work to ensure that Locora delivers a seamless and enjoyable experience for all users." },
              { name: "Satvika Srikireddy", role: "Social Media Manager", bio: "I believe that good design can make information more accessible and enjoyable to interact with. As Locora's Social Media Manager, I focus on crafting a visually appealing and user-friendly interface that reflects the unique character of Brentwood." },
            ].map((person, i) => (
              <div key={i} style={{
                backgroundColor: "var(--brand-fog)",
                border: "0.5px solid var(--brand-rule)",
                padding: "24px",
                borderRadius: "4px",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "var(--brand-fog)",
                  border: "0.5px solid var(--brand-mist)",
                  marginBottom: "14px",
                }} />
                <h3 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "var(--brand-ink)",
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}>
                  {person.name}
                </h3>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase" as const,
                  color: "var(--brand-sky)",
                  marginBottom: "12px",
                }}>
                  {person.role}
                </p>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--brand-slate)",
                  lineHeight: 1.7,
                }}>
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section style={{ backgroundColor: "var(--brand-paper)", borderColor: "var(--brand-rule)" }} className="py-20 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--brand-sky)",
                marginBottom: "14px",
              }}>
                Where We Are
              </p>
              <h2 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(28px, 3.5vw, 38px)",
                fontWeight: 300,
                color: "var(--brand-ink)",
                lineHeight: 1.2,
                marginBottom: "20px",
              }}>
                Brentwood, California.
              </h2>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--brand-slate)",
                lineHeight: 1.75,
                marginBottom: "24px",
              }}>
                Located in the heart of Brentwood, our team is dedicated to providing you with the most up-to-date information about events, restaurants, and activities in the area.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin className="w-4 h-4" style={{ color: "var(--brand-sky)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 300, color: "var(--brand-slate)" }}>
                  Brentwood, CA
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "___", label: "Curated listings" },
                { value: "___", label: "Events added" },
                { value: "___", label: "Community members" },
                { value: "___", label: "Neighborhoods covered" },
              ].map(({ value, label }) => (
                <div key={label} style={{
                  backgroundColor: "var(--brand-fog)",
                  border: "0.5px solid var(--brand-rule)",
                  borderRadius: "4px",
                  padding: "20px 16px",
                }}>
                  <p style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "36px",
                    fontWeight: 300,
                    color: "var(--brand-navy)",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}>
                    {value}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "var(--brand-slate)",
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ backgroundColor: "var(--brand-navy)" }} className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            color: "var(--brand-mist)",
            marginBottom: "16px",
          }}>
            Get In Touch
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            We'd love to hear from you.
          </h2>
          <div style={{ width: "36px", height: "0.5px", backgroundColor: "var(--brand-sky)", margin: "0 auto 20px" }} />
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "14px",
            fontWeight: 300,
            color: "var(--brand-mist)",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto 32px",
          }}>
            Whether you want to list your business, contribute to the guide, or just say hello — reach out.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:yajath.barve@gmail.com"
              style={{
                backgroundColor: "#ffffff",
                color: "var(--brand-navy)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                padding: "14px 28px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
              className="hover:opacity-90 transition"
            >
              <Mail className="w-4 h-4" />
              yajath.barve@gmail.com
            </a>
            <Link
              href="/places"
              style={{
                backgroundColor: "transparent",
                color: "var(--brand-mist)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                padding: "14px 28px",
                borderRadius: "4px",
                border: "0.5px solid rgba(168,196,222,0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              className="hover:opacity-80 transition"
            >
              Explore the Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}