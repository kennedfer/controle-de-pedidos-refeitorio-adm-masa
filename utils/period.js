const PERIOD_START_DAY = 11;
const PERIOD_END_DAY = 10;

/**
 * Calcula o período atual com base na data atual.
 * O período começa no dia 11 de um mês (ou no mês anterior, caso a data atual seja antes do dia 11)
 * e termina no dia 10 do mês seguinte.
 *
 * @param {Date} [referenceDate=new Date()] - Data de referência para cálculo do período
 * @returns {Object} Um objeto contendo as datas de início e fim do período
 * @returns {Date} return.start - A data de início do período (dia 11 ou 11 do mês anterior)
 * @returns {Date} return.end - A data de fim do período (dia 10 do mês seguinte)
 * @throws {Error} Se a data de referência for inválida
 */
export const calculateCurrentPeriod = (referenceDate = new Date()) => {
    if (!(referenceDate instanceof Date) || isNaN(referenceDate)) {
        throw new Error("Data de referência inválida");
    }

    const today = new Date(referenceDate);

    const startMonth =
        today.getDate() < PERIOD_END_DAY
            ? today.getMonth() - 1
            : today.getMonth();

    const start = new Date(today.getFullYear(), startMonth, PERIOD_END_DAY);
    const end = new Date(today.getFullYear(), startMonth + 1, PERIOD_START_DAY);

    // Retorna objeto com datas imutáveis
    return {
        start: new Date(start),
        end: new Date(end),
    };
};
