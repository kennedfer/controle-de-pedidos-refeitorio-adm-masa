import { Tab, Tabs, Button } from "@blueprintjs/core";
import { useState } from "react";
import { OrderDialog } from "./OrderDialog";

export function Sidebar({ selectedPanel, setSelectedPanel, refresh }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="w-1/6 flex flex-col gap-0 border p-2">
      <Tabs
        className="w-full flex-grow flex flex-col"
        fill={true}
        id="status-tabs"
        selectedTabId={selectedPanel}
        vertical
        onChange={(activeTab) => setSelectedPanel(activeTab)}
      >
        <Tab icon="warning-sign" id="pending" title="Pendentes" />
        <Tab icon="tick" id="approved" title="Aprovados" />
      </Tabs>
      <OrderDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        refresh={refresh}
      />
      <Button
        fill
        intent="primary"
        className="mt-auto"
        onClick={() => setDialogOpen(true)}
      >
        Novo Pedido
      </Button>
    </div>
  );
}
