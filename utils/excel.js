import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { formatDate } from "./date";

/**
 * Exporta uma lista de pedidos para um arquivo Excel.
 * A função cria uma planilha com as informações fornecidas e gera um arquivo Excel (.xlsx) contendo esses dados.
 *
 * @async
 * @function exportToExcelFile
 * @param {{ start: Date, end: Date }} period - Objeto contendo as datas de início e fim do período.
 * @param {Array<Object>} orders - Lista de objetos contendo os pedidos a serem exportados. Cada objeto deve conter as propriedades:
 *   - `owner` (string): Nome do solicitante do pedido.
 *   - `type` (string): Tipo do pedido.
 *   - `quantity` (number): Quantidade do item pedido.
 *   - `costCenter` (string): Centro de custo associado ao pedido.
 *   - `price` (number): Valor do pedido.
 *   - `targetDate` (Date): Data de entrega do pedido.
 *   - `notes` (string): Detalhes ou observações sobre o pedido.
 * @returns {Promise<void>} Retorna uma promessa que, quando resolvida, indica que o arquivo Excel foi gerado com sucesso.
 */
export async function exportToExcelFile(period, orders) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Dados");

    // Definindo colunas
    worksheet.columns = [
        { header: "Solicitado por", key: "owner", width: 20 },
        { header: "Tipo de Pedido", key: "type", width: 20 },
        { header: "Quantidade (Unidade)", key: "quantity", width: 20 },
        { header: "Centro de Custo", key: "costCenter", width: 20 },
        { header: "Valor do Pedido", key: "price", width: 20 },
        { header: "Data da Entrega", key: "targetDate", width: 20 },
        { header: "Detalhes", key: "notes", width: 30 },
    ];

    // Adicionando linhas de pedidos
    orders.forEach((order) => {
        worksheet.addRow({
            owner: order.owner,
            type: order.type,
            quantity: order.quantity,
            costCenter: order.costCenter,
            price: order.price,
            targetDate: (order.targetDate),
            notes: order.notes,
        });
    });

    const buf = await workbook.xlsx.writeBuffer();

    // Formatando o nome do arquivo
    const exportDate = new Date();
    const formattedExportDate = formatDate(exportDate);
    const periodFormatted = `Periodo ${formatDate(period.start)} - ${formatDate(
        period.end
    )} (${formattedExportDate})`;

    saveAs(new Blob([buf]), `${periodFormatted}.xlsx`);
}
