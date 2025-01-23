"use client";

import { useEffect, useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { PendingPanel } from "../components/PendingPanel";
import { ApprovedPanel } from "../components/ApprovedPanel";

// import { motion } from "framer-motion";
import { calculateCurrentPeriod } from "../utils/period";
import { LoginDialog } from "../components/LoginDialog";
// import { OrderDialog } from "../components/OrderDialog";

function Home() {
  const currentPeriod = calculateCurrentPeriod();
  const [period, setPeriod] = useState(currentPeriod);
  const [loginOpen, setLoginOpen] = useState(true);

  const panels = useMemo(
    () => ({
      pending: <PendingPanel />,
      approveds: <ApprovedPanel period={period} setPeriod={setPeriod} />,
    }),
    [period, setPeriod],
  );

  const panelState = useState("pending");
  const currentPanel = useMemo(() => panelState[0], [panelState]);

  // async function promptLogin() {
  //   const acessToken = sessionStorage.getItem("cadastro-alibras-tokens");

  //   if (!acessToken) {
  //     const password = prompt("Acesso restrito\nSenha de acesso:");

  //     if (password == null) {
  //       return panelState[1]("Aprovados");
  //     }

  //     const res = await fetch("/api/auth/login?password=" + password);
  //     const status = await res.json();

  //     if (status.ok) {
  //       return sessionStorage.setItem("cadastro-alibras-token", "ok");
  //     }

  //     promptLogin();
  //   }
  // }

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
    if (currentPanel == "pending") setLoginOpen(true);
  }, [currentPanel]);

  return (
    <>
      <Sidebar panelState={panelState} />
      <div className="w-full max-h-screen overflow-auto transition-all">
        {panels[currentPanel]}
      </div>
      <LoginDialog isOpen={loginOpen} onSubmit={handleLogin} />
    </>
  );
}

export default Home;
