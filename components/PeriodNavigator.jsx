import { Button } from "@blueprintjs/core";
import { formatDate } from "../utils/date";

// Componente para o ícone de navegação
function ArrowIcon({ direction }) {
  const path =
    direction === "previous"
      ? "M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
      : "M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
  );
}

export function PeriodNavigator({ period, setPeriod }) {
  const changePeriod = (direction) => {
    const newStart = new Date(period.start);
    const newMonth = direction === "previous" ? -1 : 1;
    newStart.setMonth(newStart.getMonth() + newMonth);
    newStart.setDate(11);

    const newEnd = new Date(newStart);
    newEnd.setMonth(newStart.getMonth() + 1);
    newEnd.setDate(10);

    setPeriod({ start: newStart, end: newEnd });
  };

  return (
    <div className="w-full flex justify-between items-center">
      <Button
        aria-label="Mês anterior"
        onClick={() => changePeriod("previous")}
      >
        <ArrowIcon direction="previous" />
      </Button>

      <Button className="p-2 grow text-xs capitalize">
        {`Período: ${formatDate(period.start)} - ${formatDate(period.end)}`}
      </Button>

      <Button aria-label="Próximo mês" onClick={() => changePeriod("next")}>
        <ArrowIcon direction="next" />
      </Button>
    </div>
  );
}
