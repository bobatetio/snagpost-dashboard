import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { App } from "./App";
import "@fontsource/mona-sans/400.css";
import "@fontsource/mona-sans/500.css";
import "@fontsource/mona-sans/600.css";
import "@fontsource/mona-sans/700.css";
import "@fontsource/mona-sans/800.css";
import "./styles/theme.css";
import "./styles/app.css";
import "./styles/landing.css";
import "./styles/tailwind.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
