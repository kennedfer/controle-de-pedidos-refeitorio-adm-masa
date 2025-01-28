import React from "react";
import {
  FormGroup,
  InputGroup,
  Button,
  NumericInput,
  TextArea,
  Divider,
  MenuItem,
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { DatePicker3 } from "@blueprintjs/datetime2";
import { ptBR } from "date-fns/locale";

import {
  costCenterOptions,
  filterSelectOption,
  mealTypeOptions,
  renderSelectOption,
} from "../utils/selects.values";

const defaultFormData = {
  owner: "",
  type: "",
  quantity: 1,
  costCenter: "",
  comments: "",
  targetPlace: "",
  targetDate: null,
};

export const OrderForm = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState(defaultFormData);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 flex-nowrap w-full">
      <div className="flex flex-col flex-grow">
        {/* Registrado Por */}
        <FormGroup
          label="Registrado Por"
          labelFor="owner"
          labelInfo="(obrigatório)"
        >
          <InputGroup
            id="owner"
            required
            placeholder="Ex.: Kenned Ferreira"
            value={formData.owner}
            onChange={(e) => handleInputChange("owner", e.target.value)}
          />
        </FormGroup>

        {/* Tipo de Pedido */}
        <FormGroup
          label="Tipo de Pedido"
          labelFor="type"
          labelInfo="(obrigatório)"
        >
          <Select
            fill
            items={mealTypeOptions}
            itemRenderer={renderSelectOption}
            onItemSelect={(e) => handleInputChange("type", e.value)}
            filterable
            itemPredicate={filterSelectOption}
            popoverProps={{ minimal: true }}
            noResults={
              <MenuItem
                disabled={true}
                text="Sem resultados."
                roleStructure="listoption"
              />
            }
          >
            <Button
              fill
              alignText="left"
              text={formData.type || "Selecione um tipo de refeição"}
              rightIcon="double-caret-vertical"
            />
          </Select>
        </FormGroup>

        {/* Quantidade */}
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
            value={formData.quantity}
            onValueChange={(value) => handleInputChange("quantity", value)}
          />
        </FormGroup>

        {/* Centro de Custo */}
        <FormGroup
          label="Centro de Custo"
          labelFor="costCenter"
          labelInfo="(obrigatório)"
        >
          <Select
            fill
            items={costCenterOptions}
            itemRenderer={renderSelectOption}
            itemPredicate={filterSelectOption}
            onItemSelect={(e) => handleInputChange("costCenter", e.value)}
            filterable
            popoverProps={{ minimal: true }}
            noResults={
              <MenuItem
                disabled={true}
                text="Sem resultados."
                roleStructure="listoption"
              />
            }
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
            className="w-full"
            id="comments"
            placeholder="Ex.: Enviar limões para o churrasco"
            value={formData.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
          />
        </FormGroup>
      </div>
      <Divider />
      <div className="flex-grow">
        {/* Data da Entrega */}
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
            value={formData.targetDate}
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
            value={formData.targetPlace}
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
