import { Card, Form, Input } from "antd";

export function LoginDialog({ handleSubmit }) {
    const [form] = Form.useForm();

    return <Card className="login-dialog w-[250px] shadow-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
        <h3 className="text-center text-xl font-bold">Entrar</h3>

        <Form
            className="flex flex-col gap-1"
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
        >
            <Form.Item
                label="Usuário:" name="username">
                <Input
                    name="username"
                    placeholder="administrativo.masa"
                    disabled
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
    </Card>
}