/**
 * Configurações para formatação de datas
 * @readonly
 */
const DATE_CONFIG = {
  LOCALE: "pt-BR",
  FORMATS: {
    SHORT: { month: "long", day: "numeric" },
    LONG: { month: "long", day: "numeric", year: "numeric" },
    FULL: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  },
  MONTHS: [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ],
};

/**
 * Cache de formatadores para melhor performance
 * @type {Object.<string, Intl.DateTimeFormat>}
 */
const formattersCache = {};

/**
 * Obtém um formatador de data do cache ou cria um novo
 * @private
 * @param {string} key - Chave do formatador
 * @param {Object} options - Opções de formatação
 * @returns {Intl.DateTimeFormat}
 */
const getFormatter = (key, options) => {
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.DateTimeFormat(DATE_CONFIG.LOCALE, options);
  }
  return formattersCache[key];
};

/**
 * Verifica se uma data é válida
 * @private
 * @param {Date} date - Data a ser verificada
 * @returns {boolean}
 */
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

/**
 * Formata uma data para o padrão brasileiro
 * @param {Date} date - Data a ser formatada
 * @param {Object} options - Opções de formatação
 * @param {('SHORT'|'LONG'|'FULL')} [options.format='SHORT'] - Formato desejado
 * @param {boolean} [options.capitalize=true] - Capitalizar primeira letra
 * @returns {string} Data formatada
 * @throws {TypeError} Se o parâmetro não for um objeto Date válido
 */
export const formatDate = (date, options = {}) => {
  // Validação da entrada
  if (!(date instanceof Date)) {
    throw new TypeError("O parâmetro deve ser um objeto Date");
  }

  if (!isValidDate(date)) {
    throw new TypeError("Data inválida");
  }

  const { format = "SHORT", capitalize = true } = options;

  try {
    // Obtém o formatador apropriado
    const formatter = getFormatter(
      format,
      DATE_CONFIG.FORMATS[format] || DATE_CONFIG.FORMATS.SHORT,
    );

    // Formata a data
    let formatted = formatter.format(date);

    // Adiciona "de" entre dia e mês se necessário
    if (!formatted.includes(" de ")) {
      const parts = formatted.split(" ");
      formatted = parts.join(" de ");
    }

    // Capitaliza se necessário
    return capitalize
      ? formatted.charAt(0).toUpperCase() + formatted.slice(1)
      : formatted;
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    // Fallback para formato básico
    return date.toLocaleDateString(DATE_CONFIG.LOCALE);
  }
};

/**
 * Formata uma data relativa (hoje, ontem, etc)
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data formatada
 */
export const formatRelativeDate = (date) => {
  if (!isValidDate(date)) {
    throw new TypeError("Data inválida");
  }

  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Hoje";
  } else if (diffDays === 1) {
    return "Ontem";
  } else if (diffDays <= 7) {
    return `Há ${diffDays} dias`;
  }

  return formatDate(date);
};

/**
 * Formata uma data para exibição em interface
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data formatada com hora
 */
export const formatDateTime = (date) => {
  if (!isValidDate(date)) {
    throw new TypeError("Data inválida");
  }

  const formatter = getFormatter("datetime", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(date);
};
