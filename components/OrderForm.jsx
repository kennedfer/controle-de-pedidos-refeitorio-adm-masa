import React from "react";

import {
  FormGroup,
  InputGroup,
  Button,
  NumericInput,
  TextArea,
  HTMLSelect,
  Divider,
  MenuItem,
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { DateInput3, DatePicker3 } from "@blueprintjs/datetime2";
import { ptBR } from "date-fns/locale";

const defaultFormData = {
  owner: "",
  type: "",
  quantity: 1,
  costCenter: "",
  comments: "",
  targetPlace: "",
};

// Exemplo de opção para o Select
const typeOptions = [
  { value: "APRESENTACAO MUSICAL", label: "APRESENTAÇÃO MUSICAL" },
  { value: "CAFE LITRO", label: "CAFÉ LITRO" },
  // Adicione outras opções aqui...
];

const costCenterOptions = [
  { value: "102062-BOMBEAMENTO", label: "102062 - BOMBEAMENTO" },
  {
    value: "102101-GEOLOGIA OPERACIONAL",
    label: "102101 - GEOLOGIA OPERACIONAL",
  },
  // Adicione outras opções aqui...
];

// Custom render para opções
const renderOption = (option, { handleClick }) => (
  <MenuItem text={option.label} key={option.value} onClick={handleClick} />
);

export const OrderForm = ({ form, onFinish }) => {
  const [formData, setFormData] = React.useState(defaultFormData);

  const handleCostCenterChange = (item) => {
    console.log("Centro de custo selecionado:", item.value);
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFinish(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-nowrap gap-3">
      {/* Registrado Por */}
      <div className="flex flex-col w-full">
        <FormGroup
          label="Registrado Por"
          labelFor="owner"
          labelInfo="(obrigatório)"
        >
          <InputGroup
            id="owner"
            placeholder="Ex.: Kenned Ferreira"
            value={formData.owner || ""}
            onChange={(e) => handleInputChange("owner", e.target.value)}
          />
        </FormGroup>

        {/* Tipo de Pedido e Quantidade */}
        {/* <div className="grid grid-cols-3 gap-1 w-full"> */}
        <FormGroup
          label="Tipo de Pedido"
          labelFor="type"
          labelInfo="(obrigatório)"
          className="col-span-2"
        >
          <HTMLSelect
            id="type"
            fill
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
              { value: "JANTAR", label: "JANTAR" },
            ]}
            value={formData.type || ""}
            onChange={(e) => handleInputChange("type", e.target.value)}
          />
        </FormGroup>

        <FormGroup
          label="Quantidade"
          labelFor="quantity"
          labelInfo="(obrigatório)"
          className="grow-0"
        >
          <NumericInput
            id="quantity"
            min={1}
            max={100}
            fill
            value={formData.quantity || ""}
            onValueChange={(value) => handleInputChange("quantity", value)}
          />
        </FormGroup>
        {/* </div> */}

        {/* Centro de Custo */}
        <FormGroup
          label="Centro de Custo"
          labelFor="costCenter"
          labelInfo="(obrigatório)"
        >
          <Select
            fill
            items={costCenterOptions}
            itemRenderer={renderOption}
            onItemSelect={(e) => handleInputChange("costCenter", e.value)}
            filterable
            popoverProps={{ minimal: true }}
          >
            <Button
              fill
              alignText="left"
              text={formData.costCenter || "Selecione um Centro de Custo"}
              rightIcon="double-caret-vertical"
            />
          </Select>
        </FormGroup>

        {/* Comentários */}
        <FormGroup label="Comentários" labelFor="comments">
          <TextArea
            className="!w-full"
            id="comments"
            placeholder="Ex.: Enviar limões para o churrasco"
            value={formData.comments || ""}
            onChange={(e) => handleInputChange("comments", e.target.value)}
          />
        </FormGroup>

        {/* Data da Entrega */}
      </div>
      <Divider />
      <div className="flex flex-col w-full">
        <FormGroup
          label="Data da Entrega"
          labelFor="targetDate"
          labelInfo="(obrigatório)"
        >
          <DatePicker3
            id="targetDate"
            highlightCurrentDay={true}
            formatDate={(date) => date.toLocaleDateString()}
            parseDate={(str) => new Date(str)}
            locale={ptBR}
            placeholder="Selecione uma data"
            value={formData.targetDate || null}
            onChange={(date) => handleInputChange("targetDate", date)}
          />
        </FormGroup>

        {/* Local da Entrega */}
        <FormGroup
          label="Local da Entrega"
          labelFor="targetPlace"
          labelInfo="(obrigatório)"
        >
          <InputGroup
            id="targetPlace"
            placeholder="Ex.: Sala de Reunião TATAJUBA"
            value={formData.targetPlace || ""}
            onChange={(e) => handleInputChange("targetPlace", e.target.value)}
          />
        </FormGroup>

        {/* Botão de Submissão */}
        <Button fill type="submit" intent="primary">
          Cadastrar Pedido
        </Button>
      </div>
    </form>
  );
};
