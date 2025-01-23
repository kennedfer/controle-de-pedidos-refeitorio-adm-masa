import {
  Dialog,
  Divider,
  FormGroup,
  InputGroup,
  Card,
  Button,
  Tooltip,
} from "@blueprintjs/core";
import { useState } from "react";
import { Toaster } from "../hooks/toast";

export function LoginDialog({ onSubmit, isOpen }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLockClick = () => setShowPassword(!showPassword);

  const lockButton = (
    <Tooltip content={`${showPassword ? "Esconder" : "Mostrar"} senha`}>
      <Button
        icon={showPassword ? "unlock" : "lock"}
        minimal={true}
        onClick={handleLockClick}
      />
    </Tooltip>
  );

  const getLoginResult = (logged) => {
    if (!logged) {
      Toaster.danger("Erro: Senha incorreta! Tente novamente");
      return setIsLoading(false);
    }

    Toaster.success("Login realizado com sucesso!");
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    onSubmit(password, getLoginResult);
  };

  return (
    <Dialog isOpen={isOpen} title="Entrar no sistema">
      <Card className="flex gap-4">
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Usuário:"
            labelFor="login_user"
            labelInfo="(obrigatório)"
          >
            <InputGroup id="login_user" disabled value="administrativo.masa" />
          </FormGroup>
          <FormGroup
            label="Senha:"
            labelFor="login_password"
            labelInfo="(obrigatório)"
          >
            <InputGroup
              id="login_password"
              value={password}
              rightElement={lockButton}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            className="w-full"
            intent="primary"
            type="submit"
            text="Entrar"
            loading={isLoading}
          />
        </form>
        <Divider />
        <div>IMAGE</div>
      </Card>
    </Dialog>
  );
}
