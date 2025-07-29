<div align="center">
<h1>Controle de Pedidos do Refeitório - <i>ADM - MASA</i></h1>

![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat-square&logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8.x-lightgrey?style=flat-square&logo=mysql)
![Blueprint.js](https://img.shields.io/badge/Blueprint.js-5.x-blue?style=flat-square&logo=blueprint)
![ExcelJS](https://img.shields.io/badge/ExcelJS-Xlsx-green?style=flat-square&logo=microsoft-excel)

> Sistema completo para controle de pedidos e cadastros com exportação em Excel.
</div>

## Principais Funcionalidades
- Listagem e gerenciamento de pedidos
- Filtro e ordenação visual por painel
- Exportação para Excel
- Autenticação de usuário via API
- Painéis por status (Aprovado, Pendente etc.)

-----

## Tecnologias Utilizadas
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Blueprint.js
- ExcelJS + FileSaver.js (Exportação para Excel)
- MySQL2 (conector)
- API Routes integradas

---

## Estrutura de Pastas
```
/controle-de-pedidos-refeitorio-adm-masa
├── app/                  # Páginas e rotas (incluindo API)
│   ├── layout.js         # Layout principal
│   ├── page.js           # Página inicial
│   └── api/              # Rotas de API
├── components/           # Componentes reutilizáveis
├── public/               # Recursos estáticos
└── styles/               # Estilizações globais
```
---

## Como Rodar Localmente
Certifique-se de ter o Node.js e o MySQL instalados.
```
# Instale as dependências
npm install
# Configure seu banco no .env

# Rode o projeto em modo de desenvolvimento
npm run dev
```

## Scripts Úteis
```
npm run dev     # Inicia em modo dev
npm run build   # Gera a build de produção
npm run start   # Inicia a aplicação em modo produção
```
