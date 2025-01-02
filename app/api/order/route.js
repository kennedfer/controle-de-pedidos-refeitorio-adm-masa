import { db } from "../../../database/db";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    const start = searchParams.get('start')
    const end = searchParams.get('end')

    const orders = await db.index(start, end);
    return Response.json(orders)
}

export async function POST(request) {
    const data = await request.json();
    const newOrder = await db.store(data);

    return Response.json(newOrder)
}