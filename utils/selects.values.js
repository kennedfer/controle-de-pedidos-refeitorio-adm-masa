import { MenuItem } from "@blueprintjs/core";

/**
 * @typedef {Object} SelectOption
 * @property {string} value - Valor único da opção
 * @property {string} label - Texto de exibição da opção
 * @property {string} details - Informações adicionais da opção
 */

/**
 * Constantes para formatação
 */
const CONSTANTS = {
  CURRENCY: {
    LOCALE: "pt-BR",
    CURRENCY: "BRL",
  },
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
  },
};

/**
 * Centros de custo disponíveis
 * @type {SelectOption[]}
 */
export const costCenterOptions = [
  {
    value: "102062-BOMBEAMENTO",
    details: "102062",
    label: "BOMBEAMENTO",
  },
  // ... (resto das opções)
].map((option) => ({
  ...option,
  searchText: `${option.details} ${option.label}`.toLowerCase(),
}));

/**
 * Tipos de refeição disponíveis com seus valores
 * @type {SelectOption[]}
 */
export const mealTypeOptions = [
  {
    value: "APRESENTACAO MUSICAL",
    label: "APRESENTAÇÃO MUSICAL",
    details: "R$ 2.706,53",
    price: 2706.53,
  },
  // ... (resto das opções)
].map((option) => ({
  ...option,
  searchText: `${option.label} ${option.details}`.toLowerCase(),
  price: parseFloat(option.details.replace("R$ ", "").replace(",", ".")),
}));

/**
 * Formata um valor monetário para o formato brasileiro
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado como moeda
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat(CONSTANTS.CURRENCY.LOCALE, {
    style: "currency",
    currency: CONSTANTS.CURRENCY.CURRENCY,
  }).format(value);
};

/**
 * Renderiza uma opção no select
 * @param {SelectOption} option - Opção a ser renderizada
 * @param {Object} props - Propriedades do MenuItem
 * @returns {JSX.Element}
 */
export const renderSelectOption = (
  option,
  { handleClick, _, modifiers, _ },
) => {
  if (!option) return null;

  return (
    <MenuItem
      active={modifiers.active}
      text={option.label}
      key={option.value}
      roleStructure="listoption"
      onClick={handleClick}
      label={option.details}
      title={`${option.label} - ${option.details}`}
    />
  );
};

/**
 * Filtra opções baseado na consulta do usuário
 * @param {string} query - Texto de busca
 * @param {SelectOption} option - Opção a ser filtrada
 * @returns {boolean}
 */
export const filterSelectOption = (query, option, _index, exactMatch) => {
  if (!query || query.length < CONSTANTS.SEARCH.MIN_QUERY_LENGTH) return true;
  if (!option || !option.searchText) return false;

  const normalizedQuery = query.toLowerCase().trim();
  return option.searchText.includes(normalizedQuery);
};

/**
 * Encontra uma opção pelo seu valor
 * @param {SelectOption[]} options - Lista de opções
 * @param {string} value - Valor a ser encontrado
 * @returns {SelectOption|undefined}
 */
export const findOptionByValue = (options, value) => {
  return options.find((option) => option.value === value);
};

/**
 * Calcula o valor total baseado na quantidade e tipo de refeição
 * @param {string} mealType - Tipo de refeição
 * @param {number} quantity - Quantidade
 * @returns {string} Valor total formatado
 */
export const calculateMealTotal = (mealType, quantity) => {
  const option = findOptionByValue(mealTypeOptions, mealType);
  if (!option || !option.price) return formatCurrency(0);

  return formatCurrency(option.price * quantity);
};

/**
 * Agrupa opções por categoria
 * @param {SelectOption[]} options - Lista de opções
 * @param {string} categoryKey - Chave para agrupamento
 * @returns {Object} Opções agrupadas
 */
export const groupOptions = (options, categoryKey = "details") => {
  return options.reduce((groups, option) => {
    const category = option[categoryKey].split("-")[0].trim();
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(option);
    return groups;
  }, {});
};
