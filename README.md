# Microservices Node.js

> Arquitetura de microserviços desenvolvida em Node.js para demonstrar conceitos práticos de sistemas distribuídos em ambiente empresarial.

## 📋 Sobre o Projeto

Este projeto implementa uma arquitetura de microserviços completa utilizando Node.js, demonstrando padrões e práticas aplicadas em ambientes corporativos. A aplicação é dividida em serviços independentes que se comunicam entre si, proporcionando escalabilidade, manutenibilidade e resiliência.

## 🏗️ Arquitetura

O projeto é composto pelos seguintes microserviços:

### **API Gateway**
- Ponto de entrada único para todas as requisições
- Roteamento de requisições para os microserviços apropriados
- Gerenciamento de autenticação e autorização
- Load balancing entre serviços

### **User Service**
- Gerenciamento de usuários
- Autenticação e autorização
- Perfis de usuário
- Controle de acesso

### **Product Service**
- Catálogo de produtos
- Gerenciamento de inventário
- Informações de produtos
- Categorização

### **Order Service**
- Processamento de pedidos
- Histórico de transações
- Gerenciamento de status de pedidos
- Integração com serviços de usuário e produto

## 🚀 Tecnologias Utilizadas

- **Node.js** - Plataforma de desenvolvimento
- **JavaScript** - Linguagem principal
- **Docker** - Containerização de serviços
- **Docker Compose** - Orquestração de containers
- **Express.js** - Framework web (presumido)
- **RESTful API** - Padrão de comunicação

## 📁 Estrutura do Projeto

```
microservices-nodejs/
├── .vscode/                 # Configurações do VS Code
├── api-gateway/            # Gateway de API
├── user-service/           # Serviço de usuários
├── product-service/        # Serviço de produtos
├── order-service/          # Serviço de pedidos
├── .gitignore             # Arquivos ignorados pelo Git
├── ci.yml                 # Configuração de CI/CD
├── docker-compose.yml     # Orquestração dos containers
├── package.json           # Dependências do projeto
└── README.md             # Documentação
```

## 🔧 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/PauloRamos38/microservices-nodejs.git
cd microservices-nodejs
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie arquivos `.env` em cada microserviço conforme necessário. Exemplo:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/db_name
JWT_SECRET=your_secret_key
```

### 4. Inicie os serviços com Docker Compose

```bash
docker-compose up -d
```

Ou para reconstruir as imagens:

```bash
docker-compose up --build
```

## 🎯 Execução

### Executar todos os serviços

```bash
docker-compose up
```

### Executar um serviço específico

```bash
docker-compose up api-gateway
docker-compose up user-service
docker-compose up product-service
docker-compose up order-service
```

### Parar os serviços

```bash
docker-compose down
```

## 📡 Endpoints da API

### API Gateway
```
http://localhost:3000
```

### User Service
```
GET    /api/users          # Listar usuários
GET    /api/users/:id      # Buscar usuário específico
POST   /api/users          # Criar novo usuário
PUT    /api/users/:id      # Atualizar usuário
DELETE /api/users/:id      # Deletar usuário
POST   /api/auth/login     # Login
POST   /api/auth/register  # Registro
```

### Product Service
```
GET    /api/products       # Listar produtos
GET    /api/products/:id   # Buscar produto específico
POST   /api/products       # Criar novo produto
PUT    /api/products/:id   # Atualizar produto
DELETE /api/products/:id   # Deletar produto
```

### Order Service
```
GET    /api/orders         # Listar pedidos
GET    /api/orders/:id     # Buscar pedido específico
POST   /api/orders         # Criar novo pedido
PUT    /api/orders/:id     # Atualizar pedido
DELETE /api/orders/:id     # Cancelar pedido
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## 🔍 Logs e Monitoramento

Para visualizar os logs de um serviço específico:

```bash
docker-compose logs -f api-gateway
docker-compose logs -f user-service
docker-compose logs -f product-service
docker-compose logs -f order-service
```

## 🛠️ Desenvolvimento

### Executar em modo de desenvolvimento

```bash
# Em cada serviço
npm run dev
```

### Adicionar novas dependências

```bash
# No serviço específico
cd user-service
npm install nome-do-pacote
```

## 🔐 Segurança

- Autenticação via JWT
- Validação de dados de entrada
- Rate limiting no API Gateway
- CORS configurado
- Variáveis de ambiente para dados sensíveis

## 📊 Padrões e Boas Práticas

- **Separação de responsabilidades**: Cada serviço tem uma responsabilidade única
- **Comunicação assíncrona**: Uso de message brokers para desacoplamento
- **Service Discovery**: Localização dinâmica de serviços
- **Circuit Breaker**: Proteção contra falhas em cascata
- **Containerização**: Todos os serviços são containerizados
- **CI/CD**: Pipeline de integração e deploy contínuo

## 🚧 Roadmap

- [ ] Implementar message broker (RabbitMQ/Kafka)
- [ ] Adicionar monitoramento com Prometheus e Grafana
- [ ] Implementar tracing distribuído
- [ ] Adicionar testes de integração
- [ ] Implementar cache distribuído (Redis)
- [ ] Service mesh com Istio
- [ ] Documentação com Swagger/OpenAPI

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e demonstração de conceitos de microserviços em ambiente empresarial.

## 👨‍💻 Autor

**Paulo Ramos**

