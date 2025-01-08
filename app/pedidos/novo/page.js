'use client'

import { Input, Select, InputNumber, Button, DatePicker, Card, Form, message } from "antd";
import React from "react";
import { RedirectButton } from "../../../components/RedirectButton";
import { useToast } from "../../../components/Toast";

const { TextArea } = Input;
const { Option } = Select;

const defaultFormData = {
  owner: "",
  type: "",
  quantity: 1,
  costCenter: "",
  comments: "",
  targetPlace: ""
}

export default function OrderPage() {
  const [form] = Form.useForm();

  const [Toast, contextHolder] = useToast();


  async function handleSubmit(values) {
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(values)
      });

      const data = await response.json();
      console.log(data)
      Toast.success("Pedido realizado com sucesso!");

      form.resetFields();
    } catch (err) {
      Toast.error(Toast.INTERNET_ERROR_MESSAGE)
    }
  }

  return (
    <main className="grid place-items-center h-screen w-screen bg-[#fafafa]">
      {contextHolder}

      <RedirectButton path="/pedidos" label="Voltar" size="small" className="absolute top-2 left-2" />

      <Card className="w-[350px] shadow-md">
        <h2 className="text-xl text-center font-bold w-full">Novo Pedido</h2>

        <Form
          className="flex flex-col"
          form={form}
          layout={'vertical'}
          initialValues={defaultFormData}
          onFinish={handleSubmit}
        >
          <Form.Item
            rules={[
              { required: true, message: 'Favor preencher com o nome do registrante' }
            ]}
            label="Registrado Por"
            name="owner"
          >
            <Input
              size="small"
              placeholder="Ex.: Kenned Ferreira"
            />
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
              <Select size="small">
                <Option value="APRESENTACAO MUSICAL">APRESENTAÇÃO MUSICAL</Option>
                <Option value="CAFE LITRO">CAFÉ LITRO</Option>
                <Option value="CERVEJA">CERVEJA</Option>
                <Option value="CHURRASCO">CHURRASCO</Option>
                <Option value="COFF I">COFF I</Option>
                <Option value="COFF II">COFF II</Option>
                <Option value="COFF III">COFF III</Option>
                <Option value="DESJEJUM">DESJEJUM</Option>
                <Option value="DESJEJUM ACAMPAMENTO">DESJEJUM ACAMPAMENTO</Option>
                <Option value="EVENTO">EVENTO</Option>
                <Option value="LANCHE ESPECIAL">LANCHE ESPECIAL</Option>
                <Option value="LANCHE TURNO">LANCHE TURNO</Option>
                <Option value="PICOLE">PICOLE</Option>
                <Option value="ALMOCO">ALMOÇO</Option>
                <Option value="JANTAR">JANTAR</Option>
              </Select>
            </Form.Item>

            <Form.Item name="quantity" label="Quantidade" className="grow-0" rules={[
              { required: true, message: 'Favor preencher a quantidade' }
            ]}>
              <InputNumber
                size="small"
                min={1}
                max={100}
                placeholder="Ex.: 10"
                className="w-full"
              />
            </Form.Item>
          </div>

          <Form.Item
            rules={[
              { required: true, message: 'Favor selecionar o centro de custo' }
            ]}
            label="Centro de Custo"
            name="costCenter"
          >
            <Select size="small">
              <Option value="102062-BOMBEAMENTO">102062 - BOMBEAMENTO</Option>
              <Option value="102101 - GEOLOGIA OPERACIONAL">102101 - GEOLOGIA OPERACIONAL</Option>
              <Option value="102102 - PLANEJAMENTO E TOPOGRAFIA">102102 - PLANEJAMENTO E TOPOGRAFIA</Option>
              <Option value="102103 - GEOTECNICA E HIDROLOGIA">102103 - GEOTECNICA E HIDROLOGIA</Option>
              <Option value="102901 - ADMINISTRACAO DE MINA CEU ABERTO">102901 - ADMINISTRACAO DE MINA CEU ABERTO</Option>
              <Option value="201011 - BRITAGEM">201011 - BRITAGEM</Option>
              <Option value="202011 - MOAGEM">202011 - MOAGEM</Option>
              <Option value="209011 - LIXIVIACAO/CIANETACAO">209011 - LIXIVIACAO/CIANETACAO</Option>
              <Option value="210012 - DESSORÇÃO(ELUIÇAO)ELETROLISE">210012 - DESSORÇÃO(ELUIÇAO)ELETROLISE</Option>
              <Option value="211012 - FUNDICAO">211012 - FUNDICAO</Option>
              <Option value="212025 - DETOX">212025 - DETOX</Option>
              <Option value="213011 - MANUTECAO ELETRICA">213011 - MANUTECAO ELETRICA</Option>
              <Option value="213012 - MANUTENCAO MECANICA">213012 - MANUTENCAO MECANICA</Option>
              <Option value="214011 - BARRAGEM DE REJEITO">214011 - BARRAGEM DE REJEITO</Option>
              <Option value="290011 - ADMINISTRAÇÃO DA PLANTA">290011 - ADMINISTRAÇÃO DA PLANTA</Option>
              <Option value="401011 - SEGURANCA">401011 - SEGURANCA</Option>
              <Option value="401021 - SAUDE">401021 - SAUDE</Option>
              <Option value="401031 - MEIO AMBIENTE">401031 - MEIO AMBIENTE</Option>
              <Option value="401061 - GESTAO FUNDIARIA">401061 - GESTAO FUNDIARIA</Option>
              <Option value="403011 - CONTROLADORIA">403011 - CONTROLADORIA</Option>
              <Option value="405011 - SEGURANCA PATRIMONIAL">405011 - SEGURANCA PATRIMONIAL</Option>
              <Option value="405021 - INFORMACAO E TECNOLOGIA">405021 - INFORMACAO E TECNOLOGIA</Option>
              <Option value="405031 - PURCHASING, SUPPLY AND WAREHOU">405031 - PURCHASING, SUPPLY AND WAREHOU</Option>
              <Option value="405041 - RECURSOS HUMANOS">405041 - RECURSOS HUMANOS</Option>
              <Option value="405071 - ADMINISTRACAO GERENCIAMENTO">405071 - ADMINISTRACAO GERENCIAMENTO</Option>
              <Option value="405072 - ALMOXARIFADO">405072 - ALMOXARIFADO</Option>
              <Option value="405074 - PCP">405074 - PCP</Option>
              <Option value="409011 - GERENCIA GERAL">409011 - GERENCIA GERAL</Option>
              <Option value="601041 - COMUNIDADE">601041 - COMUNIDADE</Option>
              <Option value="602041 - EXPLORACAO GERENCIAMENTO MINA">602041 - EXPLORACAO GERENCIAMENTO MINA</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Comentários" name="comments">
            <TextArea
              size="small"
              placeholder="Ex.: Enviar limões para o churrasco"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: 'Favor selecionar a data de entrega' }
            ]}
            label="Data da Entrega"
            name="targetDate"
          >
            <DatePicker
              className="w-full"
              size="small"
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: 'Favor preencher o local da entrega' }
            ]}
            label="Local da Entrega"
            name="targetPlace"
          >
            <Input
              size="small"
              placeholder="Ex.: Sala de Reunião TATAJUBA"
            />
          </Form.Item>

          <Form.Item>
            <Button size="small" className="w-full" type="primary" htmlType="submit" style={{ marginTop: 10 }}>
              Cadastrar Pedido
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  );
}