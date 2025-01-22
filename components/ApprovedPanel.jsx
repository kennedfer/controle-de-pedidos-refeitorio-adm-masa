import { useState, useEffect } from "react";
import { PeriodNavigator } from "./PeriodNavigator";
import { ApprovedTable } from "./ApprovedTable";
import { ExcelButton } from "./ExcelButton";

import { exportToExcel } from "../utils/excel";
// import { Empty } from "antd";
import { useOrders } from "../hooks/orders";

export function ApprovedPanel({ period, setPeriod }) {
  const orders = useOrders("approved", period);

  return (
    <>
      <div>
        <PeriodNavigator period={period} setPeriod={setPeriod} />
      </div>

      <ExcelButton handler={() => exportToExcel(orders)} />

      <div className="p-2">
        <ApprovedTable orders={orders} />
      </div>
      {/* {orders.length == 0 && <Empty description={
            <span>Sem pedidos nesse periodo</span>
        } image={Empty.PRESENTED_IMAGE_SIMPLE} />} */}
    </>
  );
}
