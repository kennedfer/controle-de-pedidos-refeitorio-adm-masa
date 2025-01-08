import React from 'react';
import { Input, Select, InputNumber, DatePicker, Form, Button } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const defaultFormData = {
    owner: "",
    type: "",
    quantity: 1,
    costCenter: "",
    comments: "",
    targetPlace: ""
};

export const OrderForm = ({ form, onFinish }) => (

    <Form
        className="flex flex-col"
        form={form}
        layout={'vertical'}
        initialValues={defaultFormData}
        onFinish={onFinish}
    >
        {/* Form Items */}
        <Form.Item
            rules={[
                { required: true, message: 'Favor preencher com o nome do registrante' }
            ]}
            label="Registrado Por"
            name="owner"
        >
            <Input size="small" placeholder="Ex.: Kenned Ferreira" />
        </Form.Item>

        <div className="grid grid-cols-3 gap-1 w-full">
            <Form.Item
                className="col-span-2"
                rules={[
                    { required: true, message: 'Favor selecionar o tipo de pedido' },
                ]}
                label="Tipo de Pedido"
                name="type"
            >

                <Select size="small"
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }

                    options={[
                        { value: "APRESENTACAO MUSICAL", label: "APRESENTAÇÃO MUSICAL" },
                        { value: "CAFE LITRO", label: "CAFÉ LITRO" },
                        { value: "CERVEJA", label: "CERVEJA" },
                        { value: "CHURRASCO", label: "CHURRASCO" },
                        { value: "COFF I", label: "COFF I" },
                        { value: "COFF II", label: "COFF II" },
                        { value: "COFF III", label: "COFF III" },
                        { value: "DESJEJUM", label: "DESJEJUM" },
                        { value: "DESJEJUM ACAMPAMENTO", label: "DESJEJUM ACAMPAMENTO" },
                        { value: "EVENTO", label: "EVENTO" },
                        { value: "LANCHE ESPECIAL", label: "LANCHE ESPECIAL" },
                        { value: "LANCHE TURNO", label: "LANCHE TURNO" },
                        { value: "PICOLE", label: "PICOLE" },
                        { value: "ALMOCO", label: "ALMOÇO" },
                        { value: "JANTAR", label: "JANTAR" }
                    ]}

                />

            </Form.Item>

            <Form.Item
                name="quantity"
                label="Quantidade"
                className="grow-0"
                rules={[
                    { required: true, message: 'Favor preencher a quantidade' }
                ]}
            >
                <InputNumber size="small" min={1} max={100} placeholder="Ex.: 10" className="w-full" />
            </Form.Item>
        </div>

        <Form.Item
            rules={[
                { required: true, message: 'Favor selecionar o centro de custo' }
            ]}
            label="Centro de Custo"
            name="costCenter"
        >
            <Select
                showSearch
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                    { value: "102062-BOMBEAMENTO", label: "102062 - BOMBEAMENTO" },
                    { value: "102101 - GEOLOGIA OPERACIONAL", label: "102101 - GEOLOGIA OPERACIONAL" },
                    { value: "102102 - PLANEJAMENTO E TOPOGRAFIA", label: "102102 - PLANEJAMENTO E TOPOGRAFIA" },
                    { value: "102103 - GEOTECNICA E HIDROLOGIA", label: "102103 - GEOTECNICA E HIDROLOGIA" },
                    { value: "102901 - ADMINISTRACAO DE MINA CEU ABERTO", label: "102901 - ADMINISTRACAO DE MINA CEU ABERTO" },
                    { value: "201011 - BRITAGEM", label: "201011 - BRITAGEM" },
                    { value: "202011 - MOAGEM", label: "202011 - MOAGEM" },
                    { value: "209011 - LIXIVIACAO/CIANETACAO", label: "209011 - LIXIVIACAO/CIANETACAO" },
                    { value: "210012 - DESSORÇÃO(ELUIÇAO)ELETROLISE", label: "210012 - DESSORÇÃO(ELUIÇAO)ELETROLISE" },
                    { value: "211012 - FUNDICAO", label: "211012 - FUNDICAO" },
                    { value: "212025 - DETOX", label: "212025 - DETOX" },
                    { value: "213011 - MANUTECAO ELETRICA", label: "213011 - MANUTECAO ELETRICA" },
                    { value: "213012 - MANUTENCAO MECANICA", label: "213012 - MANUTENCAO MECANICA" },
                    { value: "214011 - BARRAGEM DE REJEITO", label: "214011 - BARRAGEM DE REJEITO" },
                    { value: "290011 - ADMINISTRAÇÃO DA PLANTA", label: "290011 - ADMINISTRAÇÃO DA PLANTA" },
                    { value: "401011 - SEGURANCA", label: "401011 - SEGURANCA" },
                    { value: "401021 - SAUDE", label: "401021 - SAUDE" },
                    { value: "401031 - MEIO AMBIENTE", label: "401031 - MEIO AMBIENTE" },
                    { value: "401061 - GESTAO FUNDIARIA", label: "401061 - GESTAO FUNDIARIA" },
                    { value: "403011 - CONTROLADORIA", label: "403011 - CONTROLADORIA" },
                    { value: "405011 - SEGURANCA PATRIMONIAL", label: "405011 - SEGURANCA PATRIMONIAL" },
                    { value: "405021 - INFORMACAO E TECNOLOGIA", label: "405021 - INFORMACAO E TECNOLOGIA" },
                    { value: "405031 - PURCHASING, SUPPLY AND WAREHOU", label: "405031 - PURCHASING, SUPPLY AND WAREHOU" },
                    { value: "405041 - RECURSOS HUMANOS", label: "405041 - RECURSOS HUMANOS" },
                    { value: "405071 - ADMINISTRACAO GERENCIAMENTO", label: "405071 - ADMINISTRACAO GERENCIAMENTO" },
                    { value: "405072 - ALMOXARIFADO", label: "405072 - ALMOXARIFADO" },
                    { value: "405074 - PCP", label: "405074 - PCP" },
                    { value: "409011 - GERENCIA GERAL", label: "409011 - GERENCIA GERAL" },
                    { value: "601041 - COMUNIDADE", label: "601041 - COMUNIDADE" },
                    { value: "602041 - EXPLORACAO GERENCIAMENTO MINA", label: "602041 - EXPLORACAO GERENCIAMENTO MINA" }
                ]}
                size="small" />
        </Form.Item>

        <Form.Item label="Comentários" name="comments">
            <TextArea size="small" placeholder="Ex.: Enviar limões para o churrasco" rows={4} />
        </Form.Item>

        <Form.Item
            rules={[
                { required: true, message: 'Favor selecionar a data de entrega' }
            ]}
            label="Data da Entrega"
            name="targetDate"
        >
            <DatePicker className="w-full" size="small" />
        </Form.Item>

        <Form.Item
            rules={[
                { required: true, message: 'Favor preencher o local da entrega' }
            ]}
            label="Local da Entrega"
            name="targetPlace"
        >
            <Input size="small" placeholder="Ex.: Sala de Reunião TATAJUBA" />
        </Form.Item>

        <Form.Item>
            <Button size="small" className="w-full" type="primary" htmlType="submit" style={{ marginTop: 10 }}>
                Cadastrar Pedido
            </Button>
        </Form.Item>
    </Form>
);