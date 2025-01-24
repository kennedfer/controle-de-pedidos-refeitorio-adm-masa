"use client";

import { useEffect, useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { PendingPanel } from "../components/PendingPanel";
import { ApprovedPanel } from "../components/ApprovedPanel";

// import { motion } from "framer-motion";
import { calculateCurrentPeriod } from "../utils/period";
import { LoginDialog } from "../components/LoginDialog";
import { Header } from "../components/Header";
// import { OrderDialog } from "../components/OrderDialog";

function userNotLogged() {
  const token = sessionStorage.getItem("cadastro-alibras-token");
  return !Boolean(token);
}

function Home() {
  const currentPeriod = calculateCurrentPeriod();
  const [period, setPeriod] = useState(currentPeriod);
  const [loginOpen, setLoginOpen] = useState(false);

  const panels = useMemo(
    () => ({
      pending: <PendingPanel />,
      approved: <ApprovedPanel period={period} setPeriod={setPeriod} />,
    }),
    [period, setPeriod],
  );

  const panelState = useState("approved");
  const currentPanel = useMemo(() => panelState[0], [panelState]);

  //! TODO: FAZER O TRY-CATCH
  async function handleLogin(password, loginResultCallback) {
    const res = await fetch("/api/auth/login?password=" + password);
    const status = await res.json();

    console.log("senha: ", password);

    if (status.ok) {
      setLoginOpen(false);
      sessionStorage.setItem("cadastro-alibras-token", "ok");
    }

    loginResultCallback(status.ok);
  }

  useEffect(() => {
    if (currentPanel == "pending" && userNotLogged()) setLoginOpen(true);
  }, [currentPanel]);

  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar panelState={panelState} />
        <div className="w-full max-h-screen overflow-auto transition-all">
          {panels[currentPanel]}
        </div>
      </main>
      <LoginDialog isOpen={loginOpen} onSubmit={handleLogin} />
    </>
  );
}

export default Home;
