import { Button } from "antd";

export function PendingOrder({order, refresh}){
    const {owner, type, quantity,price, _id} = order;

    async function handleClick(status){
        const response = await fetch('/api/order/' + _id, {
            method:'PUT',
            body: status
        })
        const updatedOrder = await response.json();
        refresh(prev => prev + 1);
    }

    return <tr className="p-5">
        <th scope="row">{owner}</th>
        <td>{type}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td className="flex p-2 gap-3 w-full justify-center">
            <Button onClick={() => handleClick("rejected")} className="pointer-events-auto" danger>REPROVAR</Button>
            <Button onClick={() => handleClick("approved")}  className="pointer-events-auto hover:!text-green-300 hover:!border-green-300 text-green-400 border-green-400" >APROVAR</Button>
        </td> 
    </tr>
}