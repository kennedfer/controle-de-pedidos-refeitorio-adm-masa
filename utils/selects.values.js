import { MenuItem } from "@blueprintjs/core";

export const costCenterOptions = [
  { value: "102062-BOMBEAMENTO", details: "102062", label: "BOMBEAMENTO" },
  {
    value: "102101 - GEOLOGIA OPERACIONAL",
    details: "102101",
    label: "GEOLOGIA OPERACIONAL",
  },
  {
    value: "102102 - PLANEJAMENTO E TOPOGRAFIA",
    details: "102102",
    label: "PLANEJAMENTO E TOPOGRAFIA",
  },
  {
    value: "102103 - GEOTECNICA E HIDROLOGIA",
    details: "102103",
    label: "GEOTECNICA E HIDROLOGIA",
  },
  {
    value: "102901 - ADMINISTRACAO DE MINA CEU ABERTO",
    details: "102901",
    label: "ADMINISTRACAO DE MINA CEU ABERTO",
  },
  { value: "201011 - BRITAGEM", details: "201011", label: "BRITAGEM" },
  { value: "202011 - MOAGEM", details: "202011", label: "MOAGEM" },
  {
    value: "209011 - LIXIVIACAO/CIANETACAO",
    details: "209011",
    label: "LIXIVIACAO/CIANETACAO",
  },
  {
    value: "210012 - DESSORÇÃO(ELUIÇAO)ELETROLISE",
    details: "210012",
    label: "DESSORÇÃO(ELUIÇAO)ELETROLISE",
  },
  { value: "211012 - FUNDICAO", details: "211012", label: "FUNDICAO" },
  { value: "212025 - DETOX", details: "212025", label: "DETOX" },
  {
    value: "213011 - MANUTECAO ELETRICA",
    details: "213011",
    label: "MANUTECAO ELETRICA",
  },
  {
    value: "213012 - MANUTENCAO MECANICA",
    details: "213012",
    label: "MANUTENCAO MECANICA",
  },
  {
    value: "214011 - BARRAGEM DE REJEITO",
    details: "214011",
    label: "BARRAGEM DE REJEITO",
  },
  {
    value: "290011 - ADMINISTRAÇÃO DA PLANTA",
    details: "290011",
    label: "ADMINISTRAÇÃO DA PLANTA",
  },
  { value: "401011 - SEGURANCA", details: "401011", label: "SEGURANCA" },
  { value: "401021 - SAUDE", details: "401021", label: "SAUDE" },
  {
    value: "401031 - MEIO AMBIENTE",
    details: "401031",
    label: "MEIO AMBIENTE",
  },
  {
    value: "401061 - GESTAO FUNDIARIA",
    details: "401061",
    label: "GESTAO FUNDIARIA",
  },
  {
    value: "403011 - CONTROLADORIA",
    details: "403011",
    label: "CONTROLADORIA",
  },
  {
    value: "405011 - SEGURANCA PATRIMONIAL",
    details: "405011",
    label: "SEGURANCA PATRIMONIAL",
  },
  {
    value: "405021 - INFORMACAO E TECNOLOGIA",
    details: "405021",
    label: "INFORMACAO E TECNOLOGIA",
  },
  {
    value: "405031 - PURCHASING, SUPPLY AND WAREHOU",
    details: "405031",
    label: "PURCHASING, SUPPLY AND WAREHOU",
  },
  {
    value: "405041 - RECURSOS HUMANOS",
    details: "405041",
    label: "RECURSOS HUMANOS",
  },
  {
    value: "405071 - ADMINISTRACAO GERENCIAMENTO",
    details: "405071",
    label: "ADMINISTRACAO GERENCIAMENTO",
  },
  {
    value: "405072 - ALMOXARIFADO",
    details: "405072",
    label: "ALMOXARIFADO",
  },
  { value: "405074 - PCP", details: "405074", label: "PCP" },
  {
    value: "409011 - GERENCIA GERAL",
    details: "409011",
    label: "GERENCIA GERAL",
  },
  { value: "601041 - COMUNIDADE", details: "601041", label: "COMUNIDADE" },
  {
    value: "602041 - EXPLORACAO GERENCIAMENTO MINA",
    details: "602041",
    label: "EXPLORACAO GERENCIAMENTO MINA",
  },
];

export const mealTypeOptions = [
  { value: "APRESENTACAO MUSICAL", label: "APRESENTAÇÃO MUSICAL", details: "R$ 2.706,53" },
  { value: "CAFE LITRO", label: "CAFÉ LITRO", details: "R$ 4,29" },
  { value: "CERVEJA", label: "CERVEJA", details: "R$ 22,37" },
  { value: "CHURRASCO", label: "CHURRASCO", details: "R$ 67,76" },
  { value: "COFF I", label: "COFF I", details: "R$ 13,27" },
  { value: "COFF II", label: "COFF II", details: "R$ 16,47" },
  { value: "COFF III", label: "COFF III", details: "R$ 17,95" },
  { value: "DESJEJUM", label: "DESJEJUM", details: "R$ 20,11" },
  { value: "DESJEJUM ACAMPAMENTO", label: "DESJEJUM ACAMPAMENTO", details: "R$ 29,77" },
  { value: "EVENTO", label: "EVENTO", details: "R$ 83,23" },
  { value: "LANCHE ESPECIAL", label: "LANCHE ESPECIAL", details: "R$ 37,96" },
  { value: "LANCHE TURNO", label: "LANCHE TURNO", details: "R$ 12,02" },
  { value: "PICOLE", label: "PICOLE", details: "R$ 4,05" },
  { value: "ALMOCO", label: "ALMOÇO", details: "R$ 21,45" },
  { value: "JANTAR", label: "JANTAR", details: "R$ 21,45" }
];

// Função personalizada para renderizar opções
export const renderSelectOption = (
  option,
  { handleClick, handleFocus, modifiers, query }
) => (
  <MenuItem
    active={modifiers.active}
    text={option.label}
    key={option.value}
    roleStructure="listoption"
    onClick={handleClick}
    label={option.details}
  />
);

export const filterSelectOption = (query, option, _index, exactMatch) => {
  const normalizedValue = option.value.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  return normalizedValue.includes(normalizedQuery);
};