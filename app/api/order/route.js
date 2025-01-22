import { db } from "../../../database/db";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    const start = Number(searchParams.get('start')) || 0;
    const end = Number(searchParams.get('end')) || Date.now();
    const status = searchParams.get('status');



    const orders = await db.index(start, end, status);
    return Response.json(orders)
}

export async function POST(request) {
    const data = await request.json();
    const newOrder = await db.store(data);

    return Response.json(newOrder)
}