'use client'

import { Input, Select, InputNumber, Button, DatePicker, Card, Form } from "antd";
import React, { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

const defaultFormData = {
  owner: "",
  type: "",
  quantity: 1,
  costCenter: "",
  comments: "",
  targetDate: new Date().toISOString().split('T')[0],
  targetPlace: ""
}

export default function OrderPage() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(defaultFormData);


  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {

    const response = await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify(formData)
    })

    const data = await response.json();
    setFormData(defaultFormData);
    form.resetFields();
  }

  return (
    <main className="grid place-items-center h-screen w-screen bg-[#fafafa]">
      <Card className="w-[350px] shadow-md">
        <h2 className="text-xl text-center font-bold w-full">Novo Pedido</h2>

        <Form
          className="flex flex-col"
          form={form}

          layout={'vertical'}

          onFinish={handleSubmit}>
          {/* Nome do Proprietário */}
          <Form.Item label="Solicitado Por" name="owner">
            <Input
              name="owner"
              size="small"
              value={formData.owner}
              onChange={handleChange}
              placeholder="Ex.: Kenned Ferreira"
            />
          </Form.Item>

          {/* Tipo de Pedido */}
          <Form.Item label="Tipo de Pedido" name="type">
            <div className="flex gap-1">
              <Select
                name="type"
                size="small"
                value={formData.type}
                onChange={(value) => handleChange({ target: { name: 'type', value } })}
                style={{ width: "70%" }}
              >
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

              <InputNumber
                name="quantity"
                size="small"
                value={formData.quantity}
                onChange={(value) => handleChange({ target: { name: 'quantity', value } })}
                min={1}
                max={100}
                placeholder="Ex.: 10"
                style={{ width: "30%" }}
              />
            </div>
          </Form.Item>

          <Form.Item label="Centro de Custo" name="type">
            <Select
              name="costCenter"
              size="small"
              value={formData.costCenter}
              onChange={(value) => handleChange({ target: { name: 'costCenter', value } })}
            >
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
              name="comments"
              size="small"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Ex.: Enviar limões para o churrasco"
              rows={4}
            />
          </Form.Item>

          <Form.Item label="Data da Entrega" name="targetDate">
            <DatePicker
              className="w-full"
              size="small"
              name="targetDate"
              onChange={(date, dateString) => handleChange({ target: { name: 'targetDate', value: dateString } })}
            />
          </Form.Item>

          <Form.Item label="Local da Entrega" name="targetPlace">
            <Input
              name="targetPlace"
              value={formData.targetPlace}
              size="small"
              onChange={handleChange}
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
