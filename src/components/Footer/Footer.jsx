"use client";
import "./Footer.css";
import { useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useT } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const t = useT();

  useGSAP(
    () => {
      const textElements = footerRef.current.querySelectorAll(".footer-text");

      textElements.forEach((element) => {
        const textContent = element.querySelector(".footer-text-content");
        gsap.set(textContent, { y: "100%" });
      });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 80%",
        onEnter: () => {
          textElements.forEach((element, index) => {
            const textContent = element.querySelector(".footer-text-content");
            gsap.to(textContent, {
              y: "0%",
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
            });
          });
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <div className="footer" ref={footerRef}>
      <div className="footer-socials">
        <div className="fs-col-lg"></div>
        <div className="fs-col-sm">
          <div className="fs-header">
            <div className="footer-text">
              <div className="footer-text-content">
                <p className="sm caps">{t("footer_socials")}</p>
              </div>
            </div>
          </div>
          <div className="footer-social">
            <a href="mailto:info@theoffice.it.com" target="_blank" rel="noopener noreferrer">
              <div className="footer-text">
                <div className="footer-text-content">
                  <h2>{t("footer_email")}</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <div className="footer-text">
                <div className="footer-text-content">
                  <h2>{t("footer_linkedin")}</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/theoffice_dev/" target="_blank" rel="noopener noreferrer">
              <div className="footer-text">
                <div className="footer-text-content">
                  <h2>{t("footer_instagram")}</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copy">
        <div className="fc-col-lg">
          <div className="footer-text">
            <div className="footer-text-content">
              <p className="sm caps">{t("footer_developed")}</p>
            </div>
          </div>
        </div>
        <div className="fc-col-sm">
          <div className="footer-text">
            <div className="footer-text-content">
              <p className="sm caps">{t("footer_rights")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
