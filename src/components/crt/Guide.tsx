import { useChannel } from "./channelContext";
import { useTranslation } from "../../hooks/useTranslation";

export default function Guide() {
  const { channels, channel, tune, guideOpen, setGuideOpen } = useChannel();
  const { isPortuguese } = useTranslation();

  if (!guideOpen) return null;

  return (
    <div className="guide on" role="dialog" aria-modal="true" aria-label="Sitemap">
      <div className="g-container">
        <div className="g-top">
          <span className="g-title">
            <span className="mark"></span>
            Menu
          </span>
          <button className="g-close cursor-pointer" onClick={() => setGuideOpen(false)}>
            {isPortuguese ? "✕ Fechar" : "✕ Close"}
          </button>
        </div>
        <hr className="gradline" />

        <div className="g-list">
          {channels.map((c) => {
            const isCurrent = c.n === channel;
            
            // Translate default shows/descriptions
            let descText = "";
            if (c.type === "home") {
              descText = isPortuguese ? "Início — Visão Geral" : "Now showing — the main broadcast";
            } else if (c.type === "about") {
              descText = isPortuguese ? "Biografia — Trajetória, ensino & histórico" : "Profile — trajectory, teaching & background";
            } else {
              const discText = isPortuguese ? (c.discPt || c.disc) : c.disc;
              descText = `${isPortuguese ? "Projeto" : "Project"} — ${discText} · ${c.year}`;
            }

            const displayName = isPortuguese
              ? (c.namePt || c.name)
              : c.name;

            return (
              <button
                key={c.n}
                className={`g-row cursor-pointer ${isCurrent ? "now" : ""}`}
                onClick={() => {
                  if (c.n !== undefined) tune(c.n);
                }}
              >
                <div className="g-row-top">
                  <div className="g-row-left">
                    <span className="g-num">{String(c.n).padStart(2, "0")}</span>
                    <span className="g-name">{displayName}</span>
                  </div>
                  <span className="g-tag">
                    {isCurrent
                      ? (isPortuguese ? "Você está aqui" : "You are here")
                      : (isPortuguese ? "Ver" : "View")}
                  </span>
                </div>
                <div className="g-desc">{descText}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
