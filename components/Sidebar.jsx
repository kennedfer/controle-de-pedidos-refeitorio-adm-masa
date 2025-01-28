import { Tab, Tabs, Button } from "@blueprintjs/core";
import { useState, memo } from "react";
import { OrderDialog } from "./OrderDialog";
import PropTypes from "prop-types";

/**
 * Configurações da barra lateral
 */
const SIDEBAR_CONFIG = {
  PANELS: {
    PENDING: {
      id: "pending",
      title: "Pendentes",
      icon: "warning-sign",
      intent: "warning",
    },
    APPROVED: {
      id: "approved",
      title: "Aprovados",
      icon: "tick",
      intent: "success",
    },
  },
  NEW_ORDER: {
    text: "Novo Pedido",
    icon: "plus",
    intent: "primary",
  },
};

/**
 * Componente de barra lateral com tabs de status e botão de novo pedido
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} props.selectedPanel - ID do painel selecionado
 * @param {Function} props.setSelectedPanel - Função para alterar o painel
 * @param {Function} props.refresh - Função para atualizar os dados
 */
function SidebarComponent({ selectedPanel, setSelectedPanel, refresh }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  /**
   * Manipula a abertura do diálogo
   */
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  /**
   * Manipula o fechamento do diálogo
   */
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  /**
   * Manipula a mudança de tab
   */
  const handleTabChange = (activeTab) => {
    setSelectedPanel(activeTab);
  };

  return (
    <aside
      className="w-1/6 flex flex-col gap-0 border p-2 min-h-screen bg-white"
      aria-label="Status dos pedidos"
    >
      <Tabs
        className="w-full flex-grow flex flex-col"
        fill={true}
        id="status-tabs"
        selectedTabId={selectedPanel}
        vertical
        onChange={handleTabChange}
        animate={true}
      >
        {Object.values(SIDEBAR_CONFIG.PANELS).map((panel) => (
          <Tab
            key={panel.id}
            id={panel.id}
            icon={panel.icon}
            title={panel.title}
            intent={selectedPanel === panel.id ? panel.intent : undefined}
            aria-label={`Ver pedidos ${panel.title.toLowerCase()}`}
          />
        ))}
      </Tabs>

      <OrderDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        refresh={refresh}
        aria-label="Formulário de novo pedido"
      />

      <Button
        fill
        large
        intent={SIDEBAR_CONFIG.NEW_ORDER.intent}
        icon={SIDEBAR_CONFIG.NEW_ORDER.icon}
        className="mt-auto shadow-sm hover:shadow-md transition-shadow"
        onClick={handleOpenDialog}
        aria-label={SIDEBAR_CONFIG.NEW_ORDER.text}
      >
        {SIDEBAR_CONFIG.NEW_ORDER.text}
      </Button>
    </aside>
  );
}

// PropTypes para validação
SidebarComponent.propTypes = {
  selectedPanel: PropTypes.oneOf(
    Object.values(SIDEBAR_CONFIG.PANELS).map((panel) => panel.id),
  ).isRequired,
  setSelectedPanel: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

// Memoização do componente
export const Sidebar = memo(SidebarComponent);

// Exemplo de uso:
/*
function App() {
    const [selectedPanel, setSelectedPanel] = useState('pending');
    const refresh = () => {
        // Lógica de atualização
    };

    return (
        <div className="flex">
            <Sidebar
                selectedPanel={selectedPanel}
                setSelectedPanel={setSelectedPanel}
                refresh={refresh}
            />
            ...
        </div>
    );
}
*/
