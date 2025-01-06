import { Modal, Form, Input, Button } from "antd";
import { useEffect, useRef, useState } from "react";

export function LoginDialog() {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        const acessToken = sessionStorage.getItem("token");

        if (acessToken) {
            const acessData = JSON.parse(acessToken);

            if (acessData.password !== "admin2025") {
                setIsOpen(true)
            }
        } else {
            setIsOpen(true)
        }
    }, [])

    function handleLogin(){
        formRef.current.submit();
    }

    return <Modal className="w-[250px]" open={isOpen} closable={false} onOk={handleLogin}
        footer={[
            <Button key="back" type="link">
                Voltar
            </Button>,
            <Button key="submit" htmlType="submit" type="primary">
                Login
            </Button>,
        ]}

    >
        <h3 className="text-center text-xl font-bold">Login</h3>

        <Form
            ref={formRef}
            className="flex flex-col gap-1"
            form={form}
            onFinish={console.log}
            layout="vertical"
        >
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: "Informe seu nome de usuario"
                    }
                ]}
                label="Usuário:" name="username">
                <Input
                    name="username"
                    placeholder="Ex.: kenned.ferreira"
                />
            </Form.Item>

            <Form.Item
                rules={[
                    {
                        required: true,
                        message: "Informe seu nome de usuario"
                    }
                ]}
                label="Senha:" name="password">
                <Input
                    name="password"
                    type="password"
                />
            </Form.Item>
        </Form>
    </Modal>
}