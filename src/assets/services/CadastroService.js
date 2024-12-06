document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const apiUrl = 'http://localhost:8081/auth/register';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    const user= {
        name: name,
        email: email,
        password: password
    };

    registerUser(user);
});

function registerUser(user) {
    fetch(apiUrl , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    })
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
