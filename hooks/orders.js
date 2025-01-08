import { useState, useEffect, useMemo } from "react";

export function useOrders(status, period = { start: new Date(0), end: new Date(new Date().setHours(23, 59, 59, 999)) }) {
    const [orders, setOrders] = useState([]);

    const memoizedStatus = useMemo(() => status, [status]);
    const memoizedPeriod = useMemo(() => period, [period.start, period.end]);

    useEffect(() => {
        async function fetchApiData() {
            const { start, end } = memoizedPeriod;

            try {
                const response = await fetch(`/api/order?status=${memoizedStatus}&start=${start.getTime()}&end=${end.getTime()}`);
                if (!response.ok) {
                    throw new Error('Erro ao requisitar pedidos');
                }
                const orders = await response.json();
                setOrders(orders);
            } catch (error) {
                console.error('Erro ao requisitar pedidos:', error);
                setOrders([]);
            }
        }

        fetchApiData();
    }, [memoizedStatus, memoizedPeriod]);

    return orders;
}