import { Button } from "antd";
import { useState } from "react";

import {motion} from 'framer-motion'

export function PendingOrder({order,index, refresh}){
    const {owner, type, quantity,price, _id, targetDate} = order;
    const [isLoading, setIsLoading] = useState({
        approved: false,
        rejected: false
    })

    const formattedPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    async function handleClick(status){
        const newIsLoading = isLoading;
        newIsLoading[status] = true;

        setIsLoading(newIsLoading)

        const response = await fetch('/api/order/' + _id, {
            method:'PUT',
            body: status
        })
        const updatedOrder = await response.json();
        refresh(prev => prev + 1);
    }

    return <motion.tr
    initial={{ opacity: 0, }}  // Animação inicial
    animate={{ opacity: 1,}}    // Animação final
    exit={{ opacity: 0,}}      // Animação quando sai
    transition={{
        duration: 0.5,                 // Duração da animação
        delay: index * 0.1             // Delay progressivo para cada item
    }} className=" p-5 text-center border-b hover:bg-[#fafafa] duration-300 transition">
        <th scope="row">{owner}</th>
        <td>{type}</td>
        <td>{quantity}</td>
        <td>{formattedPrice}</td>
        <td>{targetDate}</td>
        <td className="flex  p-3 gap-3 w-full justify-center">
            <Button onClick={() => handleClick("rejected")} loading={isLoading.rejected} size="small" className="pointer-events-auto" danger>REPROVAR</Button>
            <Button onClick={() => handleClick("approved")}  loading={isLoading.approved} size="small" className="pointer-events-auto hover:!text-green-300 hover:!border-green-300 text-green-400 border-green-400" >APROVAR</Button>
        </td> 
    </motion.tr>
}