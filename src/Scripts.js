const apiUrl = 'http://localhost:8080/api/produtos/listar';

async function fetchProdutos() {
    const busca = document.getElementById('campoBusca').value.toLowerCase();
    const resultadoDiv = document.getElementById('lista-produtos');
    resultadoDiv.innerHTML = 'Carregando...';
    
    try {
        const response = await fetch(apiUrl);
        const produtos = await response.json();
        let resultados;

        if (busca) {
            resultados = produtos.filter(produto =>
                produto.id.toString().includes(busca) || produto.nome.toLowerCase().includes(busca)
            );
        } else {
            resultados = produtos;
        }

        resultadoDiv.innerHTML = '';

        if (resultados.length > 0) {
            resultados.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.classList.add('produto');
                produtoDiv.innerHTML = `
                    <strong>${produto.nome}</strong> ID: ${produto.id}<br>
                    Descrição: ${produto.descricao} <br> 
                    Status: ${produto.status}`;
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

document.addEventListener('DOMContentLoaded', fetchProdutos);
