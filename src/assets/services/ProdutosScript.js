const apiUrl = 'http://localhost:8081/api/produtos/listar'
 
let resultadoDiv;

async function buscarProduto() {    

    const lista = document.getElementById('lista-produtos');
    const busca = document.getElementById('campoBusca').value.toLowerCase();

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        });

        lista.innerHTML = '';
        const produtos = await response.json();
        const resultados = produtos.filter(produto =>
            produto.id.toString().includes(busca) || produto.nome.toLowerCase().includes(busca)
        );

        if (resultados.length > 0) {
            resultados.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.classList.add('produto');
                produtoDiv.innerHTML = `
                    <strong>${produto.nome}</strong> ID: ${produto.id}<br>
                    Descrição: ${produto.descricao}`;
                lista.appendChild(produtoDiv);
            });
        } else {
            lista.textContent = 'Nenhum produto encontrado.';
        }

    } catch (error) {
        lista.textContent = 'Erro ao carregar os produtos. Tente novamente mais tarde.';
        console.error(error);
    }
}

async function fetchProdutos() {

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        });
        if (!response.ok) {
            throw new Error('Erro na rede: ' + response.status);
        }
        const produtos = await response.json();
        const lista = document.getElementById('lista-produtos');
        lista.innerHTML = ''; 

        produtos.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');
            produtoDiv.innerHTML = `
                <strong>${produto.nome}</strong> ID - ${produto.id}<br>
                Descrição: ${produto.descricao}`;
            lista.appendChild(produtoDiv);
        });

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        alert('Erro ao carregar produtos. Tente novamente mais tarde.');
    }
    console.log("Produtos carregados");
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProdutos();
    document.getElementById('campoBusca').addEventListener('input', buscarProduto); 
});