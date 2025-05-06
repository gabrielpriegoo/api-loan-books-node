# 📚 API de Empréstimos de Livros

Esta é uma API simples e extensível para gerenciamento de empréstimos de livros. O projeto foi desenvolvido com foco em autenticação de usuários, validação de dados e segurança básica. Futuramente, serão adicionados novos endpoints relacionados a livros, empréstimos, devoluções e histórico.

## 🚀 Tecnologias Utilizadas

- **Node.js** — Runtime do JavaScript no backend
- **Express.js** — Framework para rotas e middlewares
- **JWT (jsonwebtoken)** — Autenticação via token
- **bcrypt** — Hash de senhas
- **uuid** — Geração de IDs únicos
- **dotenv** — Gerenciamento de variáveis de ambiente

## 🧠 Funcionalidades

- ✅ Cadastro de usuários com validação de tipo de dados
- ✅ Login com autenticação JWT
- ✅ Middleware de proteção de rotas (`ensureAuth`)
- ✅ Validação de token e usuário
- ✅ Resposta padronizada para erros de autenticação
- 🔜 Endpoints para gerenciamento de livros e empréstimos

## ⚙️ Instalação

1. Clone o repositório:
   git clone https://github.com/seu-usuario/api-loan-books.git
   cd api-loan-books

2. Instale as dependências:
   npm install

3. Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
   PORT=3000
   JWT_SECRET=sua_chave_secreta

4. Execute o servidor
   npm run dev
