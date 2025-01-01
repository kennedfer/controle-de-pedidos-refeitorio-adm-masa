import { db } from "../../../../database/db";

export async function GET(request){
    const orders = await db.index();
    return Response.json(orders)
}

export async function PUT(request, {params}){
    const {id} = params;
    const status = await request.text();

    const order = await db.update(id, status)

    return Response.json(order)
}