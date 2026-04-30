const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../data/produtos.json');

// Função auxiliar para ler dados
const readData = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// GET - Listar todos
router.get('/', async (req, res) => {
    const produtos = await readData();
    res.json(produtos);
});

// POST - Criar (validações)
router.post('/', async (req, res) => {
    const { nome, preco, categoriaId } = req.body;
    if (!nome || !preco || !categoriaId) {
        return res.status(400).json({ erro: 'Nome, preço e categoriaId são obrigatórios' });
    }

    const produtos = await readData();
    const novoProduto = { id: uuidv4(), nome, preco: parseFloat(preco), categoriaId };
    produtos.push(novoProduto);

    await fs.writeFile(dataPath, JSON.stringify(produtos, null, 2));
    res.status(201).json(novoProduto);
});

// DELETE - Remover
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let produtos = await readData();
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    produtos.splice(index, 1);
    await fs.writeFile(dataPath, JSON.stringify(produtos, null, 2));
    res.status(200).json({ mensagem: 'Removido com sucesso' });
});

module.exports = router;
