import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export function NewOrderButton({label=""}){
    const router = useRouter();

    function gotoNewOrderPage(){
        router.push('/pedidos/novo');
    }

    return <Button type="primary" style={{
        marginTop: 'auto'
    }} onClick={gotoNewOrderPage}>
        {label}
        <PlusOutlined />
    </Button>
}