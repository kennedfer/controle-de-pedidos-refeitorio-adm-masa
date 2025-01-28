"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Spinner, NonIdealState } from "@blueprintjs/core";

import { Sidebar } from "../components/Sidebar";
import { PendingPanel } from "../components/PendingPanel";
import { ApprovedPanel } from "../components/ApprovedPanel";
import { LoginDialog } from "../components/LoginDialog";
import { Header } from "../components/Header";

import { calculateCurrentPeriod } from "../utils/period";
import { tryLogin, userNotLogged } from "../utils/login";

/**
 * Configurações da página
 */
const PAGE_CONFIG = {
  PANELS: {
    PENDING: "pending",
    APPROVED: "approved",
  },
  MESSAGES: {
    ERROR: "Erro ao carregar a página",
    LOADING: "Carregando...",
  },
};

/**
 * Hook para gerenciar autenticação
 */
function useAuth() {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleLogin = useCallback(async (password, callback) => {
    try {
      const logged = await tryLogin(password, callback);
      if (logged) {
        setLoginDialogOpen(false);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      callback(false);
    }
  }, []);

  return {
    isLoginDialogOpen,
    setLoginDialogOpen,
    handleLogin,
  };
}

/**
 * Hook para gerenciar painéis
 */
function usePanels(period, setPeriod, refresh, setRefresh) {
  const [selectedPanel, setSelectedPanel] = useState(
    PAGE_CONFIG.PANELS.APPROVED,
  );

  // Memoiza os painéis
  const panels = useMemo(
    () => ({
      [PAGE_CONFIG.PANELS.PENDING]: (
        <PendingPanel refresh={refresh} setRefresh={setRefresh} />
      ),
      [PAGE_CONFIG.PANELS.APPROVED]: (
        <ApprovedPanel period={period} setPeriod={setPeriod} />
      ),
    }),
    [period, setPeriod, refresh, setRefresh],
  );

  return {
    selectedPanel,
    setSelectedPanel,
    panels,
  };
}

/**
 * Componente principal da página
 */
function Home() {
  // Estados
  const [period, setPeriod] = useState(calculateCurrentPeriod());
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hooks customizados
  const { isLoginDialogOpen, setLoginDialogOpen, handleLogin } = useAuth();

  const { selectedPanel, setSelectedPanel, panels } = usePanels(
    period,
    setPeriod,
    refresh,
    setRefresh,
  );

  // Efeito para verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (selectedPanel === PAGE_CONFIG.PANELS.PENDING && userNotLogged()) {
          setLoginDialogOpen(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [selectedPanel, setLoginDialogOpen]);

  // Handlers
  const handleCloseLogin = useCallback(() => {
    setSelectedPanel(PAGE_CONFIG.PANELS.APPROVED);
    setLoginDialogOpen(false);
  }, [setLoginDialogOpen]);

  const handleRefresh = useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <Spinner size={50} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <NonIdealState
        icon="error"
        title={PAGE_CONFIG.MESSAGES.ERROR}
        description={error.message}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="flex h-full">
        <Sidebar
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
          onRefresh={handleRefresh}
        />

        {/* Painel Atual */}
        <div className="w-full max-h-screen overflow-auto">
          {panels[selectedPanel]}
        </div>
      </main>

      {/* Diálogo de Login */}
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onSubmit={handleLogin}
        onClose={handleCloseLogin}
      />
    </div>
  );
}

export default Home;
