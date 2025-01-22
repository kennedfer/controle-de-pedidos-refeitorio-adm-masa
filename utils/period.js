/**
 * Calcula o período atual com base na data atual.
 * O período começa no dia 11 de um mês (ou no mês anterior, caso a data atual seja antes do dia 11) e termina no dia 10 do mês seguinte.
 *
 * @returns {Object} Um objeto contendo as datas de início e fim do período.
 * @returns {Date} return.start - A data de início do período (dia 11 ou 11 do mês anterior).
 * @returns {Date} return.end - A data de fim do período (dia 10 do mês seguinte).
 */
export const calculateCurrentPeriod = () => {
    const today = new Date();
    let start = new Date(today.getFullYear(), today.getMonth(), 11);

    //Se o dia de hoje for menor que 11, então o período começa no dia 11 do mês anterior
    if (today.getDate() < 11) {
        start.setMonth(start.getMonth() - 1);
    }

    //o dia final do periodo sempre é o 10 do mês posterior
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);
    end.setDate(10);

    return { start, end };
};
