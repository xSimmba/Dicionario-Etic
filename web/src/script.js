// Buscando e referenciando o botão 'search-button'
const searchButton = document.getElementById('search-button');

// Adicionando um evento de click para ele
searchButton.addEventListener('click', function (event) {
    // Previnindo o comportamento padrão do formulário
    event.preventDefault();
    
    // Buscando e referenciando o valor do input
    const inputValue = document.getElementById('search-input').value;

    // Definindo a URL da API com o parâmetro de consulta 'word'
    const apiUrl = 'http://localhost:8001/search?word=' + encodeURIComponent(inputValue);
    
    // Utilizando o método fetch para fazer a requisição
    fetch(apiUrl, {
        // Passando o método da requisição
        method: 'GET',
        // Passando o cabeçalho da requisição
        headers: {
            // Definindo o tipo de conteúdo da requisição, neste caso, JSON
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // Verificando se a resposta foi bem sucedida
        if (!response.ok) {
            // Se a resposta não for bem sucedida, lançar um erro
            throw new Error('Erro ao buscar dados');
        }
        // Retornando a resposta em formato JSON
        return response.json();
    })
    .then(data => {
        // Log the response to inspect its structure
        console.log(data);
        
        // Buscando e referenciando o elemento 'responses'
        const responses = document.querySelector('.info-searched .palavra');
        const definitions = document.querySelector('.info-searched .DefPalavra');
        const type = document.querySelector('.info-searched .type');

        // Limpando o conteúdo anterior
        responses.textContent = '';
        definitions.textContent = '';
        type.textContent = '';

        // Verifying if the response is not empty
    
        responses.textContent = data.word;
        type.textContent = data.type;
        definitions.textContent = data.description;

    })
    .catch(error => {
        // Exibindo o erro no console
        console.error('Erro:', error);
    });
});
