# Jah-Pod-beber

Um projeto Next.js moderno com React 19, TypeScript e Tailwind CSS, incluindo uma coleção completa de componentes UI baseados em Radix UI.

## 🚀 Tecnologias

### Core

- **Next.js 16.0.0** - Framework React para produção
- **React 19.2.0** - Biblioteca JavaScript para interfaces
- **TypeScript 5** - Superset tipado do JavaScript
- **Node.js 22** - Runtime JavaScript

### Estilização

- **Tailwind CSS 4.1.9** - Framework CSS utilitário moderno
- **Tailwind Merge** - Merge inteligente de classes CSS
- **Tailwind Animate** - Animações CSS utilitárias
- **PostCSS** - Processador CSS
- **Autoprefixer** - Prefixos CSS automáticos

### Componentes UI

- **Radix UI** - Componentes acessíveis e não estilizados (26 componentes)
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu
  - Navigation Menu, Popover, Select, Slider, Switch, Tabs, Toast, Tooltip e mais
- **Class Variance Authority** - Variantes de componentes
- **Lucide React** - Ícones modernos e consistentes
- **Command (cmdk)** - Componente de comando estilo VS Code
- **Embla Carousel** - Carrossel moderno e performático
- **React Resizable Panels** - Painéis redimensionáveis

### Formulários e Validação

- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de schemas TypeScript-first
- **@hookform/resolvers** - Resolvers para integração Zod + React Hook Form
- **Input OTP** - Componente para entrada de código OTP

### Utilitários

- **date-fns** - Biblioteca moderna para manipulação de datas
- **React Day Picker** - Seletor de datas acessível
- **clsx** - Utilidade para construir strings de classes condicionalmente
- **Next Themes** - Suporte a temas (dark/light mode)

### Visualização e Analytics

- **Recharts** - Biblioteca de gráficos React
- **Vercel Analytics** - Analytics integrado
- **Sonner** - Notificações toast elegantes

### Real-time e Database

- **Pusher** - Serviço de mensagens em tempo real (pub/sub)
- **Neon Database** - Banco de dados PostgreSQL serverless

## 📋 Pré-requisitos

- **Node.js** 18+ (recomendado: 22+)
- **pnpm** 10.15.0+ (gerenciador de pacotes)

Para instalar o pnpm globalmente:

```bash
npm install -g pnpm
```

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/fernanduandrade/jah-pod-beber
cd jah-pod-beber
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL=sua_url_do_neon_database

# Pusher Configuration
# Obtenha suas credenciais em: https://pusher.com/
# Plano gratuito: até 100 conexões simultâneas e 200k mensagens/dia
PUSHER_APP_ID=seu_pusher_app_id
PUSHER_SECRET=seu_pusher_secret
NEXT_PUBLIC_PUSHER_KEY=sua_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=seu_pusher_cluster

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Como obter as credenciais do Pusher:**

