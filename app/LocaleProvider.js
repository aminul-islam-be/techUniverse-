"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations } from "../lib/locale-data";
import { countries } from "../lib/country-list";

const LocaleContext = createContext(null);

// USD theke onno currency-r real exchange rate anar jonno
async function fetchRate(currency) {
  if (currency === "USD") return 1;
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    return data.rates?.[currency] || 1;
  } catch {
    return 1;
  }
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState({
    lang: "en",
    currency: "USD",
    country: "US",
    rate: 1,
    manual: false, // true hole auto-detect r override korbe na
  });

  // Page load hole ekbar location detect korar chesta
  useEffect(() => {
    let cancelled = false;

    async function detect() {
      try {
        const geoRes = await fetch("https://ipwho.is/");
        const geo = await geoRes.json();
        const countryCode = geo.country_code || "US";
        const currency = geo.currency?.code || "USD";
        const match = countries.find((c) => c.code === countryCode);
        const lang = match?.lang || "en";
        const rate = await fetchRate(currency);

        if (!cancelled) {
          setLocale((prev) =>
            prev.manual ? prev : { ...prev, lang, currency, country: countryCode, rate }
          );
        }
      } catch (e) {
        // detect fail hole default English + USD e thakbe, kono error dekhabo na
      }
    }

    detect();
    return () => {
      cancelled = true;
    };
  }, []);

  // User jokhon nijei ekta desh select kore
  const setCountry = useCallback(async (countryCode) => {
    const match = countries.find((c) => c.code === countryCode);
    if (!match) return;
    const rate = await fetchRate(match.currency);
    setLocale({
      lang: match.lang,
      currency: match.currency,
      country: countryCode,
      rate,
      manual: true,
    });
  }, []);

  // User jokhon shudhu language ta alada kore bodlate chai (currency same thakbe)
  const setLanguage = useCallback((lang) => {
    setLocale((prev) => ({ ...prev, lang, manual: true }));
  }, []);

  // User jokhon shudhu currency ta alada kore bodlate chai (language same thakbe)
  const setCurrency = useCallback(async (currency) => {
    const rate = await fetchRate(currency);
    setLocale((prev) => ({ ...prev, currency, rate, manual: true }));
  }, []);

  const t = translations[locale.lang] || translations.en;

  return (
    <LocaleContext.Provider
      value={{ ...locale, t, setCountry, setLanguage, setCurrency }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
