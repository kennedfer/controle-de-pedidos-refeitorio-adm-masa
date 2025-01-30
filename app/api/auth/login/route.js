export async function POST(request) {
    try{
        const userPassword = await request.text();
        const serverPassword = process.env.RESTAURANT_ORDERS_USER_PASSWORD;
    
        return Response.json({
            ok: serverPassword == userPassword
        })
    }catch(err){
        console.log(err)
    }
    
}