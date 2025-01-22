import {
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@blueprintjs/core";
import { OrderForm } from "./OrderForm";
import { Toaster } from "../hooks/toast";
import { handleError } from "../utils/error";

export const OrderDialog = ({ dialogState }) => {
  async function handleSubmit(values) {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await response.json();
      Toaster.success("Pedido realizado com sucesso!");
      closeDialog();
      // form.resetFields();
    } catch (error) {
      Toaster.danger("Erro: Verifique sua conexão de internet");
      handleError(error, "Criação de pedido");
    }
  }

  function closeDialog() {
    dialogState[1]({ open: false });
  }

  return (
    <Dialog
      title="Novo Pedido"
      isOpen={dialogState[0].open}
      style={{
        width: "850px",
      }}
      onClose={closeDialog}
    >
      <DialogBody>
        <OrderForm onSubmit={handleSubmit} />
      </DialogBody>
    </Dialog>
  );
};
