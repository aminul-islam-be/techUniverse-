import "./globals.css";

export const metadata = {
  title: "Meridian Market — Goods from Everywhere",
  description: "A small international store, one origin at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="wrap">
            <a href="/" className="brand">
              Meridian Market
              <small>International Goods &amp; Trade</small>
            </a>
            <a href="/cart" className="cart-link">CART (0)</a>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="wrap">Shipping worldwide · Prices shown in USD</div>
        </footer>
      </body>
    </html>
  );
    }
