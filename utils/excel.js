import * as XLSX from 'xlsx';

export function exportToExcel(orders) {
    const formattedOrders = orders.map(order =>({
        "Solicitado por": order.owner,
        "Tipo de Pedido": order.type,
        "Quantidade (Unidade)": order.quantity,
        "Centro de Custo": order.costCenter,
        "Valor do Pedido": order.price,
        "Data da Entrega": new Date(order.targetDate).toLocaleDateString('pt-BR'),
        "Detalhes": order.notes
    }))

    const ws = XLSX.utils.json_to_sheet(formattedOrders);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');

    XLSX.writeFile(wb, 'dados.xlsx');
};