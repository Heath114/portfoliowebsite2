"use client";
import "./ProcessCards.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const ProcessCards = () => {
  const t = useT();

  const processCardsData = [
    {
      index: "01",
      title: t("process_1_title"),
      label: t("process_1_label"),
      image: "/images/process/process_001.jpeg",
      description: t("process_1_desc"),
    },
    {
      index: "02",
      title: t("process_2_title"),
      label: t("process_2_label"),
      image: "/images/process/process_002.jpeg",
      description: t("process_2_desc"),
    },
    {
      index: "03",
      title: t("process_3_title"),
      label: t("process_3_label"),
      image: "/images/process/process_003.jpeg",
      description: t("process_3_desc"),
    },
    {
      index: "04",
      title: t("process_4_title"),
      label: t("process_4_label"),
      image: "/images/process/process_004.jpeg",
      description: t("process_4_desc"),
    },
  ];

  useGSAP(() => {
    const processCards = gsap.utils.toArray(".process-card");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1001px)", () => {
      processCards.forEach((card, index) => {
        if (index < processCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: processCards[processCards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
            id: `card-pin-${index}`,
          });
        }

        if (index < processCards.length - 1) {
          ScrollTrigger.create({
            trigger: processCards[index + 1],
            start: "top 75%",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
                "--after-opacity": afterOpacity,
              });
            },
          });
        }
      });
    });

    mm.add("(max-width: 1000px)", () => {
      gsap.set(processCards, { clearProps: "transform" });
      processCards.forEach((card) => card.style.setProperty("--after-opacity", 0));
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="process-cards">
      {processCardsData.map((cardData, index) => (
        <div key={index} className="process-card">
          <div className="process-card-index">
            <h1>{cardData.index}</h1>
          </div>
          <div className="process-card-content">
            <div className="process-card-content-wrapper">
              <h1 className="process-card-header">{cardData.title}</h1>

              <div className="process-card-img">
                <img src={cardData.image} alt="" />
              </div>

              <div className="process-card-copy">
                <div className="process-card-copy-title">
                  <p className="caps">{cardData.label}</p>
                </div>
                <div className="process-card-copy-description">
                  <p>{cardData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessCards;
