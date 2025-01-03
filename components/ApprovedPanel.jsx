import { useState, useEffect } from "react";
import { PeriodNavigator } from "./PeriodNavigator";
import { ApprovedTable } from "./ApprovedTable";
import { ExcelButton } from "./ExcelButton";

import * as XLSX from 'xlsx';

export function ApprovedPanel({ period, setPeriod }) {
    const [orders, setOrders] = useState([])

    function exportToExcel(){
        const ws = XLSX.utils.json_to_sheet(orders);
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Dados');
    
        XLSX.writeFile(wb, 'dados.xlsx');
      };

    useEffect(() => {
        async function fetchApiData() {
            const { start, end } = period;

            const response = await fetch(`/api/order?status=approved&start=${start}&end=${end}`);
            const orders = await response.json();

            console.log(orders)
            setOrders(orders)
        }

        fetchApiData();
    }, [period])

    return <>
        <div>
            <PeriodNavigator period={period} setPeriod={setPeriod} />
        </div>

        <ExcelButton handler={exportToExcel}/>

        <div className="p-2">
            <ApprovedTable orders={orders} />
        </div>
    </>
}