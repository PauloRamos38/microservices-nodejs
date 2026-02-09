const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';

app.get('/health', (req, res) => {
	res.json({ status: 'API Gateway esta rodando!' });
});

async function forwardRequest(targetBaseUrl, req, res) {
	try {
		const response = await axios({
			method: req.method,
			url: `${targetBaseUrl}${req.originalUrl}`,
			data: req.body,
			validateStatus: () => true
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.error('Erro ao encaminhar requisicao:', error.message);
		res.status(502).json({ error: 'Falha ao encaminhar requisicao' });
	}
}

app.use('/users', (req, res) => forwardRequest(USER_SERVICE_URL, req, res));
app.use('/products', (req, res) => forwardRequest(PRODUCT_SERVICE_URL, req, res));
app.use('/orders', (req, res) => forwardRequest(ORDER_SERVICE_URL, req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`API Gateway rodando na porta ${PORT}`);
});
