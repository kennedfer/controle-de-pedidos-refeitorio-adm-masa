import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Intent,
} from "@blueprintjs/core";
import { OrderForm } from "./OrderForm";
import { Toaster } from "../utils/toast";
import { handleError } from "../utils/error";
import PropTypes from "prop-types";
import { memo, useState, useCallback } from "react";

/**
 * Configurações do diálogo
 */
const DIALOG_CONFIG = {
  WIDTH: 850,
  MESSAGES: {
    SUCCESS: "Pedido realizado com sucesso!",
    ERROR: {
      CONNECTION: "Erro: Verifique sua conexão de internet",
      VALIDATION: "Erro: Verifique os dados informados",
      SERVER: "Erro no servidor. Tente novamente mais tarde",
    },
  },
  TITLES: {
    NEW: "Novo Pedido",
    CREATING: "Criando Pedido...",
  },
};

/**
 * Componente de diálogo de criação de pedido
 */
function OrderDialogComponent({ onClose, isOpen, refresh }) {
  // Estados
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fecha o diálogo
   */
  const closeDialog = useCallback(() => {
    if (!isSubmitting) {
      setError(null);
      onClose();
    }
  }, [isSubmitting, onClose]);

  /**
   * Manipula a submissão do formulário
   * @param {Object} values - Valores do formulário
   */
  const handleSubmit = useCallback(
    async (values) => {
      setIsSubmitting(true);
      setError(null);

      try {
        // Prepara os dados
        const orderData = {
          ...values,
          createdAt: new Date().toISOString(),
          createdBy: "kennedfer", // Valor do Current User's Login
        };

        // Faz a requisição
        const response = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User": "kennedfer",
          },
          body: JSON.stringify(orderData),
        });

        // Verifica resposta
        if (!response.ok) {
          throw new Error(
            response.status === 400
              ? DIALOG_CONFIG.MESSAGES.ERROR.VALIDATION
              : DIALOG_CONFIG.MESSAGES.ERROR.SERVER,
          );
        }

        const data = await response.json();

        // Sucesso
        Toaster.success(DIALOG_CONFIG.MESSAGES.SUCCESS);
        refresh((prev) => prev + 1);
        closeDialog();
      } catch (error) {
        // Erro
        setError(error.message);
        Toaster.danger(
          error.message || DIALOG_CONFIG.MESSAGES.ERROR.CONNECTION,
        );
        handleError(error, "Criação de pedido");
      } finally {
        setIsSubmitting(false);
      }
    },
    [closeDialog, refresh],
  );

  return (
    <Dialog
      title={
        isSubmitting ? DIALOG_CONFIG.TITLES.CREATING : DIALOG_CONFIG.TITLES.NEW
      }
      isOpen={isOpen}
      style={{
        width: `${DIALOG_CONFIG.WIDTH}px`,
        maxWidth: "90vw",
      }}
      onClose={closeDialog}
      isCloseButtonShown={!isSubmitting}
      canEscapeKeyClose={!isSubmitting}
      canOutsideClickClose={!isSubmitting}
    >
      <DialogBody>
        <OrderForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </DialogBody>

      {error && (
        <DialogFooter
          actions={
            <Button
              intent={Intent.DANGER}
              text="Tentar Novamente"
              onClick={() => setError(null)}
              disabled={isSubmitting}
            />
          }
        />
      )}
    </Dialog>
  );
}

OrderDialogComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
};

// Exporta componente memoizado
export const OrderDialog = memo(OrderDialogComponent);

// Exemplo de uso:
/*
function OrdersPage() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);

    return (
        <>
            <Button
                onClick={() => setDialogOpen(true)}
                text="Novo Pedido"
            />

            <OrderDialog
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                refresh={setRefresh}
            />
        </>
    );
}
*/
