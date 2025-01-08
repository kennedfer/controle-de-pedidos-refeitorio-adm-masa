import { useState, useEffect } from "react";

export function useOrders( status, period) {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      async function fetchApiData() {
        const { start, end} = period;
  
        try {
          const response = await fetch(`/api/order?status=${status}&start=${start}&end=${end}`);
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
    }, [period]);
  
    return orders;
  }
  