import ExcelJS from "exceljs";

export async function exportToExcel(orders) {
    // Criação de uma nova planilha
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Dados");

    // Definir o cabeçalho
    worksheet.columns = [
        { header: "Solicitado por", key: "owner", width: 20 },
        { header: "Tipo de Pedido", key: "type", width: 20 },
        { header: "Quantidade (Unidade)", key: "quantity", width: 20 },
        { header: "Centro de Custo", key: "costCenter", width: 20 },
        { header: "Valor do Pedido", key: "price", width: 20 },
        { header: "Data da Entrega", key: "targetDate", width: 20 },
        { header: "Detalhes", key: "notes", width: 30 },
    ];

    // Adicionar os dados das ordens na planilha
    orders.forEach((order) => {
        worksheet.addRow({
            owner: order.owner,
            type: order.type,
            quantity: order.quantity,
            costCenter: order.costCenter,
            price: order.price,
            targetDate: order.targetDate,
            notes: order.notes,
        });
    });

    // Gerar o arquivo Excel
    await workbook.xlsx.writeFile("dados.xlsx");
}
