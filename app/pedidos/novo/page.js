'use client'

import React, { useState } from "react";

export default function OrderPage() {
    
  const [formData, setFormData] = useState({
    owner: "",
    type: "apresentacaoMusical",
    quantity: 1,
    costCenter: "",
    notes: "",
    targetDate: new Date().toISOString().split('T')[0]
  });

  
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    console.log(formData);
    const response = await fetch('/api/order',{
        method:'POST',
        body:JSON.stringify(formData)
    })

    const data = await response.json();
    console.log(data)
  }

  return (
    <main className="grid place-items-center h-screen">
      <div className="border p-2 flex flex-col items-center">
        <h2>Novo Pedido</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <input
            className="border w-full"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            placeholder="Ex.: Kenned Ferreira"
          />
          <div className="flex g-1 border">
            <select
              className="grow"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="apresentacaoMusical">APRESENTAÇÃO MUSICAL</option>
              <option value="cafeLitro">CAFÉ LITRO</option>
              <option value="cerveja">CERVEJA</option>
              <option value="churrasco">CHURRASCO</option>
              <option value="coffI">COFF I</option>
              <option value="coffII">COFF II</option>
              <option value="coffIII">COFF III</option>
              <option value="desjejum">DESJEJUM</option>
              <option value="desjejumAcampamento">DESJEJUM ACAMPAMENTO</option>
              <option value="evento">EVENTO</option>
              <option value="lancheEspecial">LANCHE ESPECIAL</option>
              <option value="lancheTurno">LANCHE TURNO</option>
              <option value="picole">PICOLE</option>
              <option value="jantar">JANTAR</option>
              <option value="almoco">ALMOÇO</option>
            </select>
            <input
              className="grow-0"
              type="number"
              id="quantity"
              name="quantity"
              min={1}
              max={100}
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Ex.: 10"
            />
          </div>
          <input
            className="w-full border"
            id="cost-center"
            name="costCenter"
            value={formData.costCenter}
            onChange={handleChange}
            placeholder="Ex.: RH, BARRAGEM"
          />
          <textarea
            className="border"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ex.: Enviar limões para o churrasco"
          />
          <input name="targetDate" value={formData.targetDate} className="border" type="date" onChange={handleChange}/>
          <button className="border" type="submit">
            Cadastrar Pedido
          </button>
        </form>
      </div>
    </main>
  );
}
