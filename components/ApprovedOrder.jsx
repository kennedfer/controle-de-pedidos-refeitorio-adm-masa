import { Button } from "antd";
import { motion } from 'framer-motion'

export function ApprovedOrder({ order, i }) {
    const { owner, type, quantity, price, targetDate } = order;

    const formattedPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    return <motion.tr
        initial={{ opacity: 0, }}  // Animação inicial
        animate={{ opacity: 1,}}    // Animação final
        exit={{ opacity: 0,}}      // Animação quando sai
        transition={{
            duration: 0.5,                 // Duração da animação
            delay: i * 0.1             // Delay progressivo para cada item
        }}
        className="p-5 text-center border-b m-2 hover:bg-[#fafafa] duration-300 transition">
        <th className="p-4" scope="row">{owner}</th>
        <td>{type}</td>
        <td>{quantity}</td>
        <td>{formattedPrice}</td>
        <td>{(targetDate)}</td>
    </motion.tr>
}