document.addEventListener("DOMContentLoaded", function () {

    const formLogin = document.getElementById("formLogin");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const messageDiv = document.getElementById("message");

    async function Login(event) {
        event.preventDefault(); 

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            const response = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); 

                window.location.href = 'Produtos.html'; 

            } else {
                const errorData = await response.json();
                messageDiv.textContent = errorData.message || "Usuário ou senha incorretos!";
            } 

        } catch (error) {
            messageDiv.textContent = "Ocorreu um erro ao tentar fazer login. Tente novamente.";
            console.error("Erro ao fazer a requisição:", error);
        }
    }

    formLogin.addEventListener("submit", Login);
});
