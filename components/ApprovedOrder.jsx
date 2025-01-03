import { Button } from "antd";

export function ApprovedOrder({order}){
    const {owner, type, quantity, price, targetDate} = order;

    return <tr className="p-5 text-center">
        <th scope="row">{owner}</th>
        <td>{type}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>{(targetDate)}</td>
    </tr>
}