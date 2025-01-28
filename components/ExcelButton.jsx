import { Button } from "@blueprintjs/core";

export function ExcelButton({ handler }) {
  return (
    <Button
      className="color-green-500 bg-green-500 absolute bottom-10 right-10 scale-125"
      icon="document"
      intent="success"
      large
      tooltip={<div>Exportar como planilha</div>}
      onClick={handler}
    />
  );
}
