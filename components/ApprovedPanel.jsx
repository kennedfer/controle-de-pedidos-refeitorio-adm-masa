import { useState, useEffect } from "react";
import { PeriodNavigator } from "./PeriodNavigator";
import { ApprovedTable } from "./ApprovedTable";
import { ExcelButton } from "./ExcelButton";

import { exportToExcelFile } from "../utils/excel";
// import { Empty } from "antd";
import { useOrders } from "../hooks/orders";

export function ApprovedPanel({ period, setPeriod }) {
  // const orders = useOrders("pending", period);
  const orders = [
    {
      owner: "John Doe",
      type: "Product",
      quantity: 10,
      costCenter: "CC1001",
      comments: "Urgent order",
      price: 100.0,
      status: "pending",
      createdAt: "2025-01-22T03:00:00.000Z",
      targetDate: "2025-01-22T03:00:00.000Z",
      targetPlace: "Warehouse 1",
    },
    {
      owner: "Kenned Ferreira",
      type: "Product",
      quantity: 10,
      costCenter: "CC1001",
      comments: "Urgent order",
      price: 100.0,
      status: "pending",
      createdAt: "2025-01-22T03:00:00.000Z",
      targetDate: "2025-01-22T03:00:00.000Z",
      targetPlace: "Warehouse 1",
    },
  ];

  return (
    <>
      <div>
        <PeriodNavigator period={period} setPeriod={setPeriod} />
      </div>

      <ExcelButton handler={() => exportToExcelFile(orders)} />

      <div className="p-2">
        <ApprovedTable orders={orders} />
      </div>
      {/* {orders.length == 0 && <Empty description={
            <span>Sem pedidos nesse periodo</span>
        } image={Empty.PRESENTED_IMAGE_SIMPLE} />} */}
    </>
  );
}
