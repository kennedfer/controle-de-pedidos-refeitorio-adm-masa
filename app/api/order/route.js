import '../../../database/mongoose'
import { db } from "../../../database/db";

export async function GET(request) {
    const orders = await db.index();
    return Response.json(orders)
}

export async function POST(request) {
    const data = await request.json();
    const newOrder = await db.store(data);

    return Response.json(newOrder)
}