- GitHub: [@PauloRamos38](https://github.com/PauloRamos38)
- LinkedIn: [Paulo Ramos](https://www.linkedin.com/in/# Microservices Node.js

> Arquitetura de microserviços desenvolvida em Node.js para demonstrar conceitos práticos de sistemas distribuídos em ambiente empresarial.

## 📋 Sobre o Projeto

Este projeto implementa uma arquitetura de microserviços completa utilizando Node.js, demonstrando padrões e práticas aplicadas em ambientes corporativos. A aplicação é dividida em serviços independentes que se comunicam entre si, proporcionando escalabilidade, manutenibilidade e resiliência.

## 🏗️ Arquitetura

O projeto é composto pelos seguintes microserviços:

### **API Gateway**
- Ponto de entrada único para todas as requisições
- Roteamento de requisições para os microserviços apropriados
- Gerenciamento de autenticação e autorização
- Load balancing entre serviços

### **User Service**
- Gerenciamento de usuários
- Autenticação e autorização
- Perfis de usuário
- Controle de acesso

### **Product Service**
- Catálogo de produtos
- Gerenciamento de inventário
- Informações de produtos
- Categorização

### **Order Service**
- Processamento de pedidos
- Histórico de transações
- Gerenciamento de status de pedidos
- Integração com serviços de usuário e produto

## 🚀 Tecnologias Utilizadas

- **Node.js** - Plataforma de desenvolvimento
- **JavaScript** - Linguagem principal
- **Docker** - Containerização de serviços
- **Docker Compose** - Orquestração de containers
- **Express.js** - Framework web (presumido)
- **RESTful API** - Padrão de comunicação

## 📁 Estrutura do Projeto

```
microservices-nodejs/
├── .vscode/                 # Configurações do VS Code
├── api-gateway/            # Gateway de API
├── user-service/           # Serviço de usuários
├── product-service/        # Serviço de produtos
├── order-service/          # Serviço de pedidos
├── .gitignore             # Arquivos ignorados pelo Git
├── ci.yml                 # Configuração de CI/CD
├── docker-compose.yml     # Orquestração dos containers
├── package.json           # Dependências do projeto
└── README.md             # Documentação
```

## 🔧 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/PauloRamos38/microservices-nodejs.git
cd microservices-nodejs
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie arquivos `.env` em cada microserviço conforme necessário. Exemplo:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/db_name
JWT_SECRET=your_secret_key
```

### 4. Inicie os serviços com Docker Compose

```bash
docker-compose up -d
```

Ou para reconstruir as imagens:

```bash
docker-compose up --build
```

## 🎯 Execução

### Executar todos os serviços

```bash
docker-compose up
```

### Executar um serviço específico

```bash
docker-compose up api-gateway
docker-compose up user-service
docker-compose up product-service
docker-compose up order-service
```

### Parar os serviços

```bash
docker-compose down
```

## 📡 Endpoints da API

### API Gateway
```
http://localhost:3000
```

### User Service
```
GET    /api/users          # Listar usuários
GET    /api/users/:id      # Buscar usuário específico
POST   /api/users          # Criar novo usuário
PUT    /api/users/:id      # Atualizar usuário
DELETE /api/users/:id      # Deletar usuário
POST   /api/auth/login     # Login
POST   /api/auth/register  # Registro
```

### Product Service
```
GET    /api/products       # Listar produtos
GET    /api/products/:id   # Buscar produto específico
POST   /api/products       # Criar novo produto
PUT    /api/products/:id   # Atualizar produto
DELETE /api/products/:id   # Deletar produto
```

### Order Service
```
GET    /api/orders         # Listar pedidos
GET    /api/orders/:id     # Buscar pedido específico
POST   /api/orders         # Criar novo pedido
PUT    /api/orders/:id     # Atualizar pedido
DELETE /api/orders/:id     # Cancelar pedido
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## 🔍 Logs e Monitoramento

Para visualizar os logs de um serviço específico:

```bash
docker-compose logs -f api-gateway
docker-compose logs -f user-service
docker-compose logs -f product-service
docker-compose logs -f order-service
```

## 🛠️ Desenvolvimento

### Executar em modo de desenvolvimento

```bash
# Em cada serviço
npm run dev
```

### Adicionar novas dependências

```bash
# No serviço específico
cd user-service
npm install nome-do-pacote
```

## 🔐 Segurança

- Autenticação via JWT
- Validação de dados de entrada
- Rate limiting no API Gateway
- CORS configurado
- Variáveis de ambiente para dados sensíveis

## 📊 Padrões e Boas Práticas

- **Separação de responsabilidades**: Cada serviço tem uma responsabilidade única
- **Comunicação assíncrona**: Uso de message brokers para desacoplamento
- **Service Discovery**: Localização dinâmica de serviços
- **Circuit Breaker**: Proteção contra falhas em cascata
- **Containerização**: Todos os serviços são containerizados
- **CI/CD**: Pipeline de integração e deploy contínuo

## 🚧 Roadmap

- [ ] Implementar message broker (RabbitMQ/Kafka)
- [ ] Adicionar monitoramento com Prometheus e Grafana
- [ ] Implementar tracing distribuído
- [ ] Adicionar testes de integração
- [ ] Implementar cache distribuído (Redis)
- [ ] Service mesh com Istio
- [ ] Documentação com Swagger/OpenAPI

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e demonstração de conceitos de microserviços em ambiente empresarial.

## 👨‍💻 Autor

**Paulo Ramos**

- GitHub: [@PauloRamos38](https://github.com/PauloRamos38)
- LinkedIn: [Paulo Ramos](https://www.linkedin.com/in/
paulo-ramos-de-liveira
)

## 📞 Suporte

Para questões e suporte, por favor abra uma issue no repositório.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!)

## 📞 Suporte

Para questões e suporte, por favor abra uma issue no repositório.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
