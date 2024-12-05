document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const apiUrl = 'localhost:8081/autenticar/registro'

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password
    };
    registerUser(userData);
});

function registerUser(userData) {
    fetch(apiUrl , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'Login.html'; 
        } else {
            alert('Erro ao cadastrar: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar cadastrar.');
    });
}
