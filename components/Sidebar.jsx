import { Card, Divider, Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import { ButtonsGroup } from "./ButtonsGroup";
import { RedirectButton } from "./RedirectButton";

export function Sidebar({ panelState }) {
  const [selectedPanel, setSelectedPanel] = panelState;

  return (
    <Card compact className="h-screen w-1/6 flex flex-col gap-0">
      <span className="bp5-heading">Pedidos</span>
      <Divider />
      <Tabs className="w-full" fill vertical id="TabsExample">
        <Tab id="aprovados" title="Aprovados" />
        <Tab id="pendentes" title="Pendentes" />
        <TabsExpander />
      </Tabs>
      <RedirectButton label="Novo Pedido" path="/pedidos/novo" />
    </Card>
  );
}
