"use client";

import { useEffect, useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { PendingPanel } from "../components/PendingPanel";
import { ApprovedPanel } from "../components/ApprovedPanel";

// import { motion } from "framer-motion";
import { calculateCurrentPeriod } from "../utils/period";
// import { OrderDialog } from "../components/OrderDialog";

function Home() {
  const currentPeriod = calculateCurrentPeriod();
  const [period, setPeriod] = useState(currentPeriod);

  const panels = useMemo(
    () => ({
      Pendentes: <PendingPanel />,
      Aprovados: <ApprovedPanel period={period} setPeriod={setPeriod} />,
    }),
    [period, setPeriod],
  );

  const panelState = useState("Pendentes");
  const currentPanel = panelState[0];

  async function promptLogin() {
    const acessToken = sessionStorage.getItem("cadastro-alibras-tokens");

    if (!acessToken) {
      const password = prompt("Acesso restrito\nSenha de acesso:");

      if (password == null) {
        return panelState[1]("Aprovados");
      }

      const res = await fetch("/api/auth/login?password=" + password);
      const status = await res.json();

      if (status.ok) {
        return sessionStorage.setItem("cadastro-alibras-token", "ok");
      }

      promptLogin();
    }
  }

  useEffect(() => {
    if (currentPanel == "Pendentes") promptLogin();
  }, [panelState]);

  return (
    <>
      <Sidebar panelState={panelState} />
      <div
        key={currentPanel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-h-screen overflow-auto transition-all"
      >
        {panels[currentPanel]}
      </div>
    </>
  );
}

export default Home;
