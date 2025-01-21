import '../global.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export default function Layout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gestão de Pedidos Alibras - MASA</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className='flex'>
        {children}
      </body>
    </html>
  );
}
