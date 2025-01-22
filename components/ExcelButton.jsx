import { Button } from "@blueprintjs/core";

export function ExcelButton({ handler }) {
  return (
    <Button
      className="color-green-500 bg-green-500 scale-110"
      shape="square"
      tooltip={<div>Exportar como planilha</div>}
      style={{
        insetInlineEnd: 45,
      }}
      onClick={handler}
    />
  );
}
