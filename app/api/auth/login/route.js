export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    const password = process.env.PASSWORD;
    const userPassword = searchParams.get('password') || "";

    return Response.json({
        ok: password == userPassword
    })
}