"use client";

import { useEffect, useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { PendingPanel } from "../components/PendingPanel";
import { ApprovedPanel } from "../components/ApprovedPanel";
import { calculateCurrentPeriod } from "../utils/period";
import { LoginDialog } from "../components/LoginDialog";
import { Header } from "../components/Header";
import { tryLogin, userNotLogged } from "../utils/login";

function Home() {
  const currentPeriod = calculateCurrentPeriod();
  const [period, setPeriod] = useState(currentPeriod);
  const [loginOpen, setLoginOpen] = useState(false);

  const [refresh, setRefresh] = useState(0);

  const panels = useMemo(
    () => ({
      pending: <PendingPanel refresh={refresh} setRefresh={setRefresh} />,
      approved: <ApprovedPanel period={period} setPeriod={setPeriod} />,
    }),
    [period, setPeriod, refresh],
  );

  const [selectedPanel, setSelectedPanel] = useState("approved");
  const currentPanel = useMemo(() => selectedPanel, [selectedPanel]);

  useEffect(() => {
    console.log("seteu o panel: " + period.start);
    if (currentPanel == "pending" && userNotLogged()) setLoginOpen(true);
  }, [currentPanel]);

  async function handleLogin(password, loginResultCallback) {
    const logged = await tryLogin(password, loginResultCallback);

    if (logged) {
      setLoginOpen(false);
    }
  }

  function onCloseLogin() {
    setSelectedPanel("approved");
    setLoginOpen(false);
  }

  return (
    <div className="flex h-screen flex flex-col">
      <Header />
      <main className="flex h-full">
        <Sidebar selectedPanel={selectedPanel} setSelectedPanel={setSelectedPanel} refresh={setRefresh} />
        <div className="w-full max-h-screen overflow-auto transition-all">
          {panels[currentPanel]}
        </div>
      </main>
      <LoginDialog isOpen={loginOpen} onSubmit={handleLogin} onClose={onCloseLogin} />
    </div>
  );
}

export default Home;
