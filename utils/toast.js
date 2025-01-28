import { OverlayToaster, Position } from "@blueprintjs/core";

/**
 * Configurações padrão para os toasts
 * @type {Object}
 */
const DEFAULT_CONFIG = {
    timeout: 3000,
    position: Position.TOP,
    maxToasts: 3,
    canEscapeKeyClear: true,
};

/**
 * Classe responsável pela criação e exibição de toasts usando o BlueprintJS.
 */
class ToastCreator {
    #toaster = null;
    #initializationPromise = null;

    /**
     * Cria uma instância de ToastCreator e inicializa o toaster.
     * @private
     */
    constructor() {
        if (ToastCreator.instance) {
            return ToastCreator.instance;
        }
        ToastCreator.instance = this;
        this.#initializationPromise = this.#initialize();
    }

    /**
     * Inicializa o toaster de forma segura
     * @private
     * @returns {Promise<void>}
     */
    async #initialize() {
        try {
            // Aguarda o DOM estar pronto
            if (typeof document === "undefined") {
                await new Promise((resolve) => {
                    if (document) resolve();
                    else window.addEventListener("DOMContentLoaded", resolve);
                });
            }

            this.#toaster = await OverlayToaster.createAsync({
                position: DEFAULT_CONFIG.position,
                maxToasts: DEFAULT_CONFIG.maxToasts,
            });
        } catch (error) {
            console.error("Erro ao inicializar toaster:", error);
            throw new Error("Falha ao inicializar sistema de notificações");
        }
    }

    /**
     * Verifica se o toaster está pronto para uso
     * @private
     * @returns {Promise<void>}
     */
    async #ensureToasterReady() {
        await this.#initializationPromise;
        if (!this.#toaster) {
            throw new Error("Toaster não está inicializado");
        }
    }

    /**
     * Retorna o ícone apropriado para cada tipo de toast
     * @private
     * @param {string} intent - Tipo do toast
     * @returns {string} Nome do ícone
     */
    #getIconForIntent(intent) {
        const icons = {
            success: "tick-circle",
            warning: "warning-sign",
            danger: "error",
            default: "info-sign",
        };
        return icons[intent] || icons.default;
    }

    /**
     * Exibe um toast com as configurações especificadas
     * @private
     * @param {string} message - Mensagem a ser exibida
     * @param {string} intent - Tipo do toast (success, warning, danger)
     * @param {Object} [config] - Configurações opcionais
     */
    async #showToast(message, intent, config = {}) {
        try {
            await this.#ensureToasterReady();

            const toastConfig = {
                message,
                intent,
                timeout: config.timeout || DEFAULT_CONFIG.timeout,
                icon: this.#getIconForIntent(intent),
                className: `toast-${intent}`,
                onDismiss: config.onDismiss,
            };

            this.#toaster.show(toastConfig);
        } catch (error) {
            console.error("Erro ao exibir toast:", error);
            // Fallback para console em caso de erro
            console.log(`${intent.toUpperCase()}: ${message}`);
        }
    }

    /**
     * Exibe um toast de sucesso
     * @param {string} message - Mensagem a ser exibida
     * @param {Object} [config] - Configurações opcionais
     */
    async success(message, config) {
        await this.#showToast(message, "success", config);
    }

    /**
     * Exibe um toast de aviso
     * @param {string} message - Mensagem a ser exibida
     * @param {Object} [config] - Configurações opcionais
     */
    async warning(message, config) {
        await this.#showToast(message, "warning", config);
    }

    /**
     * Exibe um toast de erro
     * @param {string} message - Mensagem a ser exibida
     * @param {Object} [config] - Configurações opcionais
     */
    async danger(message, config) {
        await this.#showToast(message, "danger", config);
    }

    /**
     * Limpa todos os toasts ativos
     */
    clear() {
        if (this.#toaster) {
            this.#toaster.clear();
        }
    }
}

// Exporta uma instância única de ToastCreator
export const Toaster = new ToastCreator();

// Exemplo de uso:
/*
import { Toaster } from './ToastCreator';

// Toast básico
Toaster.success('Operação realizada com sucesso!');

// Toast com configurações personalizadas
Toaster.warning('Atenção!', {
    timeout: 5000,
    onDismiss: () => console.log('Toast fechado')
});

// Toast de erro
Toaster.danger('Erro ao processar operação');

// Limpar todos os toasts
Toaster.clear();
*/
