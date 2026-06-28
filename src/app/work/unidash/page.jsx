"use client";
import "./page.css";
import { useRef } from "react";

import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";
import { useLanguage, useT } from "@/context/LanguageContext";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function UniDash() {
  const pageRef = useRef(null);
  const { lang } = useLanguage();
  const t = useT();

  useGSAP(() => {
    if (!pageRef.current) return;
    const isRTL = document.documentElement.dir === "rtl";

    const line = pageRef.current.querySelector(".ud-line");
    if (line) {
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: isRTL ? "right" : "left" },
        { scaleX: 1, duration: 1.2, delay: 1.1, ease: "power4.out" }
      );
    }
  }, [lang]);

  return (
    <div className="ud-page" ref={pageRef}>
      <section className="ud-hero">
        <div className="ud-hero-top">
          <Copy animateOnScroll={false} delay={0.5}>
            <p className="sm caps mono">{t("ud_subtitle")}</p>
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
                <p className="sm caps mono">{t("ud_status_label")}</p>
                <p className="sm caps mono">{t("ud_status")}</p>
              </Copy>
              <div className="ud-cta">
                <BtnLink route="/work" label={t("ud_back")} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ud-coming-soon">
        <Copy>
          <h2>{t("ud_coming_soon")}</h2>
        </Copy>
        <div className="ud-coming-soon-copy">
          <Copy>
            <p className="sm caps mono">
              {t("ud_coming_copy")}
            </p>
          </Copy>
        </div>
      </section>
    </div>
  );
}
