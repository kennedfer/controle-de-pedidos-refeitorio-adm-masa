import {
  Dialog,
  Divider,
  FormGroup,
  InputGroup,
  Card,
  Button,
  Tooltip,
  Intent,
} from "@blueprintjs/core";
import { useState, useCallback, memo } from "react";
import { Toaster } from "../utils/toast";
import { EquinoxLogo } from "./Header";
import PropTypes from "prop-types";

/**
 * Configurações do formulário de login
 */
const LOGIN_CONFIG = {
  MESSAGES: {
    SUCCESS: "Login realizado com sucesso!",
    ERROR: {
      PASSWORD: "Erro: Senha incorreta! Tente novamente",
      VALIDATION: "Erro: Preencha a senha",
      GENERIC: "Erro ao fazer login. Tente novamente",
    },
  },
  LABELS: {
    SHOW: "Mostrar senha",
    HIDE: "Esconder senha",
    SUBMIT: "Entrar",
    TITLE: "Entrar no sistema",
    USER: "Usuário",
    PASSWORD: "Senha",
    REQUIRED: "(obrigatório)",
  },
  VALIDATION: {
    MIN_LENGTH: 6,
  },
};

/**
 * Componente de botão de visualização de senha
 */
const PasswordToggle = memo(({ showPassword, onClick }) => (
  <Tooltip
    content={showPassword ? LOGIN_CONFIG.LABELS.HIDE : LOGIN_CONFIG.LABELS.SHOW}
  >
    <Button
      icon={showPassword ? "unlock" : "lock"}
      minimal
      onClick={onClick}
      aria-label={
        showPassword ? LOGIN_CONFIG.LABELS.HIDE : LOGIN_CONFIG.LABELS.SHOW
      }
    />
  </Tooltip>
));

PasswordToggle.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

/**
 * Componente principal do diálogo de login
 */
function LoginDialogComponent({ onSubmit, isOpen, onClose }) {
  // Estados
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Toggle da visualização da senha
   */
  const handlePasswordToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  /**
   * Validação do formulário
   */
  const validateForm = useCallback(() => {
    if (!password) {
      setError(LOGIN_CONFIG.MESSAGES.ERROR.VALIDATION);
      return false;
    }

    if (password.length < LOGIN_CONFIG.VALIDATION.MIN_LENGTH) {
      setError(
        `Senha deve ter no mínimo ${LOGIN_CONFIG.VALIDATION.MIN_LENGTH} caracteres`,
      );
      return false;
    }

    setError("");
    return true;
  }, [password]);

  /**
   * Callback de resultado do login
   */
  const handleLoginResult = useCallback(
    (success) => {
      if (!success) {
        Toaster.danger(LOGIN_CONFIG.MESSAGES.ERROR.PASSWORD);
        setError(LOGIN_CONFIG.MESSAGES.ERROR.PASSWORD);
        setIsLoading(false);
        return;
      }

      Toaster.success(LOGIN_CONFIG.MESSAGES.SUCCESS);
      setIsLoading(false);
      setPassword("");
      onClose();
    },
    [onClose],
  );

  /**
   * Handler de submissão
   */
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        onSubmit(password, handleLoginResult);
      } catch (error) {
        console.error("Erro no login:", error);
        Toaster.danger(LOGIN_CONFIG.MESSAGES.ERROR.GENERIC);
        setIsLoading(false);
      }
    },
    [password, onSubmit, handleLoginResult, validateForm],
  );

  return (
    <Dialog
      onClose={onClose}
      isOpen={isOpen}
      title={LOGIN_CONFIG.LABELS.TITLE}
      isCloseButtonShown={!isLoading}
      canEscapeKeyClose={!isLoading}
      canOutsideClickClose={!isLoading}
    >
      <Card className="flex gap-4">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Campo de usuário */}
          <FormGroup
            label={LOGIN_CONFIG.LABELS.USER}
            labelFor="login_user"
            labelInfo={LOGIN_CONFIG.LABELS.REQUIRED}
          >
            <InputGroup
              id="login_user"
              disabled
              value="administrativo.masa"
              aria-label="Nome de usuário"
            />
          </FormGroup>

          {/* Campo de senha */}
          <FormGroup
            label={LOGIN_CONFIG.LABELS.PASSWORD}
            labelFor="login_password"
            labelInfo={LOGIN_CONFIG.LABELS.REQUIRED}
            intent={error ? Intent.DANGER : Intent.NONE}
            helperText={error}
          >
            <InputGroup
              id="login_password"
              value={password}
              rightElement={
                <PasswordToggle
                  showPassword={showPassword}
                  onClick={handlePasswordToggle}
                />
              }
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              intent={error ? Intent.DANGER : Intent.NONE}
              aria-label="Senha"
              required
              autoComplete="current-password"
            />
          </FormGroup>

          {/* Botão de submissão */}
          <Button
            className="w-full"
            intent="primary"
            type="submit"
            text={LOGIN_CONFIG.LABELS.SUBMIT}
            loading={isLoading}
            disabled={isLoading || !password}
            large
          />
        </form>

        <Divider />

        {/* Logo */}
        <div className="grid place-items-center flex-grow">
          <EquinoxLogo />
        </div>
      </Card>
    </Dialog>
  );
}

LoginDialogComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Exporta componente memoizado
export const LoginDialog = memo(LoginDialogComponent);

// Exemplo de uso:
/*
function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleLogin = async (password, callback) => {
      try {
          const success = await authenticateUser(password);
          callback(success);
      } catch (error) {
          callback(false);
      }
  };

  return (
      <>
          <Button
              onClick={() => setLoginOpen(true)}
              text="Login"
          />

          <LoginDialog
              isOpen={isLoginOpen}
              onClose={() => setLoginOpen(false)}
              onSubmit={handleLogin}
          />
      </>
  );
}
*/
