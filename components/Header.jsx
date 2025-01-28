import React, { memo } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import logoEqx from "../public/images/logo-eqx.webp";

/**
 * Configurações do header
 */
const HEADER_CONFIG = {
  LOGO: {
    WIDTH: 150,
    HEIGHT: 50,
    ALT: "Equinox Logo",
  },
  USER: {
    LOGIN: "kennedfer", // Current User's Login
    DATE: new Date("2025-01-28T13:31:31Z"), // Current Date
  },
};

/**
 * Componente do logo
 */
export const EquinoxLogo = memo(function EquinoxLogo({ className }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={logoEqx}
        alt={HEADER_CONFIG.LOGO.ALT}
        width={HEADER_CONFIG.LOGO.WIDTH}
        height={HEADER_CONFIG.LOGO.HEIGHT}
        priority
        className="object-contain"
      />
    </div>
  );
});

EquinoxLogo.propTypes = {
  className: PropTypes.string,
};

EquinoxLogo.displayName = "EquinoxLogo";

/**
 * Componente de informações do usuário
 */
const UserInfo = memo(function UserInfo() {
  const formattedDate = HEADER_CONFIG.USER.DATE.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = HEADER_CONFIG.USER.DATE.toLocaleTimeString("pt-BR");

  return (
    <div className="flex flex-col items-end text-sm text-gray-600">
      <span className="font-medium">Bem-vindo, {HEADER_CONFIG.USER.LOGIN}</span>
      <time
        dateTime={HEADER_CONFIG.USER.DATE.toISOString()}
        className="text-xs"
      >
        {formattedDate} - {formattedTime}
      </time>
    </div>
  );
});

UserInfo.displayName = "UserInfo";

/**
 * Componente de navegação
 */
const Navigation = memo(function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      <a
        href="#orders"
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Ver pedidos"
      >
        Pedidos
      </a>
      <a
        href="#reports"
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Ver relatórios"
      >
        Relatórios
      </a>
    </nav>
  );
});

Navigation.displayName = "Navigation";

/**
 * Componente principal do header
 */
export const Header = memo(function Header() {
  return (
    <header className="bg-gray-100 px-4 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo e Navegação */}
        <div className="flex items-center space-x-8">
          <EquinoxLogo className="hover:opacity-90 transition-opacity" />
          <Navigation />
        </div>

        {/* Informações do Usuário */}
        <UserInfo />
      </div>
    </header>
  );
});

Header.displayName = "Header";

// Exemplo de uso:
/*
function Layout({ children }) {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
*/
