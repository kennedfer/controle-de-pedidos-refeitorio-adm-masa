import '../database/mongoose'
import { Order } from "../models/order";

const ordersTable = {
  "APRESENTACAO MUSICAL": 2706.53,
  "CAFE LITRO": 4.29,
  "CERVEJA": 22.37,
  "CHURRASCO": 67.76,
  "COFF I": 13.27,
  "COFF II": 16.47,
  "COFF III": 17.95,
  "DESJEJUM": 20.11,
  "DESJEJUM ACAMPAMENTO": 29.77,
  "EVENTO": 83.23,
  "LANCHE ESPECIAL": 37.96,
  "LANCHE TURNO": 12.02,
  "PICOLE": 4.05,
  "JANTAR": 21.45,
  "ALMOCO": 21.45
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
        const price = ordersTable[order.type] * order.quantity;

        // this.orders.push({
        //     ...order,
        //     id,
        //     price
        // })

        // await Order.deleteMany({})
        const newOrder = new Order({
          ...order,
          price
        });

        await newOrder.save();

        return newOrder;
        // return this.orders[this.orders.length-1]
    }
}

export const db = new Database();