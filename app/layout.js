import "./globals.css";
import { LocaleProvider } from "./LocaleProvider";
import SiteChrome from "./SiteChrome";

export const metadata = {
  title: "Meridian Market — Goods from Everywhere",
  description: "A small international store, one origin at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <SiteChrome>{children}</SiteChrome>
        </LocaleProvider>
      </body>
    </html>
  );
}
