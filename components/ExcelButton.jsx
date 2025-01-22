import { Button } from "@blueprintjs/core";

export function ExcelButton({ handler }) {
  return (
    <Button
      className="color-green-500 bg-green-500 absolute bottom-1 right-1"
      icon="import"
      shape="square"
      tooltip={<div>Exportar como planilha</div>}
      style={{
        insetInlineEnd: 45,
      }}
      onClick={handler}
    />
  );
}
