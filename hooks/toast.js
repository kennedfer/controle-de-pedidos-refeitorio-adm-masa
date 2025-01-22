import { OverlayToaster, Position } from "@blueprintjs/core";

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
        this.toaster.show({
            message,
            intent: "success",
        });
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
        this.toaster.show({
            message,
            intent: "warning",
        });
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
        this.toaster.show({
            message,
            intent: "danger",
        });
    }
}

// Exporta uma instância única de ToastCreator
export const Toaster = new ToastCreator();
