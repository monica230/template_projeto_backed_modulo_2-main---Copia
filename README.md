# DEVinHouse [Clamed] V3 - Backend

## Descrição

 O objetivo do projeto é desenvolver o backend de um sistema que permitirá gerenciar usuários, produtos e movimentações de estoque entre as filiais de uma rede de farmácias chamada **FARMA_DEVIN**.

O backend foi desenvolvido utilizando as tecnologias:
- **Node.js** + **TypeScript** + **TypeORM** + **PostgreSQL** + **Express**

Este backend vai fornecer uma API Restful com as seguintes funcionalidades principais:
- Cadastro de usuários
- Login de usuários
- Listagem de usuários
- Atualização de status de usuários
- Cadastro e listagem de produtos
- Movimentação de produtos entre filiais
- Atualização de status de movimentação

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **TypeScript**: Superconjunto do JavaScript, oferece tipagem estática e recursos modernos.
- **TypeORM**: ORM para TypeScript e JavaScript, usado para interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Sistema gerenciador de banco de dados relacional utilizado para armazenar dados.
- **Express**: Framework minimalista para Node.js que facilita a criação de APIs.

---

## Funcionalidades

### 1. Cadastro de Usuários
- Método: `POST`
- Endpoint: `/users`
- Requisitos: O perfil de usuário pode ser `DRIVER`, `BRANCH` ou `ADMIN`.
- Validações e criação de hash para a senha.

### 2. Login de Usuários
- Método: `POST`
- Endpoint: `/login`
- Retorna um token JWT, nome e perfil do usuário.

### 3. Listagem de Usuários
- Método: `GET`
- Endpoint: `/users`
- Permite listar todos os usuários, com filtros por perfil (opcional).

### 4. Cadastro de Produtos
- Método: `POST`
- Endpoint: `/products`
- Permite que filiais cadastrem produtos.

### 5. Movimentação de Produtos
- Método: `POST`
- Endpoint: `/movements`
- Permite movimentação de produtos entre filiais, com validação de estoque.

### 6. Listagem de Movimentações
- Método: `GET`
- Endpoint: `/movements`
- Exibe as movimentações realizadas, com detalhes do produto e filial de destino.

---

## Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/DEVinHouse-Clamed-V3/projeto_backend_modulo_2.git


2. Instalar Dependências
No diretório do projeto, execute o seguinte comando para instalar as dependências:


npm install
3. Configurar o Banco de Dados
Crie um banco de dados PostgreSQL e adicione as credenciais no arquivo .env:


DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=clamed_v3
4. Rodar as Migrações
Execute as migrações para criar as tabelas no banco de dados:



npm run typeorm migration:run
5. Iniciar o Servidor
Após configurar o banco de dados, inicie o servidor:



npm run dev
O servidor estará disponível em http://localhost:3000.

Planejamento de Tarefas
As tarefas para o desenvolvimento do backend foram organizadas utilizando o Trello, seguindo a metodologia Kanban. O quadro está disponível aqui.

Links Importantes
Repositório no GitHub
Quadro no Trello
Melhorias Futuras
Testes automatizados para garantir a qualidade do código.
Implementação de deploy contínuo utilizando Heroku ou outra plataforma de CI/CD.



