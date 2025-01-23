import {
  Card,
  Divider,
  Tab,
  Tabs,
  Button,
  TabsExpander,
} from "@blueprintjs/core";
import { useState } from "react";
import { OrderDialog } from "./OrderDialog";

export function Sidebar({ panelState }) {
  const [selectedPanel, setSelectedPanel] = panelState;
  const [dialogState, setDialogState] = useState({
    open: false,
  });

  return (
    <>
      <Card compact className="h-screen w-1/6 flex flex-col gap-0">
        <h4
          style={{
            margin: "0 !important",
          }}
          className="bp5-heading"
        >
          Pedidos
        </h4>
        <Divider />
        <Tabs
          className="w-full flex-grow flex flex-col"
          fill={true}
          id="TabsExample"
          vertical
          onChange={(e) => {
            setSelectedPanel(e);
          }}
        >
          <Tab
            tagContent={1}
            icon="warning-sign"
            id="pending"
            title="Pendentes"
          />

          <Tab icon="tick" id="approveds" title="Aprovados" />
          <TabsExpander />
        </Tabs>
        <OrderDialog dialogState={[dialogState, setDialogState]} />
        <Button
          fill
          intent="primary"
          style={{
            marginTop: "auto",
          }}
          onClick={() =>
            setDialogState({
              open: true,
            })
          }
        >
          Novo Pedido
        </Button>
      </Card>
    </>
  );
}
