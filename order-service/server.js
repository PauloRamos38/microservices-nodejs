
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

// Banco de dados simulado em memoria
let orders = [];
let nextId = 1;

// Health check
app.get('/health', (req, res) => {
	res.json({ status: 'Order Service esta rodando!' });
});

// Listar todos os pedidos
app.get('/orders', (req, res) => {
	res.json(orders);
});

// Buscar pedido por ID
app.get('/orders/:id', (req, res) => {
	const order = orders.find(o => o.id === parseInt(req.params.id));
	if (!order) {
		return res.status(404).json({ error: 'Pedido nao encontrado' });
	}
	res.json(order);
});

// Criar novo pedido
app.post('/orders', async (req, res) => {
	const { userId, productId, quantity } = req.body;

	if (!userId || !productId || !quantity) {
		return res.status(400).json({ error: 'userId, productId e quantity sao obrigatorios' });
	}

	try {
		const userResponse = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
		const user = userResponse.data;

		const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/products/${productId}`);
		const product = productResponse.data;

		if (product.stock < quantity) {
			return res.status(400).json({
				error: 'Estoque insuficiente',
				available: product.stock,
				requested: quantity
			});
		}

		const total = product.price * quantity;

		const newOrder = {
			id: nextId++,
			userId,
			userName: user.name,
			productId,
			productName: product.name,
			quantity,
			unitPrice: product.price,
			total,
			status: 'pending',
			createdAt: new Date().toISOString()
		};

		orders.push(newOrder);
		res.status(201).json(newOrder);
	} catch (error) {
		console.error('Erro ao criar pedido:', error.message);
		res.status(500).json({ error: 'Erro ao criar pedido' });
	}
});

// Atualizar status do pedido
app.patch('/orders/:id/status', (req, res) => {
	const { status } = req.body;
	const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));

	if (orderIndex === -1) {
		return res.status(404).json({ error: 'Pedido nao encontrado' });
	}

	const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
	if (!validStatuses.includes(status)) {
		return res.status(400).json({ error: 'Status invalido' });
	}

	orders[orderIndex].status = status;
	res.json(orders[orderIndex]);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
	console.log(`Order Service rodando na porta ${PORT}`);
});

