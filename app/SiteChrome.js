"use client";
import { useLocale } from "./LocaleProvider";

export default function SiteChrome({ children }) {
  const { t, currency } = useLocale();

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <a href="/" className="brand">
            Meridian Market
            <small>{t.brandTagline}</small>
          </a>
          <a href="/cart" className="cart-link">{t.cart} (0)</a>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="wrap">{t.footer.replace("{currency}", currency)}</div>
      </footer>
    </>
  );
}
