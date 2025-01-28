import { handleError } from "./error";

/**
 * Constantes de autenticação
 * @readonly
 */
const AUTH_CONSTANTS = {
  TOKEN_KEY: "restaurant-orders",
  MIN_PASSWORD_LENGTH: 6,
  SESSION_DURATION: 8 * 60 * 60 * 1000, // 8 horas em millisegundos
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
  },
};

/**
 * Classe para gerenciar autenticação
 */
class AuthManager {
  /**
   * Valida a senha antes do envio
   * @private
   * @param {string} password - Senha a ser validada
   * @throws {Error} Se a senha for inválida
   */
  static #validatePassword(password) {
    if (!password || typeof password !== "string") {
      throw new Error("Senha é obrigatória");
    }

    if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
      throw new Error(
        `Senha deve ter pelo menos ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} caracteres`,
      );
    }

    if (/\s/.test(password)) {
      throw new Error("Senha não pode conter espaços");
    }
  }

  /**
   * Gera um timestamp de expiração
   * @private
   * @returns {number} Timestamp de expiração
   */
  static #generateExpirationTime() {
    return Date.now() + AUTH_CONSTANTS.SESSION_DURATION;
  }

  /**
   * Verifica se o token está expirado
   * @private
   * @param {Object} sessionData - Dados da sessão
   * @returns {boolean} True se expirado
   */
  static #isTokenExpired(sessionData) {
    return sessionData.expiresAt < Date.now();
  }

  /**
   * Salva os dados da sessão
   * @private
   * @param {Object} sessionData - Dados a serem salvos
   */
  static #saveSession(sessionData) {
    const session = {
      ...sessionData,
      expiresAt: this.#generateExpirationTime(),
      lastActive: Date.now(),
    };

    sessionStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, JSON.stringify(session));
  }

  /**
   * Tenta realizar o login do usuário
   * @async
   * @param {string} password - Senha do usuário
   * @param {Function} loginResultCallback - Callback para resultado do login
   * @returns {Promise<boolean>} Resultado do login
   * @throws {Error} Se houver erro na autenticação
   */
  static async tryLogin(password, loginResultCallback) {
    try {
      this.#validatePassword(password);

      // Configuração da requisição
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          password,
          timestamp: new Date().toISOString(),
        }),
      };

      const response = await fetch(
        AUTH_CONSTANTS.ENDPOINTS.LOGIN,
        requestOptions,
      );

      if (!response.ok) {
        throw new Error(`Erro na autenticação: ${response.statusText}`);
      }

      const { ok, token, user } = await response.json();

      if (ok && token) {
        this.#saveSession({
          token,
          user,
          loginTime: new Date().toISOString(),
        });

        if (typeof loginResultCallback === "function") {
          loginResultCallback(true);
        }

        return true;
      }

      return false;
    } catch (error) {
      handleError(error, "Autenticação");

      if (typeof loginResultCallback === "function") {
        loginResultCallback(false);
      }

      return false;
    }
  }

  /**
   * Verifica se o usuário está deslogado
   * @returns {boolean} Status do login
   */
  static isUserNotLogged() {
    try {
      const sessionData = sessionStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY);

      if (!sessionData) return true;

      const session = JSON.parse(sessionData);

      if (this.#isTokenExpired(session)) {
        this.logout();
        return true;
      }

      session.lastActive = Date.now();
      sessionStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, JSON.stringify(session));

      return false;
    } catch (error) {
      console.error("Erro ao verificar login:", error);
      return true;
    }
  }

  /**
   * Realiza o logout do usuário
   * @async
   */
  static async logout() {
    try {
      // Limpa dados da sessão
      sessionStorage.removeItem(AUTH_CONSTANTS.TOKEN_KEY);

      // Notifica servidor (opcional)
      await fetch(AUTH_CONSTANTS.ENDPOINTS.LOGOUT, {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  }

  /**
   * Obtém dados do usuário atual
   * @returns {Object|null} Dados do usuário ou null
   */
  static getCurrentUser() {
    try {
      const sessionData = sessionStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY);
      if (!sessionData) return null;

      const { user } = JSON.parse(sessionData);
      return user;
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      return null;
    }
  }
}

export const { tryLogin, isUserNotLogged, logout, getCurrentUser } =
  AuthManager;

// Exemplo de uso:
/*
// Login
const success = await tryLogin('senha123', (result) => {
    if (result) {
        console.log('Login bem sucedido!');
    } else {
        console.log('Falha no login');
    }
});

// Verificar status
if (isUserNotLogged()) {
    console.log('Usuário não está logado');
}

// Obter usuário atual
const user = getCurrentUser();
if (user) {
    console.log('Usuário:', user);
}

// Logout
await logout();
*/
