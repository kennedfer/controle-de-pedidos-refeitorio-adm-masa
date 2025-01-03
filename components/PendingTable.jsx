import {PendingOrder} from './PendingOrder'

export function PendingTable({orders, refresh}){
    return (
    <table rules="all" className="w-full table-fixed">
        <thead>
        <tr className='bg-gray-100'>
            <th scope="col">Solicitado Por</th>
            <th scope="col">Tipo</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor do Pedido</th>
            <th scope="col">Ação</th>
        </tr>
        </thead>
        <tbody>
        {
            orders.map(order => <PendingOrder refresh={refresh} key={order._id} order={order} />)
        }
        </tbody>
    </table>)
} 