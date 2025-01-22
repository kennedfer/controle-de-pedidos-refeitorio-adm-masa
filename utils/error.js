/**
 * Função de tratamento centralizado de erros.
 *
 * @param {Error} error O erro lançado pela operação.
 * @param {string} context O contexto da operação que gerou o erro.
 * @throws {Error} Lança um erro com uma mensagem personalizada para o contexto.
 */
export function handleError(error, context) {
  console.error(`${context}:`, error);
  throw new Error(`Erro na operação de ${context}`);
}
