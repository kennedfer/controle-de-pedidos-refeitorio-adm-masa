'use client'

import { Input, Select, InputNumber, Button, DatePicker, Card, Form} from "antd";
import React, { useState } from "react";

const { TextArea } = Input;
const {Option} = Select;

const defaultFormData = {
  owner: "",
  type: "apresentacaoMusical",
  quantity: 1,
  costCenter: "",
  notes: "",
  targetDate: new Date().toISOString().split('T')[0]
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
    
    const response = await fetch('/api/order',{
        method:'POST',
        body:JSON.stringify(formData)
    })

    const data = await response.json();
    setFormData(defaultFormData);
    form.resetFields();
  }

  return (
    <main className="grid place-items-center h-screen w-screen">
      <Card className="w-[350px]">
        <h2 className="text-xl text-center font-bold w-full">Novo Pedido</h2>

        <Form 
          className="flex flex-col gap-1"
          form={form}

          layout={'vertical'} 
          
          onFinish={handleSubmit}>
          {/* Nome do Proprietário */}
          <Form.Item label="Solicitado Por" name="owner">
            <Input
              name="owner"
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
                value={formData.type}
                onChange={(value) => handleChange({ target: { name: 'type', value } })}
                style={{ width: "70%" }}
              >
                <Option value="apresentacaoMusical">APRESENTAÇÃO MUSICAL</Option>
                <Option value="cafeLitro">CAFÉ LITRO</Option>
                <Option value="cerveja">CERVEJA</Option>
                <Option value="churrasco">CHURRASCO</Option>
                <Option value="coffI">COFF I</Option>
                <Option value="coffII">COFF II</Option>
                <Option value="coffIII">COFF III</Option>
                <Option value="desjejum">DESJEJUM</Option>
                <Option value="desjejumAcampamento">DESJEJUM ACAMPAMENTO</Option>
                <Option value="evento">EVENTO</Option>
                <Option value="lancheEspecial">LANCHE ESPECIAL</Option>
                <Option value="lancheTurno">LANCHE TURNO</Option>
                <Option value="picole">PICOLE</Option>
                <Option value="jantar">JANTAR</Option>
                <Option value="almoco">ALMOÇO</Option>
              </Select>

              <InputNumber
                name="quantity"
                value={formData.quantity}
                onChange={(value) => handleChange({ target: { name: 'quantity', value } })}
                min={1}
                max={100}
                placeholder="Ex.: 10"
                style={{ width: "30%" }}
              />
            </div>
          </Form.Item>

          {/* Centro de Custo */}
          <Form.Item label="Centro de Custo" name="costCenter">
            <Input
              name="costCenter"
              value={formData.costCenter}
              onChange={handleChange}
              placeholder="Ex.: RH, BARRAGEM"
            />
          </Form.Item>

          {/* Notas */}
          <Form.Item label="Notas" name="notes">
            <TextArea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ex.: Enviar limões para o churrasco"
              rows={4}
            />
          </Form.Item>

          {/* Data Alvo */}
          <Form.Item label="Data Alvo" name="targetDate">
            <DatePicker
              className="w-full"
              name="targetDate"
              onChange={(date, dateString) => handleChange({ target: { name: 'targetDate', value: dateString } })}
            />
          </Form.Item>
          
          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit" style={{ marginTop: 10 }}>
              Cadastrar Pedido
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  );
}
