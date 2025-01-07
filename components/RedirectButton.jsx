import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RedirectButton({label="", path, className=""}){
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    function redirectToPage(){
        setIsLoading(true)
        router.push(path);
    }

    return <Button className={className} disabled={isLoading} type="primary" style={{
        marginTop: 'auto'
    }} onClick={redirectToPage}>
        {label}
    </Button>
}