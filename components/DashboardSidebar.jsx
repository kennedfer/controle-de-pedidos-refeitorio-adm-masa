import { Divider, Button, Card} from "antd";
import { ButtonsGroup } from "./ButtonsGroup";

export function DashboardSidebar({panelState}){
    const [selectedPanel, setSelectedPanel] = panelState;

    return (
        <div className="border-r rounded-xl font-bold w-1/4 text-white p-4 flex flex-col gap-2">
            <h2 className="text-2xl text-gray-900">Oi Lu,</h2>
            <Divider/>
            <h3 className="text-gray-500" >Pedidos</h3>
            {/* <Button>
                Pendentes
            </Button>
            <Button>
                Aprovados
            </Button> */}

            <ButtonsGroup labels={["Pendentes", "Aprovados"]} selected={selectedPanel} selectButton={setSelectedPanel}/>
        </div>    
    );    
}