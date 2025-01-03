import { useState, useEffect } from "react";
import { PeriodNavigator } from "./PeriodNavigator";
import { ApprovedTable } from "./ApprovedTable";
import { ExcelButton } from "./ExcelButton";

import {exportToExcel} from '../utils/excel'

export function ApprovedPanel({ period, setPeriod }) {
    const [orders, setOrders] = useState([])


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
        
        <ExcelButton handler={()=> exportToExcel(orders)}/>

        <div className="p-2">
            <ApprovedTable orders={orders} />
        </div>
    </>
}