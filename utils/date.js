/**
 * Formata uma data para o padrão brasileiro com o nome completo do mês.
 *
 * @function formatDate
 * @param {Date} date - Objeto de data a ser formatado.
 * @returns {string} Uma string formatada no padrão "dia de mês" (exemplo: "25 de janeiro").
 *
 * @throws {TypeError} Lança um erro se o parâmetro fornecido não for um objeto `Date`.
 */
export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    throw new TypeError("O parâmetro deve ser um objeto Date.");
  }

  return date.toLocaleDateString("pt-BR", { month: "long", day: "numeric" });
};
