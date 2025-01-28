import { PeriodNavigator } from "./PeriodNavigator";
import { ExcelButton } from "./ExcelButton";

import { exportToExcelFile } from "../utils/excel";
import { useOrders } from "../hooks/orders";

import { ApprovedOrder } from "./ApprovedOrder";
import { TableHeader } from "./Table";

function ApprovedTable({ orders }) {
  return (
    <table className="w-full table-fixed text-xs">
      <TableHeader />
      <tbody>
        {orders.map((order) => (
          <ApprovedOrder key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
}

export function ApprovedPanel({ period, setPeriod }) {
  const orders = useOrders("approved", period);

  return (
    <>
      <div>
        <PeriodNavigator period={period} setPeriod={setPeriod} />
      </div>

      <ExcelButton handler={() => exportToExcelFile(period, orders)} />

      <div>
        <ApprovedTable orders={orders} />
      </div>
    </>
  );
}
