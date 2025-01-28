import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/**
 * Exporta uma lista de pedidos para um arquivo Excel.
 *
 * @param {Array<Object>} orders - Lista de pedidos a serem exportados
 * @param {string} orders[].owner - Nome do solicitante do pedido
 * @param {string} orders[].type - Tipo do pedido
 * @param {number} orders[].quantity - Quantidade do item pedido
 * @param {string} orders[].costCenter - Centro de custo associado ao pedido
 * @param {number} orders[].price - Valor do pedido
 * @param {Date} orders[].targetDate - Data de entrega do pedido
 * @param {string} orders[].notes - Detalhes ou observações sobre o pedido
 * @param {string} [filename="pedidos"] - Nome do arquivo (opcional)
 * @returns {Promise<void>}
 * @throws {Error} Se os dados estiverem em formato inválido
 */
export async function exportToExcelFile(orders, filename = "pedidos") {
    try {
        if (!Array.isArray(orders) || orders.length === 0) {
            throw new Error(
                "A lista de pedidos está vazia ou em formato inválido",
            );
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Pedidos");

        // Definição das colunas
        worksheet.columns = [
            { header: "Solicitado por", key: "owner", width: 20 },
            { header: "Tipo de Pedido", key: "type", width: 20 },
            { header: "Quantidade (Unidade)", key: "quantity", width: 20 },
            { header: "Centro de Custo", key: "costCenter", width: 20 },
            { header: "Valor do Pedido", key: "price", width: 20 },
            { header: "Data da Entrega", key: "targetDate", width: 20 },
            { header: "Detalhes", key: "notes", width: 30 },
        ];

        // Estilização do cabeçalho
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFE0E0E0" },
        };

        orders.forEach((order) => {
            const row = worksheet.addRow({
                owner: order.owner,
                type: order.type,
                quantity: order.quantity,
                costCenter: order.costCenter,
                price: order.price,
                targetDate: order.targetDate,
                notes: order.notes,
            });

            const priceCell = row.getCell("price");
            priceCell.numFmt = '"R$ "#,##0.00';

            const dateCell = row.getCell("targetDate");
            dateCell.numFmt = "dd/mm/yyyy";
        });

        // Adiciona bordas em todas as células
        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
        });

        // Ajusta o tamanho das colunas com base no "tamanhos" das palavras
        worksheet.columns.forEach((column) => {
            column.width = Math.max(
                column.width,
                ...worksheet
                    .getColumn(column.key)
                    .values.map((v) => String(v).length),
            );
        });

        // Gera o buffer e salva o arquivo
        const buffer = await workbook.xlsx.writeBuffer();
        const timestamp = new Date().toISOString().split("T")[0];
        saveAs(
            new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
            `${filename}_${timestamp}.xlsx`,
        );
    } catch (error) {
        console.error("Erro ao exportar para Excel:", error);
        throw new Error(`Falha ao exportar para Excel: ${error.message}`);
    }
}
