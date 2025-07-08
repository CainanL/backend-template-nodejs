# Template Komput API

### Autor  
**Cainan Luyles** – Engenheiro de Computação, Pós-graduado em Engenharia de Controle e Automação e Engenharia Elétrica.
[LinkedIn](https://www.linkedin.com/in/cainan-luyles/)

---

## Sobre o Template

Este template foi desenvolvido para acelerar a criação de novos projetos, utilizando boas práticas de desenvolvimento como SOLID, DDD e arquitetura modular.  
Tecnologias usadas: Node.js, TypeScript, NestJS, TypeORM.

---

## 🛠 Como iniciar o projeto

### 📦 Pré-requisitos

- Node.js v18+
- PostgreSQL
- Yarn ou NPM

### ⚙️ Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

<pre lang="markdown">  env
JWT_SECRET=uma_chave_secreta_aqui

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=12345678
DB_NAME=postgres  </pre>

### 🚀 Rodando em modo desenvolvimento

# Instale as dependências
<pre lang="markdown">  npm install   </pre>

# Rode o servidor com reload automático
<pre lang="markdown">  npm run start:dev  </pre>

# 🏗️ Build do projeto
<pre lang="markdown">  npm run build  </pre>

# ▶️ Rodar em produção (após build)
<pre lang="markdown">  npm run start:prod  </pre>


# 🧩 Migrations com TypeORM
<pre lang="markdown">  npm run migration:generate  </pre>

Isso irá gerar uma migration com base nas alterações das entidades.

# Executar as migrations
<pre lang="markdown">  npm run migration:run  </pre>

# Reverter a última migration
<pre lang="markdown">  npm run migration:revert  </pre>

---

## 📚 Documentação da API

A documentação da API é gerada automaticamente com o Swagger.

Após iniciar a aplicação, acesse:

👉 [http://localhost:3000/docs](http://localhost:3000/docs)

Lá você encontrará todos os endpoints disponíveis, parâmetros, respostas e possibilidade de realizar requisições diretamente pela interface Swagger.

---

## Estrutura do Projeto

### Domain

Contém as entidades principais e regras do domínio da aplicação.

- **BaseEntity**  
  Classe base que todas as entidades herdam. Contém propriedades comuns como `id` (UUID), `createdAt` (data de criação) e `isActive` (indicador de status ativo).  
  Métodos para ativar/desativar a entidade estão disponíveis (`enable()`, `disable()`).

- **Token**  
  Armazena tokens de acesso e refresh tokens associados a usuários, permitindo controle e revogação de sessões.

- **UserPolicies**  
  Guarda as *policies* (permissões específicas) de cada usuário, essenciais para controle fino de acesso.

- **UserRules**  
  Guarda as *rules* (papéis ou cargos) do usuário, utilizados para agrupamento e controle de permissões.

- **User**  
  Entidade que representa o usuário, incluindo nome, e-mail, senha (com hash via bcrypt), regras (rules) e políticas (policies).  
  Possui métodos para criação, adição e remoção de regras e políticas, e validação de senha.

- **BaseException**  
  Exceção base customizada estendendo a `Error`, com mapeamento para exceções HTTP do NestJS.

---

### Application

Contém a lógica de negócio, serviços, manipulação de exceções, respostas e view models.

- **Common**  
  - `AppException`: Exceção customizada derivada de `BaseException` para uso no serviço.  
  - `ApiResponse<T>`: Classe padrão para formatação de respostas de API, encapsulando sucesso, mensagem, dados e erros.  
  - `TokenService`: Serviço para criação e validação de tokens JWT e refresh tokens com expiração configurada.

- **HandlerBase<TRequest, TResponse>**  
  Classe abstrata base para handlers que executam operações de negócio, tratando erros e controle do usuário corrente.

- **UserModule**  
  Módulo dedicado à funcionalidade de usuários, configurando serviços, controllers e estratégias JWT.  
  Contém serviços de login, criação de usuários, refresh token e logout, além da estratégia JWT para validação do token.

- **ViewModels**  
  - `UserVm`: ViewModel que retorna os dados essenciais do usuário (nome, e-mail, tokens, regras e políticas).

---

### API

Responsável pelas configurações, controle de requisições, autenticação e autorização.

- **Guards**  
  - `JwtAuthGuard`: Guard que utiliza a estratégia JWT para autenticação.  
  - `AuthGuard`: Garante que o usuário existe no banco e adiciona a entidade `User` na requisição.  
  - `RolesGuard`: Verifica se o usuário possui as regras necessárias para acessar o recurso.  
  - `PoliciesGuard`: Verifica se o usuário possui as políticas necessárias para acessar o recurso.

- **Decorators**  
  - `RolesPermissions`: Decorator para definir as regras (roles) necessárias em um endpoint.  
  - `PoliciesPermissions`: Decorator para definir as políticas (policies) necessárias em um endpoint.

- **Config**  
  - `validateRequest`: Aplica validação global para requisições usando `ValidationPipe` do NestJS.  
  - `configureSwagger`: Configura a documentação Swagger da API com suporte a autenticação Bearer JWT.

- **Controllers**  
  `UserController`: Controlador responsável pelos endpoints de autenticação, criação de usuários, refresh token e logout, utilizando os guards e decorators para controle de acesso.

---

### Estrutura Principal da Aplicação

- **AppModule**  
  Configura o ambiente da aplicação, conectando módulos, guardas globais e serviços essenciais, como configuração do banco de dados via TypeORM e variáveis de ambiente.

- **main.ts**  
  Ponto de entrada que inicializa a aplicação, aplica validações globais e configura o Swagger, além de iniciar o servidor HTTP na porta configurada.

---

## Como Utilizar

1. Configure suas variáveis de ambiente, incluindo a `JWT_SECRET` e conexão com banco de dados.
2. Execute `npm install` para instalar dependências.
3. Inicie a aplicação com `npm run start`.
4. Acesse a documentação Swagger em `/docs` para testar as rotas e autenticações.

---

## Tecnologias

- Node.js
- TypeScript
- NestJS
- TypeORM
- JWT (JSON Web Token)
- Swagger para documentação da API
- Bcrypt para hashing de senhas

---

## Boas Práticas Aplicadas

- Arquitetura baseada em DDD (Domain Driven Design)
- Princípios SOLID para organização do código
- Modulação clara entre domínio, aplicação e interface (API)
- Segurança com autenticação JWT e controle de acesso granular via regras e políticas
- Tratamento consistente de exceções e respostas padronizadas

---

Qualquer dúvida ou contribuição será bem-vinda!

---

