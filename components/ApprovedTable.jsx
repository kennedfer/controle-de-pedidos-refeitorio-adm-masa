import {ApprovedOrder} from './ApprovedOrder'

export function ApprovedTable({orders}){
    return (
    <table rules="all" className="w-full table-fixed">
        <thead>
        <tr className='bg-gray-100'>
            <th scope="col">Solicitado Por</th>
            <th scope="col">Tipo</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor do Pedido</th>
            <th scope="col">Data do Pedido</th>
        </tr>
        </thead>
        <tbody>
        {
            orders.map(order => <ApprovedOrder key={order._id} order={order} />)
        }
        </tbody>
    </table>)
} 