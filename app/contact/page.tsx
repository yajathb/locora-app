import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
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
            Brentwood, CA
          </p>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(44px, 6vw, 72px)",
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            marginBottom: "20px",
          }}>
            Get in touch.
          </h1>
          <div style={{ width: "36px", height: "0.5px", backgroundColor: "var(--brand-sky)", marginBottom: "20px" }} />
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "20px",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--brand-mist)",
            lineHeight: 1.5,
            maxWidth: "480px",
          }}>
            We read every message. We respond within 48 hours.
          </p>
        </div>
      </section>

      {/* Form + contact details */}
      <section style={{ backgroundColor: "var(--brand-paper)", borderColor: "var(--brand-rule)" }} className="py-20 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Form */}
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
                Send a Message
              </p>
              <h2 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "32px",
                fontWeight: 300,
                color: "var(--brand-ink)",
                lineHeight: 1.2,
                marginBottom: "28px",
              }}>
                We&apos;d love to hear from you.
              </h2>

              <form className="space-y-5">
                {[
                  { label: "Your Name", type: "text", placeholder: "" },
                  { label: "Email Address", type: "email", placeholder: "" },
                  { label: "Subject", type: "text", placeholder: "" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label} className="flex flex-col">
                    <label style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "9px",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase" as const,
                      color: "var(--brand-slate)",
                      marginBottom: "6px",
                    }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      style={{
                        borderColor: "var(--brand-rule)",
                        backgroundColor: "var(--brand-paper)",
                        color: "var(--brand-ink)",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "13px",
                        fontWeight: 300,
                        padding: "10px 14px",
                        borderRadius: "4px",
                        border: "0.5px solid var(--brand-rule)",
                        outline: "none",
                        width: "100%",
                      }}
                    />
                  </div>
                ))}

                <div className="flex flex-col">
                  <label style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase" as const,
                    color: "var(--brand-slate)",
                    marginBottom: "6px",
                  }}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder=""
                    style={{
                      borderColor: "var(--brand-rule)",
                      backgroundColor: "var(--brand-paper)",
                      color: "var(--brand-ink)",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "13px",
                      fontWeight: 300,
                      padding: "10px 14px",
                      borderRadius: "4px",
                      border: "0.5px solid var(--brand-rule)",
                      outline: "none",
                      width: "100%",
                      resize: "vertical" as const,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--brand-navy)",
                    color: "#ffffff",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    padding: "14px 0",
                    borderRadius: "4px",
                    width: "100%",
                    border: "none",
                    cursor: "pointer",
                  }}
                  className="hover:opacity-90 transition mt-2"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact details */}
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
                Contact Details
              </p>
              <h2 style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "32px",
                fontWeight: 300,
                color: "var(--brand-ink)",
                lineHeight: 1.2,
                marginBottom: "28px",
              }}>
                Find us.
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="w-4 h-4" />,
                    label: "Email",
                    value: "yajath.barve@gmail.com",
                    href: "mailto:yajath.barve@gmail.com",
                  },
                  {
                    icon: <Phone className="w-4 h-4" />,
                    label: "Phone",
                    value: "(669)-360-0398",
                    href: "tel:6693600398",
                  },
                  {
                    icon: <MapPin className="w-4 h-4" />,
                    label: "Address",
                    value: "123 Main Street, Brentwood, CA 91712",
                    href: null,
                  },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--brand-sky)", marginTop: "2px", flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase" as const,
                        color: "var(--brand-slate)",
                        marginBottom: "4px",
                      }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "var(--brand-ink)",
                            textDecoration: "none",
                          }}
                          className="hover:opacity-70 transition"
                        >
                          {value}
                        </a>
                      ) : (
                        <p style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "14px",
                          fontWeight: 300,
                          color: "var(--brand-ink)",
                        }}>
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div style={{
                marginTop: "40px",
                borderTop: "0.5px solid var(--brand-rule)",
                paddingTop: "28px",
              }}>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: "var(--brand-sky)",
                  marginBottom: "14px",
                }}>
                  Response Hours
                </p>
                {[
                  { day: "Monday - Friday", hours: "9:00 - 17:00" },
                  { day: "Saturday", hours: "10:00 - 16:00" },
                  { day: "Sunday", hours: "Closed" },
                ].map(({ day, hours }) => (
                  <div
                    key={day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "0.5px solid var(--brand-rule)",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 300, color: "var(--brand-slate)" }}>
                      {day}
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 400, color: "var(--brand-ink)" }}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Reasons to reach out */}
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
            How We Can Help
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 3.5vw, 38px)",
            fontWeight: 300,
            color: "var(--brand-ink)",
            lineHeight: 1.2,
            marginBottom: "40px",
          }}>
            A few reasons people reach out.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "List your business",
                body: "Own or manage a Brentwood business? We'd love to feature you. Reach out and we'll walk you through the process.",
              },
              {
                num: "02",
                title: "Submit an event",
                body: "Organizing something worth knowing about? Send us the details and we'll consider it for the guide.",
              },
              {
                num: "03",
                title: "Press & partnerships",
                body: "Media inquiries, partnership opportunities, and collaboration requests are welcome. We respond to all of them.",
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

      {/* Press note */}
      <section style={{ backgroundColor: "var(--brand-paper)" }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{
            backgroundColor: "var(--brand-fog)",
            borderLeft: "2px solid var(--brand-sky)",
            borderRadius: "0 6px 6px 0",
            padding: "24px 28px",
          }}>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              color: "var(--brand-sky)",
              marginBottom: "8px",
            }}>
              Press & Media
            </p>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "18px",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--brand-ink)",
              lineHeight: 1.6,
              marginBottom: "8px",
            }}>
              For press inquiries, interview requests, and media assets, email us directly at yajath.barve@gmail.com. We honor embargoes and respond within 48 hours.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}