import { Dialog, DialogBody } from "@blueprintjs/core";
import { OrderForm } from "./OrderForm";
import { Toaster } from "../utils/toast";
import { handleError } from "../utils/error";

export const OrderDialog = ({ onClose, isOpen, refresh }) => {
  async function handleSubmit(values) {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(values),
      });

      await response.json();
      Toaster.success("Pedido realizado com sucesso!");
      closeDialog();
      refresh((prev) => prev + 1);
      // form.resetFields();
    } catch (error) {
      Toaster.danger("Erro: Verifique sua conexão de internet");
      handleError(error, "Criação de pedido");
    }
  }

  function closeDialog() {
    onClose();
  }

  return (
    <Dialog
      title="Novo Pedido"
      isOpen={isOpen}
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
