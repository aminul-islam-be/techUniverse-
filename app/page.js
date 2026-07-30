"use client";
import { products } from "../data/products";
import { useLocale } from "./LocaleProvider";

export default function Home() {
  const { t, currency, rate, lang } = useLocale();

  function formatPrice(cents) {
    const amount = (cents / 100) * rate;
    try {
      return new Intl.NumberFormat(lang, {
        style: "currency",
        currency,
      }).format(amount);
    } catch {
      return `$${(cents / 100).toFixed(2)}`;
    }
  }

  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
        </div>
      </section>

      <div className="wrap">
        <div className="grid">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <div className="thumb">{p.image ? "IMAGE" : "NO IMAGE"}</div>
              <div className="origin-tag">
                {t.origin} — {p.origin}
              </div>
              <h3>{p.name}</h3>
              <p className="desc">{p.description}</p>
              <div className="row">
                <span className="price">{formatPrice(p.price)}</span>
                <button className="buy-btn">{t.addToCart}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
    }
