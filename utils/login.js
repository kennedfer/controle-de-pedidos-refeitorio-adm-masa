import { handleError } from "./error";

/**
 * Tenta realizar o login do usuário usando a senha fornecida.
 *
 * @async
 * @function tryLogin
 * @param {string} password - A senha do usuário.
 * @param {Function} loginResultCallback - Callback para manipular o resultado do login.
 * @returns {Promise<boolean>} Retorna uma Promise que resolve para `true` se o login for bem-sucedido, ou `false` caso contrário.
 */
export async function tryLogin(password, loginResultCallback) {
  try {
    const res = await fetch(`/api/auth/login?password=${password}`);

    if (!res.ok) {
      throw new Error(`Erro ao tentar login: ${res.statusText}`);
    }

    const status = await res.json();

    if (status.ok) {
      sessionStorage.setItem("restaurant-orders", "ok");
    }

    loginResultCallback(status.ok);
    return status.ok;

  } catch (error) {
    handleError(error, "Login");
    return false;
  }
}

/**
 * Verifica se o usuário está deslogado com base no token armazenado.
 *
 * @function userNotLogged
 * @returns {boolean} Retorna `true` se o usuário não estiver logado, ou `false` caso contrário.
 */
export function userNotLogged() {
  const token = sessionStorage.getItem("restaurant-orders");
  return !token;
}
