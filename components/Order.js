import { Button } from "antd";

export function Order({order}){
    const {owner, type, quantity, price} = order;

    async function handleClick(status){
        const response = await fetch('/api/order/' + order.id, {
            method:'PUT',
            body: status
        })
        const updatedOrder = await response.json();

        order.status = status;

        console.log(updatedOrder)
    }

    return <tr className="p-5">
        <th scope="row">{owner}</th>
        <td>{type}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td className="flex p-2 gap-3 w-full justify-center">
            <Button onClick={() => handleClick("rejected")} danger>REPROVAR</Button>
            <Button onClick={() => handleClick("approved")}  className="hover:!text-green-300 hover:!border-green-300 text-green-400 border-green-400" >APROVAR</Button>
        </td> 
    </tr>
}