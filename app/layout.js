import { Suspense } from "react";
import PropTypes from "prop-types";

// Estilos
import "../global.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime2/lib/css/blueprint-datetime2.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

/**
 * Configurações do layout
 */
const LAYOUT_CONFIG = {
  META: {
    TITLE: "Gestão de Pedidos Alibras - MASA",
    DESCRIPTION: "Sistema de gestão de pedidos para Alibras MASA",
    KEYWORDS: "pedidos, gestão, alibras, masa",
    AUTHOR: "Alibras MASA",
    THEME_COLOR: "#ffffff",
  },
  VIEWPORT: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  LANG: "pt-BR",
};

/**
 * Componente de Loading
 */
function LoadingFallback() {
  return (
    <div className="h-screen grid place-items-center">
      <div className="animate-pulse">Carregando...</div>
    </div>
  );
}

/**
 * Componente principal de layout
 */
export default function RootLayout({ children }) {
  return (
    <html lang={LAYOUT_CONFIG.LANG}>
      <head>
        {/* Metadados básicos */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content={LAYOUT_CONFIG.VIEWPORT} />
        <title>{LAYOUT_CONFIG.META.TITLE}</title>

        {/* SEO */}
        <meta name="description" content={LAYOUT_CONFIG.META.DESCRIPTION} />
        <meta name="keywords" content={LAYOUT_CONFIG.META.KEYWORDS} />
        <meta name="author" content={LAYOUT_CONFIG.META.AUTHOR} />

        {/* Open Graph */}
        <meta property="og:title" content={LAYOUT_CONFIG.META.TITLE} />
        <meta
          property="og:description"
          content={LAYOUT_CONFIG.META.DESCRIPTION}
        />
        <meta property="og:type" content="website" />

        {/* PWA */}
        <meta name="theme-color" content={LAYOUT_CONFIG.META.THEME_COLOR} />
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />

        {/* Segurança */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>

      <body>
        {/* Mensagem de JavaScript desabilitado */}
        <noscript>
          <div className="p-4 text-center bg-yellow-100 text-yellow-800">
            Este aplicativo requer JavaScript para funcionar corretamente.
          </div>
        </noscript>

        {/* Conteúdo principal */}
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>

        {/* Script de tema */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                            try {
                                const theme = localStorage.getItem('theme') || 'light';
                                document.documentElement.setAttribute('data-theme', theme);
                            } catch (e) {
                                console.error('Error setting theme:', e);
                            }
                        `,
          }}
        />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// Arquivo manifest.json exemplo:
/*
{
    "name": "Gestão de Pedidos Alibras - MASA",
    "short_name": "Pedidos MASA",
    "description": "Sistema de gestão de pedidos para Alibras MASA",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#ffffff",
    "icons": [
        {
            "src": "/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
*/
