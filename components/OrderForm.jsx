import React, { useState, useCallback, memo } from "react";
import {
  FormGroup,
  InputGroup,
  Button,
  NumericInput,
  TextArea,
  Divider,
  MenuItem,
  Intent,
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { DatePicker3 } from "@blueprintjs/datetime2";
import { ptBR } from "date-fns/locale";
import PropTypes from "prop-types";

import {
  costCenterOptions,
  filterSelectOption,
  mealTypeOptions,
  renderSelectOption,
} from "../utils/selects.values";

/**
 * Configurações do formulário
 */
const FORM_CONFIG = {
  INITIAL_STATE: {
    owner: "",
    type: "",
    quantity: 1,
    costCenter: "",
    comments: "",
    targetPlace: "",
    targetDate: null,
  },
  LIMITS: {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 100,
    MIN_OWNER_LENGTH: 3,
    MAX_COMMENTS_LENGTH: 500,
  },
  LABELS: {
    REQUIRED: "(obrigatório)",
    SUBMIT: "Cadastrar Pedido",
    NO_RESULTS: "Sem resultados.",
  },
};

/**
 * Validação do formulário
 * @param {Object} data - Dados do formulário
 * @returns {Object} Objeto com erros encontrados
 */
const validateForm = (data) => {
  const errors = {};

  if (!data.owner || data.owner.length < FORM_CONFIG.LIMITS.MIN_OWNER_LENGTH) {
    errors.owner = "Nome deve ter pelo menos 3 caracteres";
  }

  if (!data.type) {
    errors.type = "Selecione um tipo de refeição";
  }

  if (!data.costCenter) {
    errors.costCenter = "Selecione um centro de custo";
  }

  if (!data.targetDate) {
    errors.targetDate = "Selecione uma data";
  }

  if (!data.targetPlace) {
    errors.targetPlace = "Informe o local de entrega";
  }

  return errors;
};

/**
 * Componente de campo de seleção
 */
const SelectField = memo(
  ({ label, items, value, onChange, placeholder, error }) => (
    <FormGroup
      label={label}
      labelInfo={FORM_CONFIG.LABELS.REQUIRED}
      intent={error ? Intent.DANGER : Intent.NONE}
      helperText={error}
    >
      <Select
        fill
        items={items}
        itemRenderer={renderSelectOption}
        onItemSelect={(e) => onChange(e.value)}
        filterable
        itemPredicate={filterSelectOption}
        popoverProps={{ minimal: true }}
        noResults={
          <MenuItem
            disabled
            text={FORM_CONFIG.LABELS.NO_RESULTS}
            roleStructure="listoption"
          />
        }
      >
        <Button
          fill
          alignText="left"
          text={value || placeholder}
          rightIcon="double-caret-vertical"
          intent={error ? Intent.DANGER : Intent.NONE}
        />
      </Select>
    </FormGroup>
  ),
);

/**
 * Componente principal do formulário
 */
export const OrderForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    ...FORM_CONFIG.INITIAL_STATE,
    ...initialData,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler para mudanças nos campos
  const handleInputChange = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  // Handler para submissão
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setFormData(FORM_CONFIG.INITIAL_STATE);
    } catch (error) {
      console.error("Erro ao submeter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 flex-nowrap w-full"
      noValidate
    >
      <div className="flex flex-col flex-grow gap-4">
        {/* Registrado Por */}
        <FormGroup
          label="Registrado Por"
          labelInfo={FORM_CONFIG.LABELS.REQUIRED}
          intent={errors.owner ? Intent.DANGER : Intent.NONE}
          helperText={errors.owner}
        >
          <InputGroup
            id="owner"
            required
            placeholder="Ex.: Kenned Ferreira"
            value={formData.owner}
            onChange={(e) => handleInputChange("owner", e.target.value)}
            intent={errors.owner ? Intent.DANGER : Intent.NONE}
          />
        </FormGroup>

        {/* Tipo de Pedido */}
        <SelectField
          label="Tipo de Pedido"
          items={mealTypeOptions}
          value={formData.type}
          onChange={(value) => handleInputChange("type", value)}
          placeholder="Selecione um tipo de refeição"
          error={errors.type}
        />

        {/* Quantidade */}
        <FormGroup
          label="Quantidade"
          labelInfo={FORM_CONFIG.LABELS.REQUIRED}
          className="grow-0"
        >
          <NumericInput
            min={FORM_CONFIG.LIMITS.MIN_QUANTITY}
            max={FORM_CONFIG.LIMITS.MAX_QUANTITY}
            fill
            value={formData.quantity}
            onValueChange={(value) => handleInputChange("quantity", value)}
          />
        </FormGroup>

        {/* Centro de Custo */}
        <SelectField
          label="Centro de Custo"
          items={costCenterOptions}
          value={formData.costCenter}
          onChange={(value) => handleInputChange("costCenter", value)}
          placeholder="Selecione um Centro de Custo"
          error={errors.costCenter}
        />

        {/* Comentários */}
        <FormGroup label="Comentários">
          <TextArea
            className="w-full"
            placeholder="Ex.: Enviar limões para o churrasco"
            value={formData.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            maxLength={FORM_CONFIG.LIMITS.MAX_COMMENTS_LENGTH}
          />
        </FormGroup>
      </div>

      <Divider />

      <div className="flex-grow flex flex-col gap-4">
        {/* Data da Entrega */}
        <FormGroup
          label="Data da Entrega"
          labelInfo={FORM_CONFIG.LABELS.REQUIRED}
          intent={errors.targetDate ? Intent.DANGER : Intent.NONE}
          helperText={errors.targetDate}
        >
          <DatePicker3
            highlightCurrentDay
            formatDate={(date) => date.toLocaleDateString()}
            parseDate={(str) => new Date(str)}
            locale={ptBR}
            placeholder="Selecione uma data"
            value={formData.targetDate}
            onChange={(date) => handleInputChange("targetDate", date)}
            minDate={new Date()}
            intent={errors.targetDate ? Intent.DANGER : Intent.NONE}
          />
        </FormGroup>

        {/* Local da Entrega */}
        <FormGroup
          label="Local da Entrega"
          labelInfo={FORM_CONFIG.LABELS.REQUIRED}
          intent={errors.targetPlace ? Intent.DANGER : Intent.NONE}
          helperText={errors.targetPlace}
        >
          <InputGroup
            required
            placeholder="Ex.: Sala de Reunião TATAJUBA"
            value={formData.targetPlace}
            onChange={(e) => handleInputChange("targetPlace", e.target.value)}
            intent={errors.targetPlace ? Intent.DANGER : Intent.NONE}
          />
        </FormGroup>

        {/* Botão de Submissão */}
        <Button
          fill
          type="submit"
          intent="primary"
          loading={isSubmitting}
          disabled={Object.keys(errors).length > 0}
          large
        >
          {FORM_CONFIG.LABELS.SUBMIT}
        </Button>
      </div>
    </form>
  );
};

OrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    owner: PropTypes.string,
    type: PropTypes.string,
    quantity: PropTypes.number,
    costCenter: PropTypes.string,
    comments: PropTypes.string,
    targetPlace: PropTypes.string,
    targetDate: PropTypes.instanceOf(Date),
  }),
};

// Exemplo de uso:
/*
function OrderDialog() {
    const handleSubmit = async (formData) => {
        try {
            await submitOrder(formData);
            // Sucesso...
        } catch (error) {
            // Erro...
        }
    };

    return (
        <OrderForm
            onSubmit={handleSubmit}
            initialData={{
                owner: "Kenned Ferreira",
                quantity: 1
            }}
        />
    );
}
*/
