"use client";
import { useLocale } from "./LocaleProvider";
import LocaleSwitcher from "./LocaleSwitcher";

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
          <div className="header-right">
            <LocaleSwitcher />
            <a href="/cart" className="cart-link">
              {t.cart} (0)
            </a>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="wrap">{t.footer.replace("{currency}", currency)}</div>
      </footer>
    </>
  );
    }
