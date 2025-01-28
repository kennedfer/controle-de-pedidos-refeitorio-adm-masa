import { db } from "../../../../database/db";
import { headers } from "next/headers";

/**
 * Configurações da API
 */
const API_CONFIG = {
    STATUS: {
        VALID: ["pending", "approved", "rejected"],
        DEFAULT: "pending",
    },
    MESSAGES: {
        ERRORS: {
            INVALID_ID: "ID inválido",
            INVALID_STATUS: "Status inválido",
            NOT_FOUND: "Pedido não encontrado",
            UNAUTHORIZED: "Não autorizado",
            SERVER_ERROR: "Erro interno do servidor",
        },
    },
    METADATA: {
        CURRENT_USER: "kennedfer",
        CURRENT_DATE: "2025-01-28 14:03:17",
    },
};

/**
 * Validação de status
 */
function validateStatus(status) {
    if (!status) return "Status não fornecido";
    if (!API_CONFIG.STATUS.VALID.includes(status)) {
        return (
            "Status inválido. Valores permitidos: " +
            API_CONFIG.STATUS.VALID.join(", ")
        );
    }
    return null;
}

/**
 * Validação de ID
 */
function validateId(id) {
    if (!id) return "ID não fornecido";
    if (isNaN(Number(id))) return "ID inválido";
    return null;
}

/**
 * Handler GET - Lista todos os pedidos
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

        // Busca pedidos
        const orders = await db.index();

        // Se não houver pedidos, retorna array vazio
        if (!orders?.length) {
            return Response.json([], {
                status: 200,
                headers: {
                    "Cache-Control": "private, max-age=60",
                },
            });
        }

        return Response.json(orders, {
            status: 200,
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
 * Handler PUT - Atualiza status do pedido
 */
export async function PUT(request, { params }) {
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

        // Valida ID
        const { id } = params;
        const idError = validateId(id);
        if (idError) {
            return Response.json({ error: idError }, { status: 400 });
        }

        // Obtém e valida status
        const status = await request.text();
        const statusError = validateStatus(status);
        if (statusError) {
            return Response.json({ error: statusError }, { status: 400 });
        }

        // Prepara dados da atualização
        const updateData = {
            status,
            updatedAt: API_CONFIG.METADATA.CURRENT_DATE,
            updatedBy: API_CONFIG.METADATA.CURRENT_USER,
        };

        // Atualiza pedido
        const order = await db.update(id, updateData);

        // Verifica se pedido existe
        if (!order) {
            return Response.json(
                { error: API_CONFIG.MESSAGES.ERRORS.NOT_FOUND },
                { status: 404 },
            );
        }

        return Response.json(order, {
            status: 200,
            headers: {
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("Error updating order:", error);
        return Response.json(
            { error: API_CONFIG.MESSAGES.ERRORS.SERVER_ERROR },
            { status: 500 },
        );
    }
}

// Configuração de Edge Runtime
export const runtime = "edge";

// Middleware para métodos permitidos
export async function OPTIONS(request) {
    return new Response(null, {
        status: 204,
        headers: {
            Allow: "GET, PUT, OPTIONS",
            "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}
