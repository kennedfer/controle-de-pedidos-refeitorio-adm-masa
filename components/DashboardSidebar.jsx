import { Divider, Button, Card} from "antd";
import { ButtonsGroup } from "./ButtonsGroup";
import { RedirectButton } from "./RedirectButton";

export function DashboardSidebar({panelState}){
    const [selectedPanel, setSelectedPanel] = panelState;

    return (
        <div className="border-r h-screen rounded-xl font-bold w-1/5 text-white p-4 flex flex-col gap-2">
            <h3 className="text-gray-500" >Pedidos</h3>
            <ButtonsGroup labels={["Pendentes", "Aprovados", "Reprovados"]} selected={selectedPanel} selectButton={setSelectedPanel}/>
            <RedirectButton label="Novo Pedido" path="/pedidos/novo"/>
        </div>    
    );    
}