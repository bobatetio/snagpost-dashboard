/* Sidebar Chrome Web Store promo card.
 * 1:1 reproduction of Figma node 900:1142 from the TokScript design file. */
export function ChromePromoCard() {
  return (
    <a
      className="chrome-promo"
      href="https://chrome.google.com/webstore/category/extensions"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="chrome-promo-bg" src={`${import.meta.env.BASE_URL}promo-bg.png`} alt="" aria-hidden="true" />
      <div className="chrome-promo-content">
        <span className="chrome-promo-icon" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}promo-chrome.png`} alt="" />
        </span>
        <h3 className="chrome-promo-title">Chrome Extension</h3>
        <p className="chrome-promo-sub">Capture posts while you scroll</p>
      </div>
      <span className="chrome-promo-cta">Add to Chrome</span>
    </a>
  );
}
