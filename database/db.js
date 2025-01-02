import '../database/mongoose'
import { Order } from "../models/order";

const ordersTable = {
    apresentacaoMusical: 2706.53,
    cafeLitro: 4.29,
    cerveja: 22.37,
    churrasco: 67.76,
    coffI: 13.27,
    coffII: 16.47,
    coffIII: 17.95,
    desjejum: 20.11,
    desjejumAcampamento: 29.77,
    evento: 83.23,
    lancheEspecial: 37.96,
    lancheTurno: 12.02,
    picole: 4.05,
    jantar: 21.45,
    almoco: 21.45
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
    
    async index(start, end){
        // return this.orders;
        const orders = await Order.find({
          // targetDate:{
          //   $gte: new Date(start), 
          //   $lt: new Date(end)
          // }
        });
        return orders;
        
    }

    async show(id){
        return this.orders.filter(order => order.id == id)[0] || []
    }

    async update(id, status){
        const order = await this.show(id);
        const orderIndex = this.orders.indexOf(order)

        this.orders[orderIndex].status = status

        return this.orders[orderIndex];
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