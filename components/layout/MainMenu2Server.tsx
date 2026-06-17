import Link from "next/link";
import cardCollections from "@/public/data/cardHome-1.json";
import ArticleCard5 from "@/components/cards/ArticleCard5";
import MainMenu2Interactive from "./MainMenu2Interactive";

export default function MainMenu2Server() {
  // We map the static JSON data to match the interface required by ArticleCard5
  const cardCollectionsData = cardCollections.cardCollections.map((card) => ({
    ...card,
    slug: card.linkPost.split("/").pop() || "", // Extract slug from link
    category: card.badge || "Barber", // Map 'badge' to 'category'
  }));

  return (
    <ul className="navbar-nav">
      {/* ... Home, Features dropdowns stay the same ... */}

      <li className="nav-item mega-menu-item">
        <a
          className="nav-link dropdown-toggle dropdown-mega-menu link-effect-1 data-link-alt"
          href="#"
        >
          <span>Collections</span>
        </a>
        <div className="sub-mega-menu">
          <div className="container">
            <div className="row">
              {cardCollectionsData.slice(0, 4).map((card, idx) => (
                <div className="col-6 col-md-4 col-lg-3" key={idx}>
                  {/* Now 'card' has 'slug' and 'category' so the error disappears */}
                  <ArticleCard5 card={card as any} idx={idx} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>

      {/* ... Trending link and Interactive component ... */}
      <li className="nav-item position-relative">
        <Link
          className="nav-link link-effect-1 data-link-alt"
          href="/archive-2"
        >
          <span>Trending</span>
        </Link>
      </li>
      <MainMenu2Interactive />
    </ul>
  );
}
