import PropTypes from "prop-types";

/**
 * Configuração das colunas da tabela
 * @constant
 */
const TABLE_COLUMNS = {
  OWNER: {
    id: "owner",
    label: "Registrado Por",
    width: "w-[150px]",
  },
  TYPE: {
    id: "type",
    label: "Tipo",
    width: "w-[120px]",
  },
  QUANTITY: {
    id: "quantity",
    label: "Quantidade",
    width: "w-[100px]",
  },
  PRICE: {
    id: "price",
    label: "Valor do Pedido",
    width: "w-[130px]",
  },
  COMMENTS: {
    id: "comments",
    label: "Comentários",
    width: "w-[200px]",
  },
  CREATED_AT: {
    id: "createdAt",
    label: "Registrado em",
    width: "w-[150px]",
  },
  TARGET_DATE: {
    id: "targetDate",
    label: "Data de entrega",
    width: "w-[150px]",
  },
  TARGET_PLACE: {
    id: "targetPlace",
    label: "Local de Entrega",
    width: "w-[150px]",
  },
  ACTION: {
    id: "action",
    label: "Ação",
    width: "w-[100px]",
  },
};

/**
 * Estilos base para o cabeçalho da tabela
 */
const TABLE_STYLES = {
  header: "sticky top-0 z-10 border-b border-t bg-[#fafafa] shadow-sm",
  headerCell:
    "px-4 py-3 text-left text-sm font-semibold text-gray-900 whitespace-nowrap",
  sortableCell: "cursor-pointer hover:bg-gray-50 transition-colors",
};

/**
 * Componente de cabeçalho de tabela
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.showActionColumn - Indica se deve mostrar a coluna de ações
 * @param {Function} props.onSort - Callback para ordenação (opcional)
 * @param {string} props.sortColumn - Coluna atual de ordenação (opcional)
 * @param {string} props.sortDirection - Direção da ordenação (opcional)
 */
export const TableHeader = ({
  showActionColumn = false,
  onSort,
  sortColumn,
  sortDirection,
}) => {
  /**
   * Renderiza uma célula do cabeçalho
   * @param {Object} column - Configuração da coluna
   * @returns {JSX.Element}
   */
  const renderHeaderCell = (column) => {
    const isSortable = !!onSort;
    const isSorted = sortColumn === column.id;

    const cellClasses = [
      TABLE_STYLES.headerCell,
      column.width,
      isSortable && TABLE_STYLES.sortableCell,
      isSorted && "bg-gray-50",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <th
        key={column.id}
        scope="col"
        className={cellClasses}
        onClick={isSortable ? () => onSort(column.id) : undefined}
        role={isSortable ? "button" : undefined}
        tabIndex={isSortable ? 0 : undefined}
        aria-sort={isSorted ? sortDirection : undefined}
      >
        <div className="flex items-center gap-2">
          {column.label}
          {isSorted && (
            <span className="text-gray-500">
              {sortDirection === "asc" ? "↑" : "↓"}
            </span>
          )}
        </div>
      </th>
    );
  };

  // Lista de colunas a serem renderizadas
  const columns = Object.values(TABLE_COLUMNS).filter(
    (column) => column.id !== "action" || showActionColumn,
  );

  return (
    <thead className={TABLE_STYLES.header}>
      <tr>{columns.map(renderHeaderCell)}</tr>
    </thead>
  );
};

// PropTypes para validação
TableHeader.propTypes = {
  showActionColumn: PropTypes.bool,
  onSort: PropTypes.func,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.oneOf(["asc", "desc"]),
};

// Valores padrão
TableHeader.defaultProps = {
  showActionColumn: false,
  onSort: undefined,
  sortColumn: undefined,
  sortDirection: undefined,
};

// Exemplo de uso:
/*
<Table>
    <TableHeader
        showActionColumn={true}
        onSort={(column) => console.log(`Ordenar por ${column}`)}
        sortColumn="createdAt"
        sortDirection="desc"
    />
    <tbody>
      ...
    </tbody>
</Table>
*/
