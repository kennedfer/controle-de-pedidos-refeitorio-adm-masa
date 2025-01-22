import { Button } from "@blueprintjs/core";
import { motion } from "framer-motion";

export function ApprovedOrder({ order, i }) {
  const {
    owner,
    type,
    quantity,
    price,
    targetDate,
    targetPlace,
    comments,
    createdAt,
  } = order;

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString("pt-BR");
  const formattedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: i * 0.1,
      }}
      className="p-5 text-center border-b m-2 hover:bg-[#fafafa] duration-300 transition"
    >
      <th scope="row">{owner}</th>
      <td>{type}</td>
      <td>{quantity}</td>
      <td>{formattedPrice}</td>
      <td>
        {
          <div content={comments} title="Comentários" trigger="click">
            <Button type="link">Comentários</Button>
          </div>
        }
      </td>
      <td>{formattedCreatedAt}</td>
      <td>{targetDate}</td>
      <td>{targetPlace}</td>
    </motion.tr>
  );
}
