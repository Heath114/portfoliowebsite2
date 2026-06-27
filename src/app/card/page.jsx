"use client";
import "./card.css";
import { useRef } from "react";

import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";
import { useT } from "@/context/LanguageContext";

import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Card() {
  const cardRef = useRef(null);
  const router = useTransitionRouter();
  const t = useT();

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
            <p className="sm caps mono">{t("card_dev_company")}</p>
          </Copy>
        </div>
        <div className="card-hero-bottom">
          <Copy animateOnScroll={false} delay={0.7}>
            <h1>The Office</h1>
          </Copy>
          <Copy animateOnScroll={false} delay={0.95}>
            <h3>{t("card_tagline")}</h3>
          </Copy>
          <div className="card-hero-ctas">
            <BtnLink route="/contact" label={t("card_contact_btn")} />
            <BtnLink route="/work" label={t("card_work_btn")} />
          </div>
        </div>
      </section>

      <section className="card-building">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">{t("card_building_label")}</p>
          </Copy>
        </div>
        <div className="card-building-item">
          <span className="card-status-dot" />
          <div>
            <Copy>
              <p className="caps">{t("card_unidash_name")}</p>
              <p className="sm caps mono">{t("card_unidash_subtitle")}</p>
              <p className="sm caps mono card-muted">{t("card_active_dev")}</p>
            </Copy>
          </div>
        </div>
      </section>

      <section className="card-about">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">{t("card_who_label")}</p>
          </Copy>
        </div>
        <div className="card-about-copy">
          <Copy>
            <h3>{t("card_who_copy")}</h3>
          </Copy>
        </div>
        <div className="card-about-stats">
          <div className="card-stat">
            <Copy>
              <p className="sm caps mono card-muted">{t("card_since")}</p>
              <h2>2023</h2>
            </Copy>
          </div>
          <div className="card-stat">
            <Copy>
              <p className="sm caps mono card-muted">{t("card_products")}</p>
              <h2>1</h2>
            </Copy>
          </div>
          <div className="card-stat">
            <Copy>
              <p className="sm caps mono card-muted">{t("card_ventures")}</p>
              <h2>&#8734;</h2>
            </Copy>
          </div>
        </div>
      </section>

      <section className="card-venture">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">{t("card_venture_label")}</p>
          </Copy>
        </div>
        <div className="card-venture-inner">
          <div className="card-venture-header">
            <Copy>
              <h2>{t("card_unidash_name")}</h2>
              <p className="sm caps mono card-muted">{t("card_unidash_subtitle")}</p>
            </Copy>
          </div>
          <div className="card-venture-desc">
            <Copy>
              <h3>{t("card_unidash_desc")}</h3>
            </Copy>
          </div>
          <div className="card-venture-cta">
            <BtnLink route="/work/unidash" label={t("card_learn_more")} />
          </div>
        </div>
      </section>

      <section className="card-services">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">{t("card_services_label")}</p>
          </Copy>
        </div>
        <div className="card-list">
          {[
            { title: t("card_s1_title"), desc: t("card_s1_desc") },
            { title: t("card_s2_title"), desc: t("card_s2_desc") },
            { title: t("card_s3_title"), desc: t("card_s3_desc") },
            { title: t("card_s4_title"), desc: t("card_s4_desc") },
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
            <p className="sm caps mono">{t("card_work_label")}</p>
          </Copy>
        </div>
        <div className="card-list">
          <div className="card-list-item">
            <Copy>
              <p className="caps">{t("card_unidash_name")}</p>
              <p className="sm caps mono card-muted">{t("card_unidash_subtitle")}</p>
            </Copy>
          </div>
          <div className="card-list-item">
            <Copy>
              <p className="caps">Borvyn Bakery</p>
              <p className="sm caps mono card-muted">{t("card_borvyn_tags")}</p>
            </Copy>
          </div>
        </div>
      </section>

      <section className="card-why">
        <div className="card-section-label">
          <Copy>
            <p className="sm caps mono">{t("card_why_label")}</p>
          </Copy>
        </div>
        <div className="card-list">
          {[
            { title: t("card_w1_title"), desc: t("card_w1_desc") },
            { title: t("card_w2_title"), desc: t("card_w2_desc") },
            { title: t("card_w3_title"), desc: t("card_w3_desc") },
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
            <p className="sm caps mono">{t("card_contact_label")}</p>
          </Copy>
        </div>
        <div className="card-contact-links">
          <a href="tel:+962XXXXXXXXX" className="card-contact-link">
            <Copy>
              <h2>{t("card_call")}</h2>
            </Copy>
          </a>
          <a
            href="https://wa.me/962XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="card-contact-link"
          >
            <Copy>
              <h2>{t("card_whatsapp")}</h2>
            </Copy>
          </a>
          <a href="mailto:info@theoffice.it.com" className="card-contact-link">
            <Copy>
              <h2>{t("card_email")}</h2>
            </Copy>
          </a>
          <a
            href="/"
            className="card-contact-link"
            onClick={(e) => navigateTo(e, "/")}
          >
            <Copy>
              <h2>{t("card_website")}</h2>
            </Copy>
          </a>
        </div>
      </section>

      <footer className="card-footer">
        <div className="card-footer-brand">
          <Copy>
            <p className="sm caps mono">{t("card_footer_company")}</p>
            <p className="sm caps mono">{t("card_footer_type")}</p>
            <p className="sm caps mono">{t("card_footer_city")}</p>
            <p className="sm caps mono">info@theoffice.it.com</p>
          </Copy>
        </div>
        <div className="card-footer-copy">
          <Copy>
            <p className="sm caps mono card-muted">
              {t("card_footer_rights")}
            </p>
          </Copy>
        </div>
      </footer>
    </div>
  );
}
