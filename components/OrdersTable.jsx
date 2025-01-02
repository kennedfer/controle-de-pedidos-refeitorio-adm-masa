import {Order} from '../components/Order'

export function OrdersTable({orders}){
    return (
    <table rules="all" className="w-full table-auto border">
        <thead>
        <tr>
            <th scope="col">Solicitado Por</th>
            <th scope="col">Tipo</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor do Pedido</th>
        </tr>
        </thead>
        <tbody>
        {
            orders.map(order => <Order key={order.id} order={order} />)
        }
        </tbody>
    </table>)
} 