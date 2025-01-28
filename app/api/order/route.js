import { db } from "../../../database/db";
import { headers } from "next/headers";

/**
 * Configurações da API
 */
const API_CONFIG = {
    LIMITS: {
        MAX_ORDERS: 1000,
        MIN_DATE: new Date("2020-01-01").getTime(),
        MAX_REQUEST_SIZE: 1024 * 1024, // 1MB
    },
    STATUS: ["pending", "approved", "rejected"],
    MESSAGES: {
        ERRORS: {
            INVALID_DATE: "Data inválida",
            INVALID_STATUS: "Status inválido",
            INVALID_DATA: "Dados inválidos",
            UNAUTHORIZED: "Não autorizado",
            SERVER_ERROR: "Erro interno do servidor",
            TOO_MANY_REQUESTS: "Muitas requisições",
        },
    },
};

/**
 * Validação de parâmetros de busca
 */
function validateSearchParams(start, end, status) {
    const errors = [];

    // Validação de datas
    if (start && (isNaN(start) || start < API_CONFIG.LIMITS.MIN_DATE)) {
        errors.push("Data inicial inválida");
    }

    if (end && (isNaN(end) || end > Date.now())) {
        errors.push("Data final inválida");
    }

    // Validação de status
    if (status && !API_CONFIG.STATUS.includes(status)) {
        errors.push("Status inválido");
    }

    return errors;
}

/**
 * Validação de dados do pedido
 */
function validateOrderData(data) {
    if (!data) return ["Dados não fornecidos"];

    const errors = [];

    // Campos obrigatórios
    const requiredFields = ["type", "quantity", "price", "targetDate"];
    requiredFields.forEach((field) => {
        if (!data[field]) {
            errors.push(`Campo ${field} é obrigatório`);
        }
    });

    // Validações específicas
    if (data.quantity && (data.quantity < 1 || data.quantity > 1000)) {
        errors.push("Quantidade inválida");
    }

    if (data.price && (data.price < 0 || data.price > 1000000)) {
        errors.push("Preço inválido");
    }

    return errors;
}

/**
 * Handler GET - Lista pedidos
 */
export async function GET(request) {
    try {
        // Verifica autenticação
        const headersList = headers();
        const authToken = headersList.get("authorization");

        if (!authToken) {
            return Response.json(
                { error: API_CONFIG.MESSAGES.ERRORS.UNAUTHORIZED },
                { status: 401 },
            );
        }

        // Obtém parâmetros
        const searchParams = request.nextUrl.searchParams;
        const start =
            Number(searchParams.get("start")) || API_CONFIG.LIMITS.MIN_DATE;
        const end = Number(searchParams.get("end")) || Date.now();
        const status = searchParams.get("status");

        // Valida parâmetros
        const errors = validateSearchParams(start, end, status);
        if (errors.length > 0) {
            return Response.json({ errors }, { status: 400 });
        }

        // Busca pedidos
        const orders = await db.index(start, end, status);

        // Valida quantidade
        if (orders.length > API_CONFIG.LIMITS.MAX_ORDERS) {
            return Response.json(
                { error: "Muitos resultados. Refine sua busca." },
                { status: 400 },
            );
        }

        return Response.json(orders, {
            headers: {
                "Cache-Control": "private, max-age=60",
            },
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return Response.json(
            { error: API_CONFIG.MESSAGES.ERRORS.SERVER_ERROR },
            { status: 500 },
        );
    }
}

/**
 * Handler POST - Cria pedido
 */
export async function POST(request) {
    try {
        // Verifica autenticação
        const headersList = headers();
        const authToken = headersList.get("authorization");

        if (!authToken) {
            return Response.json(
                { error: API_CONFIG.MESSAGES.ERRORS.UNAUTHORIZED },
                { status: 401 },
            );
        }

        // Verifica tamanho da requisição
        const contentLength = Number(headersList.get("content-length") || 0);
        if (contentLength > API_CONFIG.LIMITS.MAX_REQUEST_SIZE) {
            return Response.json(
                { error: "Requisição muito grande" },
                { status: 413 },
            );
        }

        // Obtém dados
        const data = await request.json();

        // Valida dados
        const errors = validateOrderData(data);
        if (errors.length > 0) {
            return Response.json({ errors }, { status: 400 });
        }

        // Adiciona metadata
        const orderData = {
            ...data,
            createdAt: new Date().toISOString(),
            createdBy: "kennedfer", // Current User's Login
            status: "pending",
        };

        // Cria pedido
        const newOrder = await db.store(orderData);

        return Response.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return Response.json(
            { error: API_CONFIG.MESSAGES.ERRORS.SERVER_ERROR },
            { status: 500 },
        );
    }
}

// Configuração de Edge Runtime
export const runtime = "edge";

// Configuração de cache e revalidação
export const revalidate = 60;
