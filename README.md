# Controle de Gastos Residenciais

Projeto desenvolvido como teste técnico utilizando .NET 8 (Web API) no backend e React + TypeScript + Vite no frontend.

O sistema permite cadastrar pessoas, categorias e transações, aplicando regras de negócio e exibindo relatórios com totais.

---

## Tecnologias utilizadas

Backend:
- C#
- .NET 8
- ASP.NET Web API
- Entity Framework Core
- SQLite
- Swagger

Frontend:
- React
- TypeScript
- Vite
- Fetch API

---

## Estrutura do projeto

controle-gastos/
  backend/
    ControleGastos.Api/
  frontend/

---

## Executar o Backend

Entrar na pasta da API:

cd backend/ControleGastos.Api

Restaurar pacotes:

dotnet restore

Build (opcional):

dotnet build

Executar:

dotnet run

Swagger:

http://localhost:5000/swagger

O banco SQLite é criado automaticamente na primeira execução.

---

## Executar o Frontend

Entrar na pasta:

cd frontend

Instalar dependências:

npm install

Executar:

npm run dev

Abrir no navegador:

http://localhost:5173

---

## Funcionalidades

Pessoas

- Criar
- Editar
- Excluir
- Listar

Regra:
Ao excluir uma pessoa, todas as transações são removidas.

---

Categorias

- Criar
- Listar

Finalidade:
- Despesa
- Receita
- Ambas

---

Transações

- Criar
- Listar

Regras:

- Menor de idade só pode ter despesa
- Categoria deve ser compatível com o tipo
- Valor deve ser maior que zero

---

Relatórios

Totais por pessoa:

- Total de receitas
- Total de despesas
- Saldo
- Total geral no final

Totais por categoria:

- Total de receitas
- Total de despesas
- Saldo
- Total geral no final

---

## Observações

- Backend e frontend executam separadamente
- O banco é criado automaticamente
- As regras de negócio estão no backend
- O frontend consome a API via HTTP

---

## Autor

Projeto desenvolvido para teste técnico.