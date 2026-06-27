"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext({ lang: "en", toggleLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("office-lang");
    const initial = saved === "ar" ? "ar" : "en";
    setLang(initial);
    document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = initial;
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    localStorage.setItem("office-lang", next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

export function useT() {
  const { lang } = useLanguage();
  return (key) => translations[lang]?.[key] ?? translations.en[key] ?? key;
}
