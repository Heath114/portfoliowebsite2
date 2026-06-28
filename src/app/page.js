"use client";
import "./home.css";
import { useState, useEffect } from "react";

import DynamicBackground from "@/components/DynamicBackground/DynamicBackground";
import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";
import { useT } from "@/context/LanguageContext";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const PRELOADER_SESSION_KEY = "wuwei-home-preloader-played";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(false);
  const [hasCheckedPreloader, setHasCheckedPreloader] = useState(false);
  const t = useT();

  useEffect(() => {
    const hasPlayedPreloader =
      window.sessionStorage.getItem(PRELOADER_SESSION_KEY) === "true";

    if (!hasPlayedPreloader) {
      setShowPreloader(true);
      window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
    }

    setHasCheckedPreloader(true);
  }, []);

  useGSAP(() => {
    if (!hasCheckedPreloader) return;

    const heroLink = document.querySelector(".hero-link");
    const animationDelay = showPreloader ? 6.2 : 0.9;

    if (showPreloader) {
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: "hop",
        },
      });

      const counts = document.querySelectorAll(".count");
      const progressBar = document.querySelector(".progress-bar");
      const preloaderOverlay = document.querySelector(".preloader-overlay");

      const progressTl = gsap.timeline({
        delay: 0.3,
      });

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-120%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }

        progressTl.to(
          progressBar,
          {
            scaleY: (index + 1) / counts.length,
            duration: 1,
            ease: "hop",
          },
          index * 1
        );
      });

      progressTl
        .set(progressBar, {
          transformOrigin: "top",
        })
        .to(progressBar, {
          scaleY: 0,
          duration: 0.75,
          ease: "hop",
        })
        .to(preloaderOverlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            preloaderOverlay.style.display = "none";
          },
        });
    }

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }
  }, [showPreloader, hasCheckedPreloader]);

  if (!hasCheckedPreloader) return null;

  return (
    <>
      {showPreloader && (
        <div className="preloader-overlay">
          <div className="progress-bar"></div>
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>2</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>6</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>8</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>9</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="hero">
        <DynamicBackground logoPath="/images/logos/c.png" />

        <div className="hero-content">
          <div className="hero-header">
            <div className="hero-header-col-lg"></div>
            <div className="hero-header-col-sm">
              <Copy animateOnScroll={true} delay={showPreloader ? 6.2 : 0.9}>
                <h3>{t("home_tagline")}</h3>
              </Copy>
            </div>
          </div>

          <div className="hero-footer">
            <div className="hero-footer-col-lg">
              <Copy animateOnScroll={false} delay={showPreloader ? 6.2 : 0.9}>
                <p className="sm caps mono">{t("home_loc_1")}</p>
                <p className="sm caps mono">{t("home_loc_2")}</p>
              </Copy>
            </div>
            <div className="hero-footer-col-sm">
              <div className="hero-tags">
                <Copy animateOnScroll={false} delay={showPreloader ? 6.2 : 0.9}>
                  <p className="sm caps mono">{t("home_tag_1")}</p>
                  <p className="sm caps mono">{t("home_tag_2")}</p>
                  <p className="sm caps mono">{t("home_tag_3")}</p>
                  <p className="sm caps mono">{t("home_tag_4")}</p>
                </Copy>
              </div>

              <div className="hero-link">
                <BtnLink route="/contact" label={t("home_contact_btn")} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
