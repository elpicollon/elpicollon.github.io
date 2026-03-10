import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import App from "./App.tsx";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/space-grotesk";
import "./index.css";

// Fonts are now bundled and preloaded efficiently via Vite

createRoot(document.getElementById("root")!).render(
    <LanguageProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </LanguageProvider>
);