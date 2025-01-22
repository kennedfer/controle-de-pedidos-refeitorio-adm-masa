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
        <span className="bp5-heading">Pedidos</span>
        <Divider />
        <Tabs
          className="w-full flex-grow flex flex-col"
          fill={true}
          id="TabsExample"
          vertical
        >
          <Tab
            height="100%"
            tagContent={1}
            className="w-full"
            id="aprovados"
            title="Aprovados"
          />
          <Tab id="pendentes" title="Pendentes" />
          <TabsExpander />
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
        </Tabs>
        <OrderDialog dialogState={[dialogState, setDialogState]} />
      </Card>
    </>
  );
}
