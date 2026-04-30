const form = document.getElementById('formProduto');
const lista = document.getElementById('listaProdutos');

// Listar produtos
async function carregarProdutos() {
    const res = await fetch('/api/produtos');
    const produtos = await res.json();
    
    lista.innerHTML = '';
    produtos.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${p.nome} - R$ ${p.preco}
            <button onclick="deletarProduto('${p.id}')">Excluir</button>
        `;
        lista.appendChild(li);
    });
}

// Cadastrar produto
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const produto = {
        nome: document.getElementById('nome').value,
        preco: document.getElementById('preco').value,
        categoriaId: document.getElementById('categoriaId').value
    };

    await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    });
    
    form.reset();
    carregarProdutos();
});

// Deletar produto
async function deletarProduto(id) {
    await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
    carregarProdutos();
}

carregarProdutos();
