import { timingSafeEqual } from "crypto";
import { headers } from "next/headers";

// Mapa simples para controle de tentativas
const loginAttempts = new Map();

export async function GET(request) {
    try {
        // Obtém IP e controla tentativas
        const headersList = headers();
        const ip = headersList.get("x-forwarded-for") || "unknown";

        const attempts = loginAttempts.get(ip) || [];
        const recentAttempts = attempts.filter(
            (time) => Date.now() - time < 15 * 60 * 1000, // 15 minutos
        );

        // Bloqueia após 5 tentativas
        if (recentAttempts.length >= 5) {
            return Response.json(
                { error: "Muitas tentativas. Tente novamente mais tarde." },
                { status: 429 },
            );
        }

        // Obtém e valida senhas
        const searchParams = request.nextUrl.searchParams;
        const userPassword = searchParams.get("password") || "";
        const password = process.env.PASSWORD;

        if (!password) {
            throw new Error("PASSWORD não configurada");
        }

        // Registra tentativa
        loginAttempts.set(ip, [...recentAttempts, Date.now()]);

        // Compara senhas de forma segura
        const isValid = timingSafeEqual(
            Buffer.from(userPassword),
            Buffer.from(password),
        );

        // Log básico
        console.log(
            `Login ${isValid ? "sucesso" : "falha"} - ${new Date().toISOString()}`,
        );

        return Response.json(
            { ok: isValid },
            {
                status: isValid ? 200 : 401,
                headers: { "Cache-Control": "no-store" },
            },
        );
    } catch (error) {
        console.error("Erro na autenticação:", error);
        return Response.json({ error: "Erro interno" }, { status: 500 });
    }
}