1. Acesse [pusher.com](https://pusher.com/) e crie uma conta gratuita
2. Crie um novo app no dashboard
3. Escolha o cluster mais próximo da sua região
4. Copie as credenciais (App ID, Key, Secret, Cluster) para o arquivo `.env.local`

## 🎮 Como usar

### Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

A página será atualizada automaticamente conforme você edita os arquivos.

### Build de produção

Para criar um build otimizado para produção:

```bash
pnpm build
```

### Iniciar servidor de produção

Após o build, inicie o servidor de produção:

```bash
pnpm start
```

### Lint

Execute o linter para verificar problemas no código:

```bash
pnpm lint
```

## 🚀 Deploy na Vercel

Este projeto está otimizado para deploy na Vercel. O sistema de atualização em tempo real usa Pusher, que funciona perfeitamente em ambientes serverless.

### Passos para deploy:

1. **Faça push do código para o GitHub**

2. **Conecte o repositório na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Importe seu repositório do GitHub
   - A Vercel detectará automaticamente que é um projeto Next.js

3. **Configure as variáveis de ambiente na Vercel:**
   - No dashboard do projeto, vá em "Settings" > "Environment Variables"
   - Adicione todas as variáveis do arquivo `.env.local`:
     - `DATABASE_URL`
     - `PUSHER_APP_ID`
     - `PUSHER_SECRET`
     - `NEXT_PUBLIC_PUSHER_KEY`
     - `NEXT_PUBLIC_PUSHER_CLUSTER`
     - `NEXT_PUBLIC_APP_URL` (use a URL do seu domínio na Vercel)

4. **Deploy!**
   - Clique em "Deploy"
   - A Vercel fará o build e deploy automaticamente

### Por que Pusher ao invés de WebSockets?

A Vercel usa funções serverless que não mantêm conexões persistentes. O Pusher é um serviço de pub/sub em tempo real que:
- ✅ Funciona perfeitamente em ambientes serverless
- ✅ Plano gratuito generoso (100 conexões simultâneas)
- ✅ Evita polling excessivo no banco de dados
- ✅ Escalável automaticamente
- ✅ Baixa latência global

## 📁 Estrutura do projeto

```
jah-pod-beber/
├── app/                    # Diretório principal da aplicação Next.js (App Router)
|   ├── actions/            # Server actions
│   ├── components/         # Componentes React reutilizáveis
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout raiz da aplicação
│   ├── page.tsx            # Página inicial
│   └── favicon.ico         # Ícone do site
├── public/                 # Arquivos estáticos (imagens, etc.)
├── .npmrc                  # Configurações do pnpm
├── next.config.js          # Configuração do Next.js
├── package.json            # Dependências e scripts do projeto
├── pnpm-lock.yaml          # Lockfile do pnpm
├── postcss.config.mjs      # Configuração do PostCSS
├── tailwind.config.ts      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
├── LICENSE                 # Licença MIT
└── README.md               # Este arquivo
```

## 🛠️ Scripts disponíveis

| Script       | Descrição                                             |
| ------------ | ----------------------------------------------------- |
| `pnpm dev`   | Inicia o servidor de desenvolvimento na porta 3000    |
| `pnpm build` | Cria um build otimizado para produção                 |
| `pnpm start` | Inicia o servidor de produção (requer build anterior) |
| `pnpm lint`  | Executa o ESLint para verificar problemas no código   |

## 📦 Versão

**Versão atual:** 0.1.2

## 📝 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE) - veja o arquivo LICENSE para detalhes.

Copyright (c) 2023 Fernando Andrade

## 🔗 Links úteis

### Documentação oficial

- [Next.js Documentation](https://nextjs.org/docs) - Aprenda sobre recursos do Next.js
- [React Documentation](https://react.dev) - Documentação oficial do React
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Bibliotecas de componentes

- [Radix UI Documentation](https://www.radix-ui.com) - Documentação dos componentes
- [shadcn/ui](https://ui.shadcn.com) - Componentes baseados em Radix UI

### Outros recursos

- [Next.js GitHub](https://github.com/vercel/next.js) - Código fonte do Next.js
- [React GitHub](https://github.com/facebook/react) - Código fonte do React
- [Vercel](https://vercel.com) - Plataforma de deploy recomendada

## 🤝 Contribuindo

Este é um projeto privado. Para contribuições, entre em contato com o mantenedor.

## Contribuidores

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Novout>
            <img src=https://avatars.githubusercontent.com/u/58053397?v=4 width="100;"  alt=Fernando Andrade/>
            <br />
            <sub style="font-size:14px"><b>Fernando Andrade/b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/kjkGustavo>
            <img src=https://avatars.githubusercontent.com/u/40013000?v=4 width="100;"  alt=Gustavo/>
            <br />
            <sub style="font-size:14px"><b>Gustavo</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/Nandosts>
            <img src=https://avatars.githubusercontent.com/u/65089035?v=4 width="100;"  alt=Fernando Melo/>
            <br />
            <sub style="font-size:14px"><b>Fernando Melo</b></sub>
        </a>
    </td>
</tr>
</table>

## 📄 Notas

- Este projeto utiliza o App Router do Next.js (diretório `app/`)
- Tailwind CSS 4 com configuração moderna
- TypeScript configurado com strict mode habilitado
- Componentes UI totalmente acessíveis seguindo padrões WAI-ARIA

## TODO:

- Documentar como fazer contribuição
