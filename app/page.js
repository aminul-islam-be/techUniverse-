import { products } from "../data/products";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <h1>Handmade goods, sourced from four continents.</h1>
          <p>
            Every piece in this collection is made by a small workshop
            somewhere in the world. We handle the shipping, customs, and
            payment — you just pick what you like.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="grid">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <div className="thumb">{p.image ? "IMAGE" : "NO IMAGE"}</div>
              <div className="origin-tag">Origin — {p.origin}</div>
              <h3>{p.name}</h3>
              <p className="desc">{p.description}</p>
              <div className="row">
                <span className="price">${(p.price / 100).toFixed(2)}</span>
                <button className="buy-btn">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
                                       }
