"use client";
import { useLocale } from "./LocaleProvider";
import { countries } from "../lib/country-list";
import { languageNames, currencyList } from "../lib/locale-data";

export default function LocaleSwitcher() {
  const { country, lang, currency, setCountry, setLanguage, setCurrency } =
    useLocale();

  return (
    <div className="locale-switcher">
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        aria-label="Country"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={lang}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Language"
      >
        {Object.entries(languageNames).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        aria-label="Currency"
      >
        {currencyList.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
}
