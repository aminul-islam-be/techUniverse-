"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { translations, countryToLanguage } from "../lib/locale-data";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState({
    lang: "en",
    currency: "USD",
    rate: 1,
  });

  useEffect(() => {
    async function detect() {
      try {
        const geoRes = await fetch("https://ipwho.is/");
        const geo = await geoRes.json();
        const countryCode = geo.country_code || "US";
        const currency = geo.currency?.code || "USD";
        const lang = countryToLanguage[countryCode] || "en";

        let rate = 1;
        if (currency !== "USD") {
          const rateRes = await fetch("https://open.er-api.com/v6/latest/USD");
          const rateData = await rateRes.json();
          rate = rateData.rates?.[currency] || 1;
        }

        setLocale({ lang, currency, rate });
      } catch (e) {
        // Location detect na hole default English + USD e thakbe
        setLocale({ lang: "en", currency: "USD", rate: 1 });
      }
    }
    detect();
  }, []);

  const t = translations[locale.lang] || translations.en;

  return (
    <LocaleContext.Provider value={{ ...locale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
