import '../database/mongoose'
import { Order } from "../models/order";


// FEITO EM CENTAVOS PARA CORRIGIR BUGS
// DE IMPRECISAO COM FLOATS
const ordersTable = {
  "APRESENTACAO MUSICAL": 270653,
  "CAFE LITRO": 429,
  "CERVEJA": 2237,
  "CHURRASCO": 6776,
  "COFF I": 1327,
  "COFF II": 1647,
  "COFF III": 1795,
  "DESJEJUM": 2011,
  "DESJEJUM ACAMPAMENTO": 2977,
  "EVENTO": 8323,
  "LANCHE ESPECIAL": 3796,
  "LANCHE TURNO": 1202,
  "PICOLE": 405,
  "JANTAR": 2145,
  "ALMOCO": 2145
};


const fakeData = [
    {
      "owner": "Kenned Ferreira",
      "type": "apresentacaoMusical",
      "quantity": 1,
      "costCenter": "RH",
      "notes": "paia",
      "id": 0,
      "price": 2706.53,
      "status": "pending"
    },
    {
      "owner": "Kenned Ferreira",
      "type": "cafeLitro",
      "quantity": "2",
      "costCenter": "RH",
      "notes": "paia",
      "id": 1,
      "price": 8.58,
      "status": "pending"
    }
  ]

class Database{
    constructor(){
        // this.orders = fakeData;
    }
    
    async index(start, end, status){
        console.log(start, end, status)

        const orders = await Order.find({
          createdAt:{
            $gte: new Date(start), 
            $lt: new Date(end)
          },
          status:{
             "$eq":status
          }
        });

        return orders;
    }

    async show(id){
        return await Order.findById(id);
    }

    async update(id, status){
        const order = await this.show(id);

        order.status = status
        await order.save();

        return order;
    }

    async store(order){
        // const lastOrder = this.orders[this.orders.length - 1];

        // const id = lastOrder ? lastOrder.id + 1 : 0;
        // a divisao por 100 re-converte o valor para reais
        const price = ordersTable[order.type] * order.quantity / 100;
        const targetDate = new Date(order.targetDate).toLocaleDateString('pt-BR')

        // this.orders.push({
        //     ...order,
        //     id,
        //     price
        // })

        // await Order.deleteMany({})
        const newOrder = new Order({
          ...order,
          price,
          targetDate
        });

        await newOrder.save();

        return newOrder;
        // return this.orders[this.orders.length-1]
    }
}

export const db = new Database();