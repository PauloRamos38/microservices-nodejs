# Microservices Node.js

Arquitetura de microservicos em Node.js para demonstrar conceitos praticos de sistemas distribuidos.

## Sobre o projeto

Este projeto implementa uma arquitetura de microservicos composta por um API Gateway e tres servicos (usuarios, produtos e pedidos). Os servicos se comunicam via HTTP e podem ser executados localmente ou via Docker Compose.

## Arquitetura

- **API Gateway**: ponto de entrada, roteamento e politicas de seguranca
- **User Service**: gerenciamento de usuarios
- **Product Service**: catalogo e estoque
- **Order Service**: processamento de pedidos e integracao entre servicos

## Tecnologias

- Node.js
- JavaScript
- Express
- Docker e Docker Compose

## Estrutura do projeto

```text
microservices-nodejs/
|-- api-gateway/
|-- user-service/
|-- product-service/
|-- order-service/
|-- ci.yml
|-- docker-compose.yml
|-- package.json
|-- README.md
```

## Pre-requisitos

- Node.js 18+
- Docker e Docker Compose (opcional)
- Git

## Instalacao e configuracao

1. Clone o repositorio

```bash
git clone https://github.com/PauloRamos38/microservices-nodejs.git
cd microservices-nodejs
```

1. Instale as dependencias

```bash
npm run install-all
```

1. Configure as variaveis de ambiente

- Use o template [.env.example](.env.example)
- Crie um arquivo `.env` dentro de cada servico (api-gateway, user-service, product-service, order-service)

1. Suba os servicos

```bash
npm run start
```

Ou usando Docker Compose:

```bash
docker-compose up -d
```

## Execucao

Executar todos os servicos:

```bash
npm run start
```

Executar um servico especifico:

```bash
npm run start:gateway
npm run start:user
npm run start:product
npm run start:order
```

## Endpoints

### API Gateway

- `GET /health`
- `GET/POST/PUT/PATCH/DELETE /users`
- `GET/POST/PUT/PATCH/DELETE /products`
- `GET/POST/PUT/PATCH/DELETE /orders`

### User Service

- `GET /health`
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

### Product Service

- `GET /health`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /products/:id/check-stock`

### Order Service

- `GET /health`
- `GET /orders`
- `GET /orders/:id`
- `POST /orders`
- `PATCH /orders/:id/status`

## Seguranca

- `helmet` habilitado em todos os servicos
- Rate limiting no API Gateway
- CORS configuravel via `CORS_ORIGINS`
- Timeouts de chamadas HTTP entre servicos
- Validacao de variaveis obrigatorias no API Gateway
- `.env` ignorado pelo Git (use o template)

## Roadmap

- Adicionar persistencia (PostgreSQL ou MongoDB)
- Autenticacao com JWT
- Observabilidade (logs, metrics, tracing)

## Contribuindo

1. Fork do projeto
1. Crie sua branch: `git checkout -b feature/nova-feature`
1. Commit: `git commit -m "Add nova feature"`
1. Push: `git push origin feature/nova-feature`
1. Abra um Pull Request

## Licenca

Projeto educacional.

## Autor

### Paulo Ramos

- GitHub: [@PauloRamos38](https://github.com/PauloRamos38)

## Suporte

Para suporte, abra uma issue no repositorio.
