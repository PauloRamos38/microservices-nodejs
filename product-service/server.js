const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '100kb' }));

// Banco de dados simulado em memória
let products = [
  { id: 1, name: 'Notebook', price: 3500, stock: 10 },
  { id: 2, name: 'Mouse', price: 50, stock: 100 },
  { id: 3, name: 'Teclado', price: 150, stock: 50 }
];

let nextId = 4;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Product Service está rodando!' });
});

// Listar todos os produtos
app.get('/products', (req, res) => {
  res.json(products);
});

// Buscar produto por ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  res.json(product);
});

// Criar novo produto
app.post('/products', (req, res) => {
  const { name, price, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  const newProduct = {
    id: nextId++,
    name,
    price,
    stock: stock || 0
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Atualizar produto
app.put('/products/:id', (req, res) => {
  const { name, price, stock } = req.body;
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  products[productIndex] = {
    ...products[productIndex],
    name: name !== undefined ? name : products[productIndex].name,
    price: price !== undefined ? price : products[productIndex].price,
    stock: stock !== undefined ? stock : products[productIndex].stock
  };
  res.json(products[productIndex]);
});

// Deletar produto
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

// Verificar estoque
app.post('/products/:id/check-stock', (req, res) => {
  const { quantity } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json({ 
    available: product.stock >= quantity,
    currentStock: product.stock
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Product Service rodando na porta ${PORT}`);
});