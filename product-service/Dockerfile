# Usa uma imagem leve do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install --production

# Copia o restante do código e inicia a aplicação
COPY . .
EXPOSE 3002
CMD ["npm", "start"]