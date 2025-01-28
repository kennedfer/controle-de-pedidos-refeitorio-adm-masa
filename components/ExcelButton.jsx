import { Button, Position, Tooltip, Intent } from "@blueprintjs/core";
import PropTypes from "prop-types";
import { memo, useState, useCallback } from "react";

/**
 * Configurações do botão
 */
const EXCEL_BUTTON_CONFIG = {
  TOOLTIP: {
    MESSAGE: "Exportar como planilha",
    LOADING: "Gerando planilha...",
    SUCCESS: "Planilha exportada!",
    ERROR: "Erro ao exportar",
  },
  ARIA: {
    LABEL: "Exportar dados para Excel",
  },
  POSITION: {
    className: "fixed bottom-10 right-10 z-50",
  },
  ANIMATION: {
    className: "transform hover:scale-110 transition-transform duration-200",
  },
};

/**
 * Componente de botão de exportação Excel
 */
function ExcelButtonComponent({ onExport, disabled = false, className = "" }) {
  // Estados
  const [isLoading, setIsLoading] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);

  /**
   * Handler de clique com feedback
   */
  const handleExport = useCallback(async () => {
    if (isLoading || disabled) return;

    setIsLoading(true);
    setExportStatus(null);

    try {
      await onExport();
      setExportStatus("success");

      // Reset status após 2 segundos
      setTimeout(() => {
        setExportStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Erro na exportação:", error);
      setExportStatus("error");

      // Reset status após 3 segundos
      setTimeout(() => {
        setExportStatus(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }, [onExport, disabled]);

  /**
   * Determina a mensagem do tooltip
   */
  const getTooltipMessage = () => {
    if (isLoading) return EXCEL_BUTTON_CONFIG.TOOLTIP.LOADING;
    if (exportStatus === "success") return EXCEL_BUTTON_CONFIG.TOOLTIP.SUCCESS;
    if (exportStatus === "error") return EXCEL_BUTTON_CONFIG.TOOLTIP.ERROR;
    return EXCEL_BUTTON_CONFIG.TOOLTIP.MESSAGE;
  };

  /**
   * Determina o intent do botão
   */
  const getButtonIntent = () => {
    if (exportStatus === "error") return Intent.DANGER;
    if (exportStatus === "success") return Intent.SUCCESS;
    return Intent.PRIMARY;
  };

  return (
    <div
      className={`
                ${EXCEL_BUTTON_CONFIG.POSITION.className}
                ${EXCEL_BUTTON_CONFIG.ANIMATION.className}
                ${className}
            `}
    >
      <Tooltip
        content={getTooltipMessage()}
        position={Position.LEFT}
        intent={getButtonIntent()}
      >
        <Button
          icon={isLoading ? "cloud-upload" : "document"}
          intent={getButtonIntent()}
          large
          loading={isLoading}
          disabled={disabled}
          onClick={handleExport}
          aria-label={EXCEL_BUTTON_CONFIG.ARIA.LABEL}
          className={`
                        shadow-lg hover:shadow-xl
                        active:shadow-md
                        transition-shadow duration-200
                    `}
        />
      </Tooltip>
    </div>
  );
}

ExcelButtonComponent.propTypes = {
  onExport: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

// Exporta componente memoizado
export const ExcelButton = memo(ExcelButtonComponent);

// Exemplo de uso:
/*
function OrdersPage() {
    const handleExport = async () => {
        try {
            const data = await fetchOrdersData();
            await exportToExcel(data);
        } catch (error) {
            console.error('Erro na exportação:', error);
            throw error; // Propaga o erro para o componente
        }
    };

    return (
        <div className="relative min-h-screen">
            <ExcelButton
                onExport={handleExport}
                disabled={!hasOrders}
            />
        </div>
    );
}
*/
