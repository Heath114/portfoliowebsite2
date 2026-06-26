"use client";
import "./card.css";
import { useRef } from "react";

import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";

import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Card() {
  const cardRef = useRef(null);
  const router = useTransitionRouter();

  useGSAP(() => {
    if (!cardRef.current) return;
    const dot = cardRef.current.querySelector(".card-status-dot");
    if (dot) {
      gsap.to(dot, {
        opacity: 0.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  });

  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0.2, transform: "translateY(-30%) scale(0.90)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );
    document.documentElement.animate(
      [
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const navigateTo = (e, route) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    router.push(route, { onTransitionReady: slideInOut });
  };

  return (
    <div className="card-page" ref={cardRef}>

      <section className="card-hero">
        <div className="card-hero-top">
          <Copy animateOnScroll={false} delay={0.5}>
            <p className="sm caps mono">Development Company</p>
          </Copy>
        </div>
        <div className="card-hero-bottom">
          <Copy animateOnScroll={false} delay={0.7}>
            <h1>The Office</h1>
          </Copy>
          <Copy animateOnScroll={false} delay={0.95}>
            <h3>Software built around how your business works.</h3>
          </Copy>
          <div className="card-hero-ctas">
            <BtnLink route="/contact" label="Contact Us" />
            <BtnLink route="/work" label="View Our Work" />
          </div>
        </div>
      </section>

      <section className="card-building">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">Currently Building</p>
          </Copy>
        </div>
        <div className="card-building-item">
          <span className="card-status-dot" />
          <div>
            <Copy>
              <p className="caps">UniDash</p>
              <p className="sm caps mono">University Food Ordering Platform</p>
              <p className="sm caps mono card-muted">Active Development</p>
            </Copy>
          </div>
        </div>
      </section>

      <section className="card-about">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">Who We Are</p>
          </Copy>
        </div>
        <div className="card-about-copy">
          <Copy>
            <h3>
              We are a software development company based in Amman, Jordan.
              We build digital products, automate business operations, and write
              custom software for organizations that need things done right.
            </h3>
          </Copy>
        </div>
        <div className="card-about-stats">
          <div className="card-stat">
            <Copy>
              <p className="sm caps mono card-muted">Since</p>
              <h2>2023</h2>
            </Copy>
          </div>
          <div className="card-stat">
            <Copy>
              <p className="sm caps mono card-muted">Current Products</p>
              <h2>1</h2>
            </Copy>
          </div>
          <div className="card-stat">
            <Copy>
              <p className="sm caps mono card-muted">Future Ventures</p>
              <h2>&#8734;</h2>
            </Copy>
          </div>
        </div>
      </section>

      <section className="card-venture">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">Featured Venture</p>
          </Copy>
        </div>
        <div className="card-venture-inner">
          <div className="card-venture-header">
            <Copy>
              <h2>UniDash</h2>
              <p className="sm caps mono card-muted">University Food Ordering Platform</p>
            </Copy>
          </div>
          <div className="card-venture-desc">
            <Copy>
              <h3>
                UniDash is a food ordering platform for university campuses.
                Students place orders in advance, skip the queue, and pick up
                when ready. Cafeterias handle more volume with less friction.
              </h3>
            </Copy>
          </div>
          <div className="card-venture-cta">
            <BtnLink route="/work/unidash" label="Learn More" />
          </div>
        </div>
      </section>

      <section className="card-services">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">What We Build</p>
          </Copy>
        </div>
        <div className="card-list">
          {[
            {
              title: "Custom Software",
              desc: "Business software built around your workflow.",
            },
            {
              title: "Automation",
              desc: "Taking repetitive manual work off your plate.",
            },
            {
              title: "Mobile Applications",
              desc: "iOS and Android applications designed for real users.",
            },
            {
              title: "AI Solutions",
              desc: "Machine learning and computer vision put to practical use.",
            },
          ].map((s, i) => (
            <div className="card-list-item" key={i}>
              <Copy>
                <p className="caps">{s.title}</p>
                <p className="sm caps mono card-muted">{s.desc}</p>
              </Copy>
            </div>
          ))}
        </div>
      </section>

      <section className="card-selected-work">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">Selected Work</p>
          </Copy>
        </div>
        <div className="card-list">
          <div className="card-list-item">
            <Copy>
              <p className="caps">UniDash</p>
              <p className="sm caps mono card-muted">University Food Ordering Platform</p>
            </Copy>
          </div>
          <div className="card-list-item">
            <Copy>
              <p className="caps">Borvyn Bakery</p>
              <p className="sm caps mono card-muted">E-Commerce Experience, Motion UI</p>
            </Copy>
          </div>
        </div>
      </section>

      <section className="card-why">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">Why The Office?</p>
          </Copy>
        </div>
        <div className="card-list">
          {[
            {
              title: "Fast Development",
              desc: "Built efficiently without unnecessary complexity.",
            },
            {
              title: "Scalable Architecture",
              desc: "Designed for long-term growth.",
            },
            {
              title: "Long-Term Partnership",
              desc: "We stick around long after launch.",
            },
          ].map((w, i) => (
            <div className="card-list-item" key={i}>
              <Copy>
                <p className="caps">{w.title}</p>
                <p className="sm caps mono card-muted">{w.desc}</p>
              </Copy>
            </div>
          ))}
        </div>
      </section>

      <section className="card-contact">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">Get In Touch</p>
          </Copy>
        </div>
        <div className="card-contact-links">
          <a href="tel:+962XXXXXXXXX" className="card-contact-link">
            <Copy>
              <h2>Call</h2>
            </Copy>
          </a>
          <a
            href="https://wa.me/962XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="card-contact-link"
          >
            <Copy>
              <h2>WhatsApp</h2>
            </Copy>
          </a>
          <a href="mailto:info@theoffice.it.com" className="card-contact-link">
            <Copy>
              <h2>Email</h2>
            </Copy>
          </a>
          <a
            href="/"
            className="card-contact-link"
            onClick={(e) => navigateTo(e, "/")}
          >
            <Copy>
              <h2>Website</h2>
            </Copy>
          </a>
        </div>
      </section>

      <footer className="card-footer">
        <div className="card-footer-brand">
          <Copy>
            <p className="sm caps mono">The Office</p>
            <p className="sm caps mono">Development Company</p>
            <p className="sm caps mono">Amman, Jordan</p>
            <p className="sm caps mono">info@theoffice.it.com</p>
          </Copy>
        </div>
        <div className="card-footer-copy">
          <Copy>
            <p className="sm caps mono card-muted">
              &copy; 2026 The Office. All Rights Reserved.
            </p>
          </Copy>
        </div>
      </footer>
    </div>
  );
}
