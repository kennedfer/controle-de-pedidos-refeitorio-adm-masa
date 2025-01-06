import {ApprovedOrder} from './ApprovedOrder'

export function ApprovedTable({orders}){
    return (
        <table rules="all" className="w-full table-fixed text-xs">
        <thead className='border-b rounded-lg bg-[#fafafa] rounded-xl'>
        <tr>
            <th scope="col">Solicitado Por</th>
            <th scope="col">Tipo</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor do Pedido</th>
            <th scope="col">Data do Pedido</th>
        </tr>
        </thead>
        <tbody>
        {
            orders.map((order,i) => <ApprovedOrder key={order._id} order={order} i={i}/>)
        }
        </tbody>
    </table>)
} 