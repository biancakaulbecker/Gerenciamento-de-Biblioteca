const express = require('express');
const path = require('path');
const produtosRoutes = require('./routes/produtos');
const categoriasRoutes = require('./routes/categorias');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/produtos', produtosRoutes);
app.use('/api/categorias', categoriasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
