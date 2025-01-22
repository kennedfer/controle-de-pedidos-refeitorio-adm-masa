import {
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@blueprintjs/core";
import { OrderForm } from "./OrderForm";

export const OrderDialog = ({ dialogState }) => {
  async function handleSubmit(values) {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await response.json();
      // Toast.success("Pedido realizado com sucesso!");.+

      form.resetFields();
    } catch (err) {
      // Toast.error(Toast.INTERNET_ERROR_MESSAGE);
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
        width: "750px",
      }}
      onClose={closeDialog}
    >
      <DialogBody>
        <OrderForm onSubmit={handleSubmit} />
      </DialogBody>
    </Dialog>
  );
};
