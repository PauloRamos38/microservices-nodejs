const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '100kb' }));

const requiredEnv = ['USER_SERVICE_URL', 'PRODUCT_SERVICE_URL', 'ORDER_SERVICE_URL'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
	console.error(`Variaveis de ambiente ausentes: ${missingEnv.join(', ')}`);
	process.exit(1);
}

const corsOrigins = (process.env.CORS_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(
	cors({
		origin: corsOrigins.length > 0 ? corsOrigins : false,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: false
	})
);

const limiter = rateLimit({
	windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
	max: Number(process.env.RATE_LIMIT_MAX || 300),
	standardHeaders: true,
	legacyHeaders: false
});
app.use(limiter);

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';

app.get('/health', (req, res) => {
	res.json({ status: 'API Gateway esta rodando!' });
});

const HTTP_TIMEOUT_MS = Number(process.env.HTTP_TIMEOUT_MS || 5000);

async function forwardRequest(targetBaseUrl, req, res) {
	try {
		const response = await axios({
			method: req.method,
			url: `${targetBaseUrl}${req.originalUrl}`,
			data: req.body,
			timeout: HTTP_TIMEOUT_MS,
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
