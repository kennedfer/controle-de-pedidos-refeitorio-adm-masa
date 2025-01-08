import { Button, Popconfirm, Popover } from "antd";
import { useState } from "react";

import { motion } from 'framer-motion'

export function PendingOrder({ order, index, refresh, toast }) {
    const { owner, type, quantity, price, _id, targetDate, targetPlace, comments, createdAt } = order;


    const [isLoading, setIsLoading] = useState({
        approved: false,
        rejected: false
    })

    const formattedCreatedAt = new Date(createdAt).toLocaleDateString('pt-BR')
    const formattedPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    async function handleClick(status) {
        const newIsLoading = isLoading;
        newIsLoading[status] = true;

        setIsLoading(newIsLoading)

        try{
            const response = await fetch('/api/order/' + _id, {
                method: 'PUT',
                body: status
            })
            const updatedOrder = await response.json();
            
            if(updatedOrder.status == 'approved'){
                toast.success("Pedido aprovado!")
            }else{
                toast.warning("Pedido Reprovado!")
            }

            refresh(prev => prev + 1);

        }catch(err){
            toast.error(toast.INTERNET_ERROR_MESSAGE)
        }
    }

    return <motion.tr
        initial={{ opacity: 0, }}  // Animação inicial
        animate={{ opacity: 1, }}    // Animação final
        exit={{ opacity: 0, }}      // Animação quando sai
        transition={{
            duration: 0.5,                 // Duração da animação
            delay: index * 0.1             // Delay progressivo para cada item
        }} className=" p-5 text-center border-b hover:bg-[#fafafa] duration-300 transition">
        <th scope="row">{owner}</th>
        <td>{type}</td>
        <td>{quantity}</td>
        <td>{formattedPrice}</td>
        <td>{
            <Popover content={comments} title="Comentários" trigger="click">
                <Button type="link">Comentários</Button>
            </Popover>
        }</td>
        <td>{formattedCreatedAt}</td>
        <td>{targetDate}</td>
        <td>{targetPlace}</td>
        <td className="flex  p-3 gap-3 w-full justify-center">
            <Popconfirm
                title="Reprovar pedido"
                description="Tem certeza que quer reprovar o pedido?"
                onConfirm={() => handleClick("rejected")}
                // onCancel={()=>toast.error('cancell')}
                okText="Reprovar"
                cancelText="Cancelar"
            >
                <Button loading={isLoading.rejected} size="small" danger>REPROVAR</Button>
            </Popconfirm>

            <Button onClick={() => handleClick("approved")} loading={isLoading.approved} size="small" className="hover:!text-green-300 hover:!border-green-300 text-green-400 border-green-400" >APROVAR</Button>
        </td>
    </motion.tr>
}