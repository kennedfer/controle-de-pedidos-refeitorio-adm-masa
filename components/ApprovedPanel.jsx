import { PeriodNavigator } from "./PeriodNavigator";
import { ApprovedTable } from "./ApprovedTable";
import { ExcelButton } from "./ExcelButton";

import { exportToExcelFile } from "../utils/excel";
import { useOrders } from "../hooks/orders";

export function ApprovedPanel({ period, setPeriod }) {
  const orders = useOrders("approved", period);

  return (
    <>
      <div>
        <PeriodNavigator period={period} setPeriod={setPeriod} />
      </div>

      <ExcelButton handler={() => exportToExcelFile(orders)} />

      <div>
        <ApprovedTable orders={orders} />
      </div>
    </>
  );
}
