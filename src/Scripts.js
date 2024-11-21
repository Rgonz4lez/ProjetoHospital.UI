const apiUrl = 'http://localhost:8080/api/produtos/listar';

const busca = document.getElementById('campoBusca').value.toLowerCase();
const resultadoDiv = document.getElementById('lista-produtos');
resultadoDiv.innerHTML = 'Carregando...';


async function buscarProduto() {    
    try {
        const response = await fetch(apiUrl);
        const produtos = await response.json();
        const resultados = produtos.filter(produto =>
            produto.id.toString().includes(busca) || produto.nome.toLowerCase().includes(busca)
        );

        resultadoDiv.innerHTML = '';

        if (resultados.length > 0) {
            resultados.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.classList.add('produto');
                produtoDiv.innerHTML = `
                    <strong>${produto.nome}</strong> (ID: ${produto.id})<br>
                    Descrição: ${produto.descricao}`;
                resultadoDiv.appendChild(produtoDiv);
            });
        } else {
            resultadoDiv.innerHTML = 'Nenhum produto encontrado.';
        }

    } catch (error) {
        resultadoDiv.innerHTML = 'Erro ao carregar os produtos. Tente novamente mais tarde.';
        console.error(error);
    }
}

async function fetchProdutos() {
    try {
        const response = await fetch(apiUrl);
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
                <strong>${produto.nome}</strong> ID: ${produto.id}<br>
                Descrição: ${produto.descricao}`;
            lista.appendChild(produtoDiv);
        });

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        alert('Erro ao carregar produtos. Tente novamente mais tarde.');
    }
    console.log("Produtos carregados");
}

document.addEventListener('DOMContentLoaded', fetchProdutos);
