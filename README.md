# Agenda de Contatos
 
------------------------------------------------------------------------

## Objetivos
Criar um servidor para armazenar uma agenda de contatos.
### Rotas
#### POST /v1/login
```json
{ email: "teste@teste.com", password: "password" }
```
#### POST /v1/register
```json
{ email: "teste@teste.com", password: "password" }
```
#### GET /v1/contatos

- retornar todos os contatos de um usuário (apenas para usuários logados)
```json
[{ id: 1, name: "John Doo", phone: 99999999999, email: "teste@gmail.com" }]
```

#### POST /v1/contato (apenas para usuarios logados)

- Adicionar um contato

Request:
```json
{ name: "John Doo", phone: 99999999999, email: "teste@gmail.com" }
```

Response:
```json
{ id: 1, name: "John Doo", phone: 99999999999, email: "teste@gmail.com" }
```

#### PUT /v1/contato/:id (apenas para usuarios logados)

- Atualizar um contato

Request:
```json
{ name: "John Doo", phone: 99999999999, email: "teste@gmail.com" }
```

Response:
```json
{ id: 1, name: "John Doo", phone: 99999999999, email: "teste@gmail.com" }
```

#### DELETE /v1/contato/:id (apenas para usuarios logados)

- Deletar um contato

### Requisitos:
- Seguir exatamente a assinatura das rotas propostas a cima

- Utilizar o banco de dados sqlite

- Validar todas as requisições e garantir que:

   - email tem um formato valido

   - Telefone tem um formato valido

   - outros

- Validar casos de erro

### Linguagens utilizadas
- JavaScript (NodeJS)

### Recursos
- Prisma ORM

### Frameworks
- Express

### Bibliotecas
- validator ( https://www.npmjs.com/package/validator )
- bcrypt ( https://www.npmjs.com/package/bcrypt )
- jsonwebtoken ( https://www.npmjs.com/package/jsonwebtoken )
- nodemon ( https://www.npmjs.com/package/nodemon )

------------------------------------------------------------------------

##### Infos
- Projeto de Programação Web Back-end 1
- Análise e Desenvolvimento de Sistemas 3/5
