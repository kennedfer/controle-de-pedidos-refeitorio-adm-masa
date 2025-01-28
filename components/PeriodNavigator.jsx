import { Button } from "@blueprintjs/core";
import { formatDate } from "../utils/date";
import PropTypes from "prop-types";
import { memo } from "react";

/**
 * Configurações do navegador
 */
const NAVIGATOR_CONFIG = {
  DIRECTIONS: {
    PREVIOUS: "previous",
    NEXT: "next",
  },
  PATHS: {
    PREVIOUS:
      "M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z",
    NEXT: "M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z",
  },
  LABELS: {
    PREVIOUS: "Mês anterior",
    NEXT: "Próximo mês",
    PERIOD: "Período",
  },
};

/**
 * Componente de ícone de navegação
 */
const ArrowIcon = memo(({ direction }) => {
  const path =
    direction === NAVIGATOR_CONFIG.DIRECTIONS.PREVIOUS
      ? NAVIGATOR_CONFIG.PATHS.PREVIOUS
      : NAVIGATOR_CONFIG.PATHS.NEXT;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      role="img"
      aria-label={
        direction === NAVIGATOR_CONFIG.DIRECTIONS.PREVIOUS
          ? NAVIGATOR_CONFIG.LABELS.PREVIOUS
          : NAVIGATOR_CONFIG.LABELS.NEXT
      }
    >
      <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
  );
});

ArrowIcon.propTypes = {
  direction: PropTypes.oneOf(Object.values(NAVIGATOR_CONFIG.DIRECTIONS))
    .isRequired,
};

ArrowIcon.displayName = "Icone de seta";

/**
 * Valida um objeto de período
 * @param {Object} period - Período a ser validado
 * @throws {Error} Se o período for inválido
 */
const validatePeriod = (period) => {
  if (!period?.start || !period?.end) {
    throw new Error("Período inválido");
  }

  if (!(period.start instanceof Date) || !(period.end instanceof Date)) {
    throw new Error("Datas do período devem ser instâncias de Date");
  }

  if (period.start > period.end) {
    throw new Error("Data inicial não pode ser maior que a final");
  }
};

/**
 * Componente de navegação por período
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.period - Período atual
 * @param {Date} props.period.start - Data inicial
 * @param {Date} props.period.end - Data final
 * @param {Function} props.setPeriod - Função para atualizar o período
 */
function PeriodNavigatorComponent({ period, setPeriod }) {
  // Validação do período
  try {
    validatePeriod(period);
  } catch (error) {
    console.error("Erro no período:", error);
    return null;
  }

  /**
   * Altera o período atual
   * @param {string} direction - Direção da navegação
   */
  const changePeriod = (direction) => {
    const newStart = new Date(period.start);
    const monthChange =
      direction === NAVIGATOR_CONFIG.DIRECTIONS.PREVIOUS ? -1 : 1;

    newStart.setMonth(newStart.getMonth() + monthChange);
    newStart.setDate(11);

    const newEnd = new Date(newStart);
    newEnd.setMonth(newStart.getMonth() + 1);
    newEnd.setDate(10);

    setPeriod({ start: newStart, end: newEnd });
  };

  return (
    <div className="w-full flex justify-between items-center gap-2">
      <Button
        minimal
        aria-label={NAVIGATOR_CONFIG.LABELS.PREVIOUS}
        onClick={() => changePeriod(NAVIGATOR_CONFIG.DIRECTIONS.PREVIOUS)}
        className="hover:bg-gray-100 transition-colors"
      >
        <ArrowIcon direction={NAVIGATOR_CONFIG.DIRECTIONS.PREVIOUS} />
      </Button>

      <Button
        className="p-2 grow text-xs capitalize bg-white hover:bg-gray-50 transition-colors"
        title={`${formatDate(period.start)} até ${formatDate(period.end)}`}
      >
        <span className="font-semibold">
          {`${NAVIGATOR_CONFIG.LABELS.PERIOD}: `}
        </span>
        <span>{`${formatDate(period.start)} - ${formatDate(period.end)}`}</span>
      </Button>

      <Button
        minimal
        aria-label={NAVIGATOR_CONFIG.LABELS.NEXT}
        onClick={() => changePeriod(NAVIGATOR_CONFIG.DIRECTIONS.NEXT)}
        className="hover:bg-gray-100 transition-colors"
      >
        <ArrowIcon direction={NAVIGATOR_CONFIG.DIRECTIONS.NEXT} />
      </Button>
    </div>
  );
}

PeriodNavigatorComponent.propTypes = {
  period: PropTypes.shape({
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  setPeriod: PropTypes.func.isRequired,
};

export const PeriodNavigator = memo(PeriodNavigatorComponent);

// Exemplo de uso:
/*
function App() {
    const [period, setPeriod] = useState({
        start: new Date('2025-01-11'),
        end: new Date('2025-02-10')
    });

    return (
        <div className="p-4">
            <PeriodNavigator
                period={period}
                setPeriod={setPeriod}
            />
        </div>
    );
}
*/
