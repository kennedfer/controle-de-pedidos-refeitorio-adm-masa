import { OverlayToaster, Position } from "@blueprintjs/core";

const TOAST_CONFIG = {
    success: {
        intent: "success",
        icon: "tick",
    },
    danger: {
        intent: "danger",
        icon: "error",
    },
    warning: {
        intent: "warning",
        icon: "high-priority",
    }
}

/**
 * Classe responsável pela criação e exibição de toasts (notificações) usando o OverlayToaster do BlueprintJS.
 * O toaster é inicializado de forma assíncrona ao criar uma instância da classe.
 * A classe oferece métodos para exibir diferentes tipos de toasts: sucesso, aviso e erro.
 */
class ToastCreator {
    /**
     * Cria uma instância de ToastCreator e inicializa o toaster.
     * A criação do toaster é feita de forma assíncrona utilizando o `OverlayToaster.createAsync()`.
     * O toaster é configurado para exibir notificações no topo da tela.
     */
    constructor() {
        (async () => {
            this.toaster = await OverlayToaster.createAsync({
                position: Position.TOP,
            });
        })();
    }

    #show(message, type){
        this.toaster.show(
            {message,
            isCloseButtonShown: false,
             ...TOAST_CONFIG[type]
        })
    }

    /**
     * Exibe um toast de sucesso.
     *
     * @param {string} message - A mensagem a ser exibida no toast.
     * @returns {void} Não retorna nenhum valor.
     *
     * @example
     * toaster.success('Operação concluída com sucesso!');
     */
    success(message) {
        this.#show(message, "success");
    }

    /**
     * Exibe um toast de aviso.
     *
     * @param {string} message - A mensagem a ser exibida no toast.
     * @returns {void} Não retorna nenhum valor.
     *
     * @example
     * toaster.warning('Aviso: Item removido.');
     */
    warning(message) {
        this.#show(message, "warning");
    }

    /**
     * Exibe um toast de erro.
     *
     * @param {string} message - A mensagem a ser exibida no toast.
     * @returns {void} Não retorna nenhum valor.
     *
     * @example
     * toaster.danger('Erro: Algo deu errado!');
     */
    danger(message) {
        this.#show(message, "danger");
    }
}

// Exporta uma instância única de ToastCreator
export const Toaster = new ToastCreator();
