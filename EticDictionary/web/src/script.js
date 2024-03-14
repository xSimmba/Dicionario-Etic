// Buscando e referenciando o botão 'request-button'
const searchButton = document.getElementById('submit');

// Adicionando um evento de click para ele
searchButton.addEventListener('click', function () {
    preventDefault()
    // Buscando e referenciando o valor do método selecionado
    const method = "GET";
    // Definindo a URL da API
    const apiUrl = 'http://localhost:8001/search/';
    // Definindo a função 'call' passando o método e a URL da API
    const call = async (method, apiUrl) => {
        // Utilizando o método fetch para fazer a requisição
        fetch(
            // A requisição é feita para a URL da API
            apiUrl,
            {
                // Passando o método da requisição
                method: method,
                // Passando o cabeçalho da requisição
                headers: {
                    // Definindo o tipo de conteúdo da requisição, neste caso, JSON
                    'Content-Type': 'application/json'
                }
            }
        )
        // Então
        .then(response => {
            // Se a requisição for bem sucedida
            if (response.ok) {
                // Retornar a resposta em formato JSON
                response.json().then(data => {
                    // Buscando e referenciando o elemento 'responses'
                    const responses = document.querySelector('.palavra');
                    // Adicionando o elemento 'div' ao elemento 'responses'
                    responses.innertext= //palavra//;
                });
            };
        })
        // Capturando o erro
        .catch(error => console.log(error));
};

// Chamando a função 'call' passando o método e a URL da API
call(method, apiUrl);
});