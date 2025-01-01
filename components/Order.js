const statusColors = {
    'pending':"",
    'rejected':"bg-[red]",
    'approved':'bg-[green]'
}

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

    return <tr className={statusColors[order.status]}>
        <th scope="row">{owner}</th>
        <td>{type}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>
            <button onClick={() => handleClick("rejected")} className="border bg-[red] p-1">REPROVAR</button>
        </td> 
        <td>
            <button onClick={() => handleClick("approved")} className="border bg-[green] p-1">APROVAR</button>
        </td> 
    </tr>
}