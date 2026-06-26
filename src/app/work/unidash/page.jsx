"use client";
import "./page.css";
import { useRef } from "react";

import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function UniDash() {
  const pageRef = useRef(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    const line = pageRef.current.querySelector(".ud-line");
    if (line) {
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.2, delay: 1.1, ease: "power4.out" }
      );
    }
  });

  return (
    <div className="ud-page" ref={pageRef}>
      <section className="ud-hero">
        <div className="ud-hero-top">
          <Copy animateOnScroll={false} delay={0.5}>
            <p className="sm caps mono">University Food Ordering Platform</p>
          </Copy>
        </div>

        <div className="ud-hero-bottom">
          <div className="ud-line" />
          <div className="ud-hero-footer">
            <Copy animateOnScroll={false} delay={0.85}>
              <h1>UniDash</h1>
            </Copy>
            <div className="ud-hero-meta">
              <Copy animateOnScroll={false} delay={1.1}>
                <p className="sm caps mono">Status</p>
                <p className="sm caps mono">Active Development</p>
              </Copy>
              <div className="ud-cta">
                <BtnLink route="/work" label="Back to Work" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ud-coming-soon">
        <Copy>
          <h2>Coming Soon</h2>
        </Copy>
        <div className="ud-coming-soon-copy">
          <Copy>
            <p className="sm caps mono">
              This page will be up once UniDash ships.
            </p>
          </Copy>
        </div>
      </section>
    </div>
  );
}